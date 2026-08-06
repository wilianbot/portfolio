import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizePublicSiteUrl } from '../../src/lib/public-site-url.ts';

test('normaliza uma origem pública válida', () => {
  assert.equal(
    normalizePublicSiteUrl(' https://www.example.com/ '),
    'https://www.example.com',
  );
  assert.equal(normalizePublicSiteUrl(undefined), undefined);
});

test('rejeita domínio com caminho ou protocolo inadequado', () => {
  assert.throws(() => normalizePublicSiteUrl('https://example.com/site'));
  assert.throws(() => normalizePublicSiteUrl('ftp://example.com'));
  assert.throws(() => normalizePublicSiteUrl('dominio-sem-protocolo.example'));
});
