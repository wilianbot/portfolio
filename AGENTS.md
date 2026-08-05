# Instruções para agentes

Antes de alterar arquivos, leia `README.md`, este arquivo, `PRODUCT_SPEC.md` e os documentos existentes em `docs/`.

Use a skill do projeto em `.agents/skills/wr-labs-site/SKILL.md` em toda tarefa relacionada ao site WR Labs.

## Regras essenciais

- Implemente somente a etapa solicitada.
- Use Astro, TypeScript estrito, CSS puro e conteúdo estático.
- Evite JavaScript quando HTML e CSS forem suficientes.
- Preserve acessibilidade WCAG 2.2 AA e funcionamento a partir de 320 px.
- Não invente métricas, links, clientes, depoimentos ou status de publicação.
- Centralize dados institucionais em `src/config/site.ts`.
- Não avance para outra etapa sem autorização.

## Validação

Ao concluir, execute:

```sh
npm run typecheck
npm run lint
npm run build
```

Informe arquivos criados e modificados, dependências, decisões, resultados dos comandos, testes manuais e limitações.
