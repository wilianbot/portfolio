# Domínio e DNS

Nenhum domínio foi comprado ou escolhido nesta etapa. Use este processo apenas depois que o endereço oficial da WR Labs estiver confirmado.

## Escolher o host canônico

Decida entre domínio raiz, como `https://example.com`, ou subdomínio `www`, como `https://www.example.com`. Configure `PUBLIC_SITE_URL` exatamente com a opção escolhida e redirecione permanentemente a alternativa para o host canônico no provedor.

Não publique builds de produção com a URL temporária da plataforma como canonical. Evite trocar o host canônico depois da indexação.

## Configurar DNS

1. Adicione primeiro o domínio ao projeto na Vercel ou no Cloudflare Pages.
2. Copie os registros DNS exibidos pelo próprio provedor. Os valores podem mudar; não use exemplos deste documento como registros reais.
3. No registrador ou DNS autoritativo, crie o registro solicitado — normalmente `A`, `AAAA`, `CNAME` ou flattening/alias para o domínio raiz.
4. Remova apenas registros conflitantes cuja função tenha sido confirmada. Não altere registros MX, TXT ou de email sem entender seu uso.
5. Aguarde a propagação e confirme o estado do domínio no painel do provedor.

Se o DNS estiver no Cloudflare e a hospedagem for Vercel, siga a orientação atual da Vercel sobre proxy versus DNS-only durante a emissão do certificado. Se a hospedagem for Cloudflare Pages, prefira conectar o domínio pelo painel Pages para que os registros sejam gerenciados corretamente.

## HTTPS e segurança

- Aguarde o certificado aparecer como válido antes de divulgar o site.
- Confirme o redirecionamento de HTTP para HTTPS.
- Teste o domínio canônico e sua variante `www`/raiz.
- O projeto envia HSTS por um ano, sem `includeSubDomains` e sem preload. Só amplie essa política quando todos os subdomínios estiverem permanentemente em HTTPS.
- Confira em produção os headers documentados em `DEPLOY.md`; previews locais não representam o comportamento do CDN.

## Canonical e indexação

Após definir o domínio:

```sh
PUBLIC_SITE_URL=https://dominio-final.example npm run build
PUBLIC_SITE_URL=https://dominio-final.example npm run validate:metadata
```

Verifique no build e no site publicado:

- canonical absoluto em páginas indexáveis;
- ausência de canonical em 404 e design system, que usam `noindex`;
- `og:url`, imagens Open Graph e JSON-LD com o mesmo host;
- sitemap usando somente o domínio final;
- `robots.txt` apontando para o sitemap final.

No Google Search Console, verifique a propriedade solicitada pelo Google e envie `/sitemap-index.xml`. Enviar o sitemap não garante indexação imediata.

Para Cloudflare Pages, conecte o domínio pelo fluxo oficial de [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/). Se quiser impedir a duplicação entre o domínio final e `*.pages.dev`, configure o [redirect recomendado pelo Cloudflare](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/) somente depois que o domínio final existir.

## Troca futura de domínio

1. Mantenha todas as rotas equivalentes sempre que possível.
2. Configure redirects permanentes 301 do host antigo para o novo, preservando caminhos.
3. Atualize `PUBLIC_SITE_URL` e gere novo build.
4. Atualize Search Console, perfis externos e links conhecidos.
5. Mantenha redirects e o domínio antigo ativos por um período amplo, acompanhando erros antes de removê-los.
