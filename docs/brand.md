# Identidade da WR Labs

## Conceito

A identidade visual evolui para o conceito **Modern Product Lab**: um pequeno estúdio independente de produtos digitais, moderno, organizado, leve e humano. A marca preserva o cuidado do conceito anterior e evita códigos visuais associados a criptomoedas, agências de marketing ou efeitos tecnológicos genéricos.

## Símbolo

O símbolo combina as letras `W` e `R` com construção geométrica, terminações retas e um único ponto roxo. O desenho deve permanecer simples e legível em tamanhos pequenos.

Arquivos oficiais:

- `public/favicon.svg`: favicon principal;
- `public/icon.svg`: ícone vetorial colorido;
- `public/icon-monochrome.svg`: versão preta sem fundo;
- `public/icon-192.png`: compatibilidade com navegadores e atalhos;
- `public/icon-512.png`: ícone de maior resolução para o manifest.

Não alterar proporções, redesenhar as letras, adicionar gradientes ou usar o roxo como preenchimento dominante. Manter ao redor do símbolo uma área livre mínima equivalente à largura do traço principal.

## Cores essenciais

- Fundo claro: `#f7f7fa`;
- Texto principal: `#18181b`;
- Assinatura roxa: `#6956e8`;
- Seção escura: `#11131b`;
- Versão monocromática: preto sobre fundo transparente.

Os demais tons permanecem centralizados em `src/styles/tokens.css`.

## Imagens Open Graph

As imagens sociais usam 1200 × 630 pixels, texto quase preto, fundo levemente quente, linhas orbitais discretas e apenas um pequeno acento roxo. Os arquivos finais ficam em `public/og/`.

O fundo foi criado com a ferramenta integrada de geração de imagens usando este direcionamento: composição editorial abstrata de laboratório, campo neutro quente, linhas orbitais finas, pontos de registro, baixa densidade, espaço negativo à esquerda, sem texto, logo, dispositivos, 3D ou marca d'água. A tipografia e os nomes foram aplicados posteriormente de forma determinística para preservar grafia e consistência.

Para regenerar os derivados após modificar o fundo ou a lista de páginas:

```sh
node scripts/generate-publication-assets.mjs
```
