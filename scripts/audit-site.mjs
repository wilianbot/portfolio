import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url));

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(path) : Promise.resolve([path]);
    }),
  );
  return files.flat();
}

function routeFromFile(file) {
  const path = relative(distDirectory, file).replaceAll('\\', '/');
  if (path === 'index.html') return '/';
  if (path.endsWith('/index.html')) return `/${path.slice(0, -10)}`;
  return `/${path}`;
}

function targetFile(pathname) {
  const normalized = decodeURIComponent(pathname).replace(/^\//, '');
  if (!normalized) return join(distDirectory, 'index.html');
  if (extname(normalized)) return join(distDirectory, normalized);
  return join(distDirectory, normalized, 'index.html');
}

const allFiles = await collectFiles(distDirectory);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
const htmlByRoute = new Map(
  await Promise.all(
    htmlFiles.map(async (file) => [routeFromFile(file), await readFile(file, 'utf8')]),
  ),
);
const incomingLinks = new Map([...htmlByRoute.keys()].map((route) => [route, 0]));
const errors = [];

for (const [route, html] of htmlByRoute) {
  const fileLabel = route === '/' ? '/index.html' : route;
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  const mainCount = (html.match(/<main(?:\s|>)/g) ?? []).length;
  const bannerCount = (html.match(/<header class="site-header"/g) ?? []).length;
  const footerCount = (html.match(/<footer class="site-footer"/g) ?? []).length;
  const noindex = html.includes('content="noindex, nofollow"');

  if (h1Count !== 1) errors.push(`${fileLabel}: esperado 1 h1, encontrado ${h1Count}`);
  if (mainCount !== 1) errors.push(`${fileLabel}: esperado 1 main, encontrado ${mainCount}`);
  if (!noindex && bannerCount !== 1) errors.push(`${fileLabel}: landmark de cabeçalho ausente`);
  if (!noindex && footerCount !== 1) errors.push(`${fileLabel}: landmark de rodapé ausente`);

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  if (ids.size !== (html.match(/\sid="([^"]+)"/g) ?? []).length) {
    errors.push(`${fileLabel}: IDs duplicados`);
  }

  const hrefs = [...html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)].map(
    (match) => match[1],
  );
  for (const href of hrefs) {
    if (!href) {
      errors.push(`${fileLabel}: link vazio`);
      continue;
    }
    if (/^(?:mailto:|tel:|https?:\/\/)/.test(href)) continue;

    const url = new URL(href, `https://audit.invalid${route}`);
    const destination = targetFile(url.pathname);
    try {
      await stat(destination);
    } catch {
      errors.push(`${fileLabel}: destino interno inexistente ${href}`);
      continue;
    }

    const destinationRoute = routeFromFile(destination);
    if (incomingLinks.has(destinationRoute) && destinationRoute !== route) {
      incomingLinks.set(destinationRoute, (incomingLinks.get(destinationRoute) ?? 0) + 1);
    }

    if (url.hash && destination.endsWith('.html')) {
      const destinationHtml = htmlByRoute.get(destinationRoute);
      const fragment = decodeURIComponent(url.hash.slice(1));
      if (destinationHtml && !destinationHtml.includes(`id="${fragment}"`)) {
        errors.push(`${fileLabel}: fragmento inexistente ${href}`);
      }
    }
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/g)) {
    const attributes = match[1];
    if (!/\salt="[^"]*"/.test(attributes)) errors.push(`${fileLabel}: imagem sem alt`);
    if (!/\swidth="\d+"/.test(attributes) || !/\sheight="\d+"/.test(attributes)) {
      errors.push(`${fileLabel}: imagem sem dimensões explícitas`);
    }
  }

  for (const match of html.matchAll(/<a\b([^>]*)target="_blank"([^>]*)>/g)) {
    const attributes = `${match[1]} ${match[2]}`;
    if (!/\srel="[^"]*noreferrer[^"]*"/.test(attributes)) {
      errors.push(`${fileLabel}: target=_blank sem noreferrer`);
    }
  }

  const clientScripts = [...html.matchAll(/<script\b([^>]*)>/g)].filter(
    (match) => !match[1].includes('application/ld+json'),
  );
  if (clientScripts.length > 0) errors.push(`${fileLabel}: JavaScript de cliente encontrado`);
}

for (const [route, count] of incomingLinks) {
  if (route === '/' || route === '/404.html' || route === '/design-system/') continue;
  if (count === 0) errors.push(`${route}: página órfã`);
}

const javascriptBytes = (
  await Promise.all(
    allFiles
      .filter((file) => ['.js', '.mjs'].includes(extname(file)))
      .map(async (file) => (await stat(file)).size),
  )
).reduce((total, size) => total + size, 0);
const cssBytes = (
  await Promise.all(
    allFiles
      .filter((file) => extname(file) === '.css')
      .map(async (file) => (await stat(file)).size),
  )
).reduce((total, size) => total + size, 0);
const imageSizes = await Promise.all(
  allFiles
    .filter((file) => ['.jpg', '.png', '.webp', '.avif', '.svg'].includes(extname(file)))
    .map(async (file) => ({ file, size: (await stat(file)).size })),
);
const largestImage = imageSizes.sort((first, second) => second.size - first.size)[0];

if (errors.length > 0) {
  throw new Error(`Auditoria falhou:\n- ${errors.join('\n- ')}`);
}

console.log(
  JSON.stringify(
    {
      htmlPages: htmlFiles.length,
      orphanPages: 0,
      brokenInternalLinks: 0,
      clientJavaScriptBytes: javascriptBytes,
      totalCssBytes: cssBytes,
      largestImage: largestImage
        ? {
            path: relative(distDirectory, largestImage.file),
            bytes: largestImage.size,
          }
        : null,
    },
    null,
    2,
  ),
);
