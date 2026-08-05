---
name: wr-labs-site
description: Diretrizes obrigatorias de produto, design, conteudo, acessibilidade, performance e processo para o site institucional e portfolio de produtos da WR Labs. Usar em toda tarefa de analisar, planejar, criar, alterar, corrigir, revisar, testar ou documentar o site WR Labs e seus arquivos Astro, TypeScript, CSS, componentes, paginas, conteudo e documentacao.
---

# Site da WR Labs

Aplicar estas regras a cada etapa solicitada para o site. Implementar somente o escopo pedido e parar ao concluir.

## Preparar o trabalho

Antes de alterar qualquer arquivo:

1. Ler `README.md`.
2. Ler `AGENTS.md` e todas as instrucoes referenciadas por ele.
3. Ler `PRODUCT_SPEC.md`.
4. Localizar e ler os arquivos existentes em `docs/`, caso existam.
5. Inspecionar o estado atual do repositorio e preservar alteracoes do usuario.

## Objetivo do produto

Criar uma presenca digital propria para a WR Labs que apresente produtos, aplicativos e projetos desenvolvidos por Wilian. Transmitir laboratorio de produtos digitais, simplicidade, qualidade, autonomia, evolucao continua e solucoes para problemas reais. Evitar aparencia de portfolio generico de desenvolvedor.

## Direcao visual

Criar uma interface minimalista, moderna, editorial, leve, responsiva, espacosa, elegante e com personalidade propria. Usar Vercel, Linear ou Apple apenas como referencias de qualidade; nao copiar layouts, textos, componentes ou identidade.

Nao usar:

- particulas, fundos animados, videos automaticos, WebGL ou efeitos 3D;
- excesso de gradientes, carrosseis ou muitas caixas pequenas;
- dezenas de tecnologias na Home;
- barras de habilidades, porcentagens inventadas ou contadores animados;
- frases genericas como “apaixonado por tecnologia”;
- animacoes pesadas para celulares simples;
- dependencias de UI pesadas ou frameworks CSS;
- icones carregados por CDN ou imagens remotas obrigatorias.

## Stack e arquitetura

- Usar Astro, componentes Astro, TypeScript estrito e CSS puro.
- Manter conteudo estatico, sem backend, banco, autenticacao ou CMS no MVP.
- Adicionar JavaScript somente quando HTML e CSS nao resolverem o comportamento.

## Performance e acessibilidade

Garantir funcionamento em celulares simples, computadores antigos, conexoes lentas, telas a partir de 320 px e, nas areas informativas, com JavaScript desabilitado.

Seguir WCAG 2.2 AA: navegacao por teclado, foco visivel, contraste adequado, HTML semantico, link para pular ao conteudo, labels acessiveis, textos alternativos, `prefers-reduced-motion`, alvos confortaveis, zoom de 200% e nenhuma informacao transmitida apenas por cor.

## Integridade do conteudo

Nunca inventar usuarios, receita, downloads, avaliacoes, anos de experiencia, publicacao, links, metricas, depoimentos ou clientes. Para informacao nao confirmada, criar estrutura configuravel ou marcar pendencia no codigo sem exibir dado falso.

Usar estes dados confirmados:

- Nome: WR Labs
- Contato: `wrlabs.apps@gmail.com`
- Idioma inicial: Portugues do Brasil
- Projetos conhecidos: ProntoDoc, Gestoriza, Chronos, ZapWriter e Observatorio Legislativo de Chapeco

Permitir projetos futuros e nao assumir que os projetos conhecidos estao publicados.

## Encerrar cada etapa

Executar os comandos de qualidade relevantes ao repositorio. Ao terminar, informar:

1. arquivos criados;
2. arquivos modificados;
3. dependencias adicionadas;
4. decisoes principais;
5. comandos de qualidade executados e seus resultados;
6. checklist de teste manual;
7. limitacoes e pendencias.

Nao avancar para outra etapa sem autorizacao. Parar e aguardar a proxima solicitacao.
