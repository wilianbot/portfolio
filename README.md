# WR Labs

Site institucional e portfólio de produtos da WR Labs, construído com Astro, TypeScript estrito e CSS puro.

## Requisitos

- Node.js 22 LTS ou superior
- npm 10 ou superior

## Desenvolvimento

```sh
npm install
npm run dev
```

O servidor local informa a URL no terminal, normalmente `http://localhost:4321`.

## Comandos

- `npm run dev`: inicia o ambiente de desenvolvimento.
- `npm run build`: gera o site estático em `dist/`.
- `npm run preview`: serve o build localmente.
- `npm run typecheck`: valida Astro e TypeScript.
- `npm run lint`: executa o ESLint.

## Publicação

O projeto gera arquivos estáticos e pode ser publicado na Vercel ou Cloudflare Pages.

- Comando de build: `npm run build`
- Diretório de saída: `dist`
- Variável `PUBLIC_SITE_URL`: domínio público completo, como `https://dominio.example`

O sitemap, canonical, Open Graph, JSON-LD e `robots.txt` usam essa variável sem exigir alterações no código. Consulte `docs/DEPLOY.md` e `docs/DOMAIN.md` antes de publicar.

## Skill do projeto

As diretrizes reutilizáveis do site estão em `.agents/skills/wr-labs-site/`. Ao clonar o repositório em outro computador, mantenha essa pasta versionada para que ambientes compatíveis com skills de projeto possam descobrir as instruções.

Também é possível invocar a skill explicitamente nos prompts com `$wr-labs-site`.
