import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const backgroundPath = fileURLToPath(
  new URL('../src/assets/brand/og-background.jpg', import.meta.url),
);
const iconPath = fileURLToPath(new URL('../public/icon.svg', import.meta.url));

const cards = [
  { path: 'home.jpg', lines: ['Wilian Robal', 'Desenvolvedor Full Stack'], label: 'WR Labs · Produtos e Engenharia de Software' },
  { path: 'products.jpg', lines: ['Produtos'], label: 'Arquivo' },
  { path: 'about.jpg', lines: ['Wilian Robal', 'Desenvolvedor Full Stack'], label: 'Sobre · WR Labs' },
  { path: 'notes.jpg', lines: ['Notas'], label: 'Caderno editorial' },
  { path: 'contact.jpg', lines: ['Contato'], label: 'Conversas e oportunidades' },
  { path: 'privacy.jpg', lines: ['Política de', 'Privacidade'], label: 'Informações legais' },
  { path: 'terms.jpg', lines: ['Termos de Uso'], label: 'Informações legais' },
  { path: 'products/prontodoc.jpg', lines: ['ProntoDoc'], label: 'Produto · Case study' },
  { path: 'products/gestoriza.jpg', lines: ['Gestoriza'], label: 'Produto · Case study' },
  { path: 'products/chronos.jpg', lines: ['Chronos'], label: 'Produto · Case study' },
  {
    path: 'products/observatorio-legislativo.jpg',
    lines: ['Observatório', 'Legislativo'],
    label: 'Experiência de estágio · Case study',
  },
];

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function cardOverlay(card) {
  const title = card.lines
    .map(
      (line, index) =>
        `<tspan x="96" dy="${index === 0 ? 0 : 72}">${escapeXml(line)}</tspan>`,
    )
    .join('');

  return Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="760" height="630" fill="#f7f7fa" fill-opacity="0.92"/>
      <g transform="translate(96 70)">
        <rect width="62" height="62" rx="12" fill="#18181b"/>
        <text x="31" y="39" text-anchor="middle" fill="#f7f7fa"
          font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700"
          letter-spacing="-1">WR</text>
        <text x="80" y="39" fill="#18181b" font-family="Arial, Helvetica, sans-serif"
          font-size="24" font-weight="650">Labs</text>
      </g>
      <text x="96" y="296" fill="#18181b" font-family="Arial, Helvetica, sans-serif"
        font-size="62" font-weight="650" letter-spacing="-2">${title}</text>
      <text x="98" y="520" fill="#666672" font-family="Arial, Helvetica, sans-serif"
        font-size="20" font-weight="600" letter-spacing="2">${escapeXml(card.label.toUpperCase())}</text>
      <line x1="96" y1="558" x2="704" y2="558" stroke="#e5e5ea"/>
      <circle cx="704" cy="558" r="5" fill="#6956e8"/>
    </svg>
  `);
}

await Promise.all(
  cards.map((card) =>
    sharp(backgroundPath)
      .composite([{ input: cardOverlay(card) }])
      .jpeg({ quality: 84, progressive: true, chromaSubsampling: '4:4:4' })
      .toFile(fileURLToPath(new URL(`../public/og/${card.path}`, import.meta.url))),
  ),
);

await Promise.all([
  sharp(iconPath).resize(192, 192).png().toFile(fileURLToPath(new URL('../public/icon-192.png', import.meta.url))),
  sharp(iconPath).resize(512, 512).png().toFile(fileURLToPath(new URL('../public/icon-512.png', import.meta.url))),
]);
