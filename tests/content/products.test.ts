import assert from 'node:assert/strict';
import test from 'node:test';
import type { Product } from '../../src/lib/products.ts';
import {
  filterFeaturedProducts,
  filterLabActivityProducts,
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

test('só expõe GitHub quando o repositório é confirmado como público', () => {
  const privateRepository = product({
    slug: 'privado',
    nome: 'Privado',
    urlGithub: 'https://github.com/example/private',
  });
  const publicRepository = product({
    slug: 'publico',
    nome: 'Público',
    urlGithub: 'https://github.com/example/public',
    repositorioPublico: true,
  });

  assert.equal(getAvailableProductLinks(privateRepository).length, 0);
  assert.equal(getAvailableProductLinks(publicRepository).length, 1);
});

test('limita o laboratório a projetos ativos ou em desenvolvimento', () => {
  const products = [
    product({ slug: 'pausado', nome: 'Pausado', ordem: 1, status: 'pausado' }),
    product({ slug: 'online', nome: 'Online', ordem: 2, status: 'online' }),
    product({
      slug: 'desenvolvimento',
      nome: 'Desenvolvimento',
      ordem: 3,
      status: 'em desenvolvimento',
    }),
    product({ slug: 'evolucao', nome: 'Evolução', ordem: 4, status: 'em evolução' }),
  ];

  assert.deepEqual(
    filterLabActivityProducts(products).map(({ data }) => data.slug),
    ['online', 'desenvolvimento'],
  );
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
