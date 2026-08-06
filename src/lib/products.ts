import type { CollectionEntry } from 'astro:content';
import type { productStatuses } from '../content.config';

export type Product = CollectionEntry<'products'>;
export type ProductStatus = (typeof productStatuses)[number];

export interface ProductAction {
  href: string;
  label: string;
  kind: 'public' | 'play-store' | 'github';
}

export interface ProductLink {
  href: string;
  label: string;
  kind: ProductAction['kind'] | 'policy';
}

const statusLabels: Record<ProductStatus, string> = {
  publicado: 'Publicado',
  online: 'Online',
  'em evolução': 'Em evolução',
  'em desenvolvimento': 'Em desenvolvimento',
  pausado: 'Pausado',
  conceito: 'Conceito',
  privado: 'Privado',
};

export function sortProducts(products: readonly Product[]): Product[] {
  return [...products].sort((first, second) => {
    const firstOrder = first.data.ordem ?? Number.POSITIVE_INFINITY;
    const secondOrder = second.data.ordem ?? Number.POSITIVE_INFINITY;

    return (
      firstOrder - secondOrder ||
      first.data.nome.localeCompare(second.data.nome, 'pt-BR')
    );
  });
}

export function filterFeaturedProducts(
  products: readonly Product[],
): Product[] {
  return sortProducts(products.filter((product) => product.data.destaque));
}

export function formatProductStatus(
  status: ProductStatus | undefined,
): string | null {
  return status ? statusLabels[status] : null;
}

export function formatProductDate(date: Date | undefined): string | null {
  if (!date || Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isUsableLink(
  value: string | null | undefined,
): value is string {
  if (!value?.trim()) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function getAvailableProductLinks(product: Product): ProductLink[] {
  const links: Array<ProductLink | null> = [
    isUsableLink(product.data.urlPublica)
      ? {
          href: product.data.urlPublica,
          label: product.data.textoAcaoPrincipal ?? 'Acessar produto',
          kind: 'public',
        }
      : null,
    isUsableLink(product.data.urlPlayStore)
      ? {
          href: product.data.urlPlayStore,
          label: 'Ver na Play Store',
          kind: 'play-store',
        }
      : null,
    product.data.repositorioPublico && isUsableLink(product.data.urlGithub)
      ? {
          href: product.data.urlGithub,
          label: 'Ver código no GitHub',
          kind: 'github',
        }
      : null,
    isUsableLink(product.data.urlPolitica)
      ? {
          href: product.data.urlPolitica,
          label: 'Política de privacidade',
          kind: 'policy',
        }
      : null,
  ];

  return links.filter((link): link is ProductLink => link !== null);
}

export function getPrimaryProductAction(
  product: Product,
): ProductAction | null {
  const action = getAvailableProductLinks(product).find(
    (link): link is ProductAction => link.kind !== 'policy',
  );

  return action ?? null;
}

const activeLabStatuses: ReadonlySet<ProductStatus> = new Set([
  'publicado',
  'online',
  'em evolução',
  'em desenvolvimento',
]);

export function filterLabActivityProducts(
  products: readonly Product[],
  limit = 2,
): Product[] {
  const safeLimit = Math.max(0, Math.floor(limit));

  return sortProducts(
    products.filter(
      (product) =>
        product.data.status !== undefined &&
        activeLabStatuses.has(product.data.status),
    ),
  ).slice(0, safeLimit);
}

export function validateProductCollection(products: readonly Product[]): void {
  const slugs = new Set<string>();
  const orders = new Set<number>();

  for (const product of products) {
    if (slugs.has(product.data.slug)) {
      throw new Error(`Slug de produto duplicado: ${product.data.slug}`);
    }
    slugs.add(product.data.slug);

    if (product.data.ordem === undefined) continue;
    if (orders.has(product.data.ordem)) {
      throw new Error(`Ordem de produto duplicada: ${product.data.ordem}`);
    }
    orders.add(product.data.ordem);
  }
}
