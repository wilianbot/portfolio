# Checklist de pré-lançamento — WR Labs

Este documento registra a auditoria técnica da Etapa 11. Pontuações automatizadas são evidência auxiliar, não substituem testes com pessoas, tecnologias assistivas e infraestrutura real.

## Resumo observado

- 14 páginas HTML estáticas auditadas.
- 0 bytes de JavaScript executável enviados ao cliente.
- 24.415 bytes de CSS no conjunto completo de chunks do build.
- Maior imagem: `og/home.jpg`, com 43.576 bytes e 1200 × 630 px.
- Nenhuma imagem de conteúdo carregada na primeira dobra atual.
- Fontes exclusivamente do sistema; nenhum arquivo de fonte ou domínio externo.
- Nenhum vídeo, canvas, WebGL, autoplay ou animação contínua.
- Nenhum link interno quebrado e nenhuma página pública órfã.
- Nenhuma vulnerabilidade encontrada por `npm audit`.

## Problemas encontrados e correções

- [x] Removidos `aria-label` incompatíveis com o texto visível da marca “WR Labs”.
- [x] Transformados grupos de ações em elementos com `role="group"` antes de nomeá-los.
- [x] Convertidos os princípios da Home em lista semântica.
- [x] Removido `role="list"` redundante da página do design system.
- [x] Movido o cabeçalho global para fora de `<main>`, restaurando o landmark de banner.
- [x] Adicionados scripts repetíveis para validar HTML, links, fragments, headings, landmarks, imagens, scripts de cliente e páginas órfãs.
- [x] Removido Lighthouse das dependências após a auditoria; a ferramenta não é necessária no build ou CI cotidiano.

## Performance

### Build e entrega

- [x] Conteúdo informativo funciona sem JavaScript.
- [x] Nenhum bundle JavaScript foi gerado em `dist/`.
- [x] HTML, CSS e assets são locais e estáticos.
- [x] CSS não utilizado: Lighthouse não identificou economia nos quatro templates amostrados.
- [x] Layout shift: CLS observado de `0` em todos os templates amostrados.
- [x] Total Blocking Time: `0 ms` em todos os templates amostrados.
- [x] Imagens Open Graph entre aproximadamente 32 e 44 KB; não são carregadas no corpo das páginas.
- [x] Galerias futuras exigem dimensões conhecidas, `picture/srcset`, AVIF/WebP e `loading="lazy"`.
- [x] Não há preload de fontes ou imagens porque não existem recursos críticos que justifiquem a antecipação.
- [x] Transições são curtas e anuladas por `prefers-reduced-motion`.

### Lighthouse mobile — preview local

Templates auditados: Home, listagem de produtos, ProntoDoc e Sobre.

- Performance: 100 nas quatro amostras.
- Acessibilidade: 100 nas quatro amostras.
- Boas práticas: 100 nas quatro amostras.
- SEO: 100 nas quatro amostras.
- FCP observado: 0,8–1,0 s.
- LCP observado: 0,9–1,0 s.
- Speed Index observado: 0,8–0,9 s.
- Transferência inicial observada: 8–10 KiB.

O Lighthouse apontou CSS render-blocking, mas os arquivos envolvidos eram folhas essenciais com aproximadamente 2,5 KB e 1,7 KB transferidos. Não foi aplicado preload redundante para perseguir uma métrica sem benefício real.

### Hospedagem — validar no ambiente real

- [ ] Confirmar Brotli ou Gzip para HTML, CSS, JSON, SVG e manifest.
- [ ] Confirmar cache longo e `immutable` para `/_astro/*`, cujos nomes possuem hash.
- [ ] Definir cache adequado para ícones e imagens Open Graph.
- [ ] Manter HTML e `robots.txt` com cache curto ou revalidação.
- [ ] Repetir Lighthouse em produção, sem extensões e com cache limpo.
- [ ] Testar rede lenta e aparelho Android de entrada.

O servidor `astro preview` usa `Cache-Control: no-cache` e não representa as políticas de compressão do host definitivo.

## Acessibilidade

### Automatizado e inspecionado

- [x] `html-validate` aprovado em todas as páginas geradas.
- [x] Lighthouse/axe aprovado nos quatro templates representativos.
- [x] Um único `<main>` e um único `<h1>` por página.
- [x] Cabeçalho e rodapé reconhecíveis como landmarks nas páginas públicas.
- [x] Skip link aponta para `#conteudo` e aparece ao receber foco.
- [x] Links externos com nova aba usam `rel="noreferrer"`.
- [x] Nenhum link vazio ou destino interno quebrado.
- [x] Estados não dependem exclusivamente de cor.
- [x] Combinações textuais auditadas entre 5,31:1 e 16,95:1.
- [x] Foco visível global e alvos principais com pelo menos 44 px.
- [x] Capturas em 320 px da Home e Sobre sem overflow horizontal ou texto cortado.
- [x] Textos longos da página Sobre quebram naturalmente em 320 px.
- [x] Não há imagens de conteúdo sem `alt` ou dimensões explícitas no build atual.
- [x] Navegação usa recarga completa; o foco retorna ao início do documento. O link de salto permite chegar diretamente ao conteúdo.

### Testes humanos necessários

- [ ] Percorrer todas as páginas somente com `Tab`, `Shift+Tab`, `Enter` e barra de espaço.
- [ ] Confirmar ordem de foco e indicador visual nos temas claro e escuro.
- [ ] Testar zoom real de 200% e 400% no navegador, incluindo reflow a 320 CSS px.
- [ ] Testar com NVDA + Firefox ou JAWS + Chrome no Windows.
- [ ] Testar com VoiceOver + Safari no macOS/iOS e TalkBack no Android.
- [ ] Verificar pronúncia de “WR Labs”, nomes de produtos e termos em inglês.
- [ ] Confirmar que o conteúdo continua compreensível com CSS desabilitado.
- [ ] Quando galerias forem adicionadas, revisar cada alt text e legenda no contexto real.

## SEO

- [x] Titles e descriptions presentes em todas as 14 páginas.
- [x] Open Graph, Twitter Card, manifest e JSON-LD válidos no HTML.
- [x] Canonical validado com uma origem reservada de teste.
- [x] Sitemap gerado com domínio configurado.
- [x] 404 e design system fora do sitemap e marcados como `noindex`.
- [x] `robots.txt` aponta para o sitemap quando `PUBLIC_SITE_URL` existe.
- [x] Breadcrumbs estruturados nas rotas internas quando o domínio existe.
- [x] Rascunhos de notas ausentes do build público.
- [x] Nenhuma página pública órfã.
- [x] Nenhum dado estruturado de preço, avaliação, download, endereço, telefone ou equipe foi inventado.

### Antes da publicação

- [ ] Definir `PUBLIC_SITE_URL` com o domínio real.
- [ ] Executar build e `validate:metadata` usando o domínio real.
- [ ] Validar JSON-LD após a URL estar publicamente acessível.
- [ ] Testar compartilhamento Open Graph nas plataformas relevantes.
- [ ] Confirmar que GitHub e LinkedIn permanecem ocultos até receberem URLs oficiais.

## Comandos de auditoria

```sh
npm run test
npm run typecheck
npm run lint
PUBLIC_SITE_URL=https://dominio.example npm run build
npm run audit:html
npm run audit:site
PUBLIC_SITE_URL=https://dominio.example npm run validate:metadata
npm audit
```

Para repetir Lighthouse, iniciar `npm run preview` após o build e executar a versão atual da CLI em templates representativos. Não manter Lighthouse como dependência do projeto apenas para preservar uma pontuação histórica.
