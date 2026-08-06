import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const siteUrl = process.env.PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error('PUBLIC_SITE_URL é obrigatória para validar metadata absoluta.');
}

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory()
        ? collectHtmlFiles(path)
        : Promise.resolve(entry.name.endsWith('.html') ? [path] : []);
    }),
  );

  return nestedFiles.flat();
}

function requirePattern(html, pattern, message, file) {
  if (!pattern.test(html)) throw new Error(`${file}: ${message}`);
}

const htmlFiles = await collectHtmlFiles(distDirectory);

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativeFile = relative(distDirectory, file);
  const noindex = /<meta name="robots" content="noindex, nofollow">/.test(html);

  requirePattern(html, /<title>[^<]+<\/title>/, 'title ausente', relativeFile);
  requirePattern(html, /<meta name="description" content="[^"]+">/, 'description ausente', relativeFile);
  requirePattern(html, /<meta property="og:title" content="[^"]+">/, 'og:title ausente', relativeFile);
  requirePattern(html, /<meta property="og:description" content="[^"]+">/, 'og:description ausente', relativeFile);
  requirePattern(html, /<meta property="og:image" content="https:\/\/wrlabs\.example\/og\/[^"]+">/, 'og:image absoluto ausente', relativeFile);
  requirePattern(html, /<meta name="twitter:card" content="summary_large_image">/, 'Twitter Card ausente', relativeFile);
  requirePattern(html, /<link rel="manifest" href="\/manifest\.webmanifest">/, 'manifest ausente', relativeFile);

  if (noindex) {
    if (/<link rel="canonical"/.test(html)) {
      throw new Error(`${relativeFile}: página noindex não deve ter canonical`);
    }
  } else {
    requirePattern(html, /<link rel="canonical" href="https:\/\/wrlabs\.example\/[^"]*">/, 'canonical ausente', relativeFile);
  }

  const jsonLdMatch = html.match(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
  );
  if (!jsonLdMatch?.[1]) {
    throw new Error(`${relativeFile}: JSON-LD ausente`);
  }
  const jsonLd = JSON.parse(jsonLdMatch[1]);
  if (!Array.isArray(jsonLd) || jsonLd.length === 0) {
    throw new Error(`${relativeFile}: JSON-LD deve ser uma lista não vazia`);
  }
}

const manifest = JSON.parse(
  await readFile(join(distDirectory, 'manifest.webmanifest'), 'utf8'),
);
for (const icon of manifest.icons) {
  await access(join(distDirectory, icon.src.replace(/^\//, '')));
}

const ogFiles = [
  'og/home.jpg',
  'og/products.jpg',
  'og/about.jpg',
  'og/notes.jpg',
  'og/contact.jpg',
  'og/privacy.jpg',
  'og/terms.jpg',
  'og/products/prontodoc.jpg',
  'og/products/gestoriza.jpg',
  'og/products/chronos.jpg',
  'og/products/observatorio-legislativo.jpg',
];
for (const file of ogFiles) {
  const metadata = await sharp(join(distDirectory, file)).metadata();
  if (metadata.width !== 1200 || metadata.height !== 630) {
    throw new Error(`${file}: dimensões inválidas`);
  }
}

const robots = await readFile(join(distDirectory, 'robots.txt'), 'utf8');
if (!robots.includes('Disallow: /design-system/')) {
  throw new Error('robots.txt não bloqueia /design-system/');
}
if (!robots.includes('Sitemap: https://wrlabs.example/sitemap-index.xml')) {
  throw new Error('robots.txt não aponta para o sitemap absoluto');
}

const sitemapIndex = await readFile(
  join(distDirectory, 'sitemap-index.xml'),
  'utf8',
);
const sitemapNames = [...sitemapIndex.matchAll(/<loc>[^<]*\/(sitemap-[^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const sitemapContent = (
  await Promise.all(
    sitemapNames.map((name) => readFile(join(distDirectory, name), 'utf8')),
  )
).join('\n');
if (sitemapContent.includes('/design-system/') || sitemapContent.includes('/404')) {
  throw new Error('sitemap contém rota noindex');
}

console.log(`Metadata validada em ${htmlFiles.length} páginas HTML.`);
