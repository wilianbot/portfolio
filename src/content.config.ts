import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const productStatuses = [
  'publicado',
  'online',
  'em evolução',
  'em desenvolvimento',
  'pausado',
  'conceito',
  'privado',
] as const;

const requiredText = z.string().trim().min(1);
const optionalText = requiredText.optional();
const optionalUrl = z.url().optional();
const textList = z.array(requiredText).optional();

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      slug: requiredText.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      nome: requiredText,
      descricaoCurta: optionalText,
      resumoCompleto: optionalText,
      categoria: optionalText,
      contexto: optionalText,
      publico: optionalText,
      proposta: optionalText,
      responsabilidades: textList,
      creditos: optionalText,
      status: z.enum(productStatuses).optional(),
      destaque: z.boolean().default(false),
      ordem: z.number().int().nonnegative().optional(),
      anoInicio: z.number().int().positive().optional(),
      plataforma: z.array(requiredText).optional(),
      tecnologiasPrincipais: textList,
      problemasResolvidos: textList,
      funcionalidades: textList,
      decisoesTecnicas: textList,
      arquitetura: optionalText,
      diagramaArquitetura: z
        .object({
          descricao: requiredText,
          etapas: z.array(
            z.object({
              nome: requiredText,
              detalhe: optionalText,
            }),
          ).min(2),
        })
        .optional(),
      armazenamento: optionalText,
      seguranca: optionalText,
      performance: optionalText,
      solucoesAdotadas: textList,
      aprendizados: textList,
      desafios: textList,
      proximosPassos: textList,
      limitacoes: textList,
      imagemCapa: image().optional(),
      galeria: z
        .array(
          z.object({
            imagem: image(),
            alt: requiredText,
            legenda: optionalText,
          }),
        )
        .optional(),
      urlPublica: optionalUrl,
      urlPlayStore: optionalUrl,
      urlGithub: optionalUrl,
      repositorioPublico: z.boolean().default(false),
      urlPolitica: optionalUrl,
      textoAcaoPrincipal: optionalText,
      disponibilidade: optionalText,
      ultimaAtualizacao: z.coerce.date().optional(),
      seoTitle: optionalText,
      seoDescription: optionalText,
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z
    .object({
      titulo: requiredText,
      resumo: requiredText,
      data: z.coerce.date().optional(),
      atualizacao: z.coerce.date().optional(),
      tema: requiredText,
      tempoLeitura: z.number().int().positive().optional(),
      projetoRelacionado: reference('products').optional(),
      rascunho: z.boolean().default(true),
      seoTitle: optionalText,
      seoDescription: optionalText,
    })
    .superRefine((note, context) => {
      if (note.rascunho) return;

      const requiredPublicationFields = [
        ['data', note.data],
        ['tempoLeitura', note.tempoLeitura],
        ['seoTitle', note.seoTitle],
        ['seoDescription', note.seoDescription],
      ] as const;

      for (const [field, value] of requiredPublicationFields) {
        if (value !== undefined) continue;
        context.addIssue({
          code: 'custom',
          message: `${field} é obrigatório para uma nota publicada`,
          path: [field],
        });
      }
    }),
});

export const collections = { products, notes };
