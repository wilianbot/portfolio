# Publicação estática

O projeto gera somente arquivos estáticos em `dist/`. Não há backend, analytics ou JavaScript de aplicação no cliente.

## Configuração comum

- Versão do Node.js: 22 LTS ou superior.
- Instalação: `npm ci`.
- Build: `npm run build`.
- Diretório publicado: `dist`.
- Variável obrigatória em produção: `PUBLIC_SITE_URL=https://dominio-confirmado.example`.

`PUBLIC_SITE_URL` deve ser apenas a origem HTTPS, sem caminho, query, fragmento ou barra adicional necessária. O build interrompe com uma mensagem clara quando o valor é inválido.

Antes de conectar um provedor, envie o repositório ao GitHub e confirme que a branch de publicação contém apenas alterações revisadas. Não é necessário instalar adaptador da Vercel ou Cloudflare para este build estático.

## Vercel

1. Na Vercel, escolha **Add New Project** e importe o repositório do GitHub.
2. Se a detecção automática não preencher os campos, selecione Astro, use `npm run build` como Build Command e `dist` como Output Directory.
3. Em **Settings → Environment Variables**, adicione `PUBLIC_SITE_URL` para Production. Use também o domínio de preview correspondente apenas se quiser canonical em previews; normalmente é preferível omitir a variável fora de produção.
4. Faça o primeiro deploy e confira `/`, `/404`, `/robots.txt` e `/sitemap-index.xml`.
5. Adicione o domínio em **Settings → Domains**, configure o DNS conforme `DOMAIN.md` e aguarde o certificado HTTPS automático.

`vercel.json` registra build, saída, URLs com barra final, headers de segurança e cache longo apenas nos assets versionados em `/_astro/`. A Vercel serve `404.html` automaticamente. Não existem redirects de URLs antigas nesta versão; adicione-os somente quando houver origem e destino reais. Consulte a [configuração oficial do `vercel.json`](https://vercel.com/docs/project-configuration/vercel-json) ao revisar essas regras.

## Cloudflare Pages

1. Em **Workers & Pages**, crie uma aplicação Pages conectada ao repositório do GitHub.
2. Selecione a branch de produção.
3. Configure `npm run build` como Build command e `dist` como Build output directory.
4. Em **Settings → Environment variables**, defina `PUBLIC_SITE_URL` no ambiente Production.
5. Faça o deploy e confira `/`, uma rota interna, uma URL inexistente, `/robots.txt` e `/sitemap-index.xml`.
6. Em **Custom domains**, conecte o domínio e siga as instruções DNS de `DOMAIN.md`. O certificado HTTPS é provisionado pelo Cloudflare.

O arquivo `public/_headers` é copiado para o build e configura os headers de segurança e cache apenas para assets versionados. Os demais arquivos preservam a política padrão de cache do Pages, evitando conteúdo não versionado obsoleto após deploy. A página `404.html` é usada como fallback de erro. Não há arquivo `_redirects`, pois o projeto ainda não possui URLs legadas confirmadas. Consulte a documentação oficial de [headers](https://developers.cloudflare.com/pages/configuration/headers/), [entrega e 404](https://developers.cloudflare.com/pages/configuration/serving-pages/) e [redirects](https://developers.cloudflare.com/pages/configuration/redirects/).

## Validação do deploy

Depois que a URL pública estiver acessível:

1. Confirme que HTTP redireciona para HTTPS e que existe apenas uma versão canônica do host.
2. Inspecione canonical, `og:url` e `og:image` no HTML de Home, produto, Sobre e Contato.
3. Abra `sitemap-index.xml` e confirme que todas as URLs usam o domínio final.
4. Teste navegação, links externos, email, 404 e layout em 320 px.
5. Teste a imagem Open Graph com uma ferramenta de compartilhamento da plataforma desejada.
6. Adicione a propriedade de domínio ou prefixo de URL no Google Search Console, conclua a verificação solicitada e envie `https://dominio-final.example/sitemap-index.xml`.
7. Execute novamente o checklist de `PRE_LAUNCH_CHECKLIST.md` no ambiente público.

## Comandos locais de produção

```sh
npm ci
npm run typecheck
npm run lint
npm run test
PUBLIC_SITE_URL=https://dominio-confirmado.example npm run build
npm run audit:html
npm run audit:site
PUBLIC_SITE_URL=https://dominio-confirmado.example npm run validate:metadata
npm run preview
```

Nunca coloque segredos em variáveis prefixadas com `PUBLIC_`: elas podem fazer parte do conteúdo entregue ao navegador.
