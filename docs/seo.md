# SEO e publicação

## Domínio canônico

Defina `PUBLIC_SITE_URL` com a origem pública completa, sem caminhos adicionais:

```sh
PUBLIC_SITE_URL=https://dominio.example npm run build
```

Quando a variável está presente, o build gera canonical absoluto, URLs absolutas de Open Graph e JSON-LD, `sitemap-index.xml` e a referência do sitemap em `robots.txt`. Sem domínio confirmado, esses campos absolutos são omitidos para evitar publicar uma origem inventada.

## Metadados

`src/layouts/BaseLayout.astro` centraliza:

- title e description;
- canonical;
- Open Graph e Twitter Card;
- imagem 1200 × 630 e texto alternativo;
- favicon, ícones e manifest;
- JSON-LD de `WebPage`;
- breadcrumbs para rotas internas;
- `noindex` para 404 e catálogo do design system.

A Home também declara `Organization`, `Person` e `WebSite`. A página Sobre declara `Person`. Notas publicadas declaram `Article`. Produtos só recebem `SoftwareApplication` quando descrição, plataforma e estado compatível estiverem confirmados.

Não adicionar avaliações, preços, downloads, reviews, endereço, telefone ou tamanho da equipe sem fontes confirmadas.

## Conteúdo e indexação

- Rascunhos de notas são removidos antes da geração de rotas.
- `/design-system/` usa `noindex` e é excluído do sitemap.
- `/404.html` usa `noindex`.
- `robots.txt` permite o site público e bloqueia o catálogo interno.
- Open Graph de produtos usa `public/og/products/[slug].jpg`.

## Validação antes de publicar

1. Configurar `PUBLIC_SITE_URL` com o domínio real.
2. Executar `npm run typecheck`, `npm run lint` e `npm run build`.
3. Conferir canonical, `og:url`, `og:image` e JSON-LD no HTML gerado.
4. Conferir `dist/sitemap-index.xml` e `dist/robots.txt`.
5. Validar o JSON-LD em uma ferramenta de resultados avançados após o domínio estar acessível.
6. Testar as imagens sociais com os validadores das plataformas de compartilhamento.
