import { defineCollection } from 'astro:content';
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
      status: z.enum(productStatuses).optional(),
      destaque: z.boolean().default(false),
      ordem: z.number().int().nonnegative().optional(),
      anoInicio: z.number().int().positive().optional(),
      plataforma: z.array(requiredText).optional(),
      tecnologiasPrincipais: textList,
      problemasResolvidos: textList,
      funcionalidades: textList,
      decisoesTecnicas: textList,
      aprendizados: textList,
      desafios: textList,
      imagemCapa: image().optional(),
      galeria: z.array(image()).optional(),
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

export const collections = { products };
