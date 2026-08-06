# Manutenção do site

## Atualização de rotina

1. Crie uma branch a partir da versão estável.
2. Atualize conteúdo somente nas collections ou em `src/config/site.ts`, conforme o tipo de dado.
3. Não publique links, status ou informações ainda não confirmados.
4. Execute a bateria local de qualidade.
5. Revise o preview, abra a mudança para revisão e só então faça merge na branch de produção.
6. Depois do deploy, confira a rota alterada, metadata, links e sitemap quando aplicável.

```sh
npm ci
npm run test
npm run typecheck
npm run lint
PUBLIC_SITE_URL=https://dominio-final.example npm run build
npm run audit:html
npm run audit:site
PUBLIC_SITE_URL=https://dominio-final.example npm run validate:metadata
npm audit
```

## Conteúdo e assets

- Produtos ficam em `src/content/products/`; notas, em `src/content/notes/`.
- Dados institucionais e links sociais ficam em `src/config/site.ts`.
- Mantenha notas como rascunho até revisão humana.
- Otimize novas imagens, defina dimensões e texto alternativo e use lazy loading fora da primeira dobra.
- Ao alterar marca ou páginas com Open Graph, regenere os assets conforme `brand.md` e revise o resultado visual.
- Não altere URLs publicadas sem criar redirects permanentes correspondentes no provedor e documentar a migração.

## Dependências e segurança

- Revise atualizações em uma branch separada; não use atualização automática sem testar o build.
- Execute `npm outdated` para identificar versões disponíveis e `npm audit` para vulnerabilidades conhecidas.
- Atualize uma família de dependências por vez e consulte notas de versão em mudanças principais.
- Revalide `vercel.json` e `public/_headers` quando forem adicionados scripts, APIs, fontes ou domínios externos, pois a Content Security Policy poderá precisar de ajustes mínimos.
- Nunca coloque tokens, chaves ou credenciais em `PUBLIC_SITE_URL`, outras variáveis `PUBLIC_*`, conteúdo estático ou commits.

## Analytics futuro e privacidade

Analytics não faz parte do MVP e nenhum serviço foi instalado. Se houver uma necessidade real, avaliar:

- **Cloudflare Web Analytics:** integração simples quando a zona estiver no Cloudflare; revisar o script carregado, política de privacidade e CSP antes de ativar.
- **Plausible:** opção focada em métricas agregadas e com possibilidade de serviço hospedado; revisar região, retenção, proxy e contrato aplicáveis.
- **Umami:** opção hospedada ou self-hosted; considerar manutenção, backups, atualizações, retenção e controle de acesso.

Antes de escolher qualquer opção, definir a finalidade, coletar somente o necessário, revisar obrigações legais aplicáveis e atualizar a política de privacidade. Não assumir que uma ferramenta é automaticamente isenta de consentimento em todos os contextos.

## Revisão periódica

- Testar links internos e externos.
- Revisar títulos, descriptions, canonical, Open Graph, JSON-LD, robots e sitemap.
- Repetir os testes manuais de teclado, zoom e leitor de tela.
- Conferir performance em produção e em um celular modesto.
- Revisar 404, redirects, headers, HTTPS e expiração do domínio.
- Confirmar se status, disponibilidade e datas dos produtos continuam corretos.
- Arquivar ou atualizar conteúdo desatualizado sem apagar URLs indexadas sem planejamento.
