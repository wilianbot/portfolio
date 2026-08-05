import assert from 'node:assert/strict';
import test from 'node:test';
import type { Product } from '../../src/lib/products.ts';
import {
  filterFeaturedProducts,
  formatProductStatus,
  getAvailableProductLinks,
  getPrimaryProductAction,
  isUsableLink,
  sortProducts,
  validateProductCollection,
} from '../../src/lib/products.ts';

function product(data: Partial<Product['data']> & Pick<Product['data'], 'slug' | 'nome'>): Product {
  return { id: `${data.slug}.json`, data } as Product;
}

test('ordena por ordem e usa o nome como desempate', () => {
  const products = [
    product({ slug: 'zeta', nome: 'Zeta', ordem: 2 }),
    product({ slug: 'beta', nome: 'Beta' }),
    product({ slug: 'alfa', nome: 'Alfa', ordem: 2 }),
  ];

  assert.deepEqual(
    sortProducts(products).map(({ data }) => data.nome),
    ['Alfa', 'Zeta', 'Beta'],
  );
});

test('filtra somente destaques e preserva a ordenação', () => {
  const products = [
    product({ slug: 'segundo', nome: 'Segundo', ordem: 2, destaque: true }),
    product({ slug: 'comum', nome: 'Comum', ordem: 1, destaque: false }),
    product({ slug: 'primeiro', nome: 'Primeiro', ordem: 1, destaque: true }),
  ];

  assert.deepEqual(
    filterFeaturedProducts(products).map(({ data }) => data.slug),
    ['primeiro', 'segundo'],
  );
});

test('formata apenas status conhecidos e aceita status ausente', () => {
  assert.equal(formatProductStatus('em desenvolvimento'), 'Em desenvolvimento');
  assert.equal(formatProductStatus(undefined), null);
});

test('descarta links vazios, inválidos e protocolos não web', () => {
  assert.equal(isUsableLink(''), false);
  assert.equal(isUsableLink('javascript:alert(1)'), false);
  assert.equal(isUsableLink('https://example.com/produto'), true);
});

test('escolhe a primeira ação real e mantém política fora da ação principal', () => {
  const onlyPolicy = product({
    slug: 'privado',
    nome: 'Privado',
    urlPolitica: 'https://example.com/politica',
  });
  const publicProduct = product({
    slug: 'online',
    nome: 'Online',
    urlPublica: 'https://example.com',
    urlGithub: 'https://github.com/example/product',
    textoAcaoPrincipal: 'Conhecer produto',
  });

  assert.equal(getPrimaryProductAction(onlyPolicy), null);
  assert.deepEqual(getPrimaryProductAction(publicProduct), {
    href: 'https://example.com',
    label: 'Conhecer produto',
    kind: 'public',
  });
  assert.equal(getAvailableProductLinks(onlyPolicy).length, 1);
});

test('rejeita slugs e ordens duplicados na coleção', () => {
  assert.throws(
    () =>
      validateProductCollection([
        product({ slug: 'produto', nome: 'Um', ordem: 1 }),
        product({ slug: 'produto', nome: 'Dois', ordem: 2 }),
      ]),
    /Slug de produto duplicado/,
  );

  assert.throws(
    () =>
      validateProductCollection([
        product({ slug: 'um', nome: 'Um', ordem: 1 }),
        product({ slug: 'dois', nome: 'Dois', ordem: 1 }),
      ]),
    /Ordem de produto duplicada/,
  );
});
