import assert from 'node:assert/strict';
import test from 'node:test';
import type { Note } from '../../src/lib/notes.ts';
import {
  formatNoteDate,
  getRelatedNotes,
  sortPublishedNotes,
} from '../../src/lib/notes.ts';

function note(
  id: string,
  data: Partial<Note['data']> &
    Pick<Note['data'], 'titulo' | 'resumo' | 'tema' | 'rascunho'>,
): Note {
  return { id, data } as Note;
}

test('remove rascunhos e notas publicadas sem data', () => {
  const notes = [
    note('rascunho', {
      titulo: 'Rascunho',
      resumo: 'Resumo',
      tema: 'Produto',
      rascunho: true,
    }),
    note('incompleta', {
      titulo: 'Incompleta',
      resumo: 'Resumo',
      tema: 'Produto',
      rascunho: false,
    }),
    note('publicada', {
      titulo: 'Publicada',
      resumo: 'Resumo',
      tema: 'Produto',
      rascunho: false,
      data: new Date('2026-08-05'),
    }),
  ];

  assert.deepEqual(
    sortPublishedNotes(notes).map(({ id }) => id),
    ['publicada'],
  );
});

test('ordena notas publicadas da mais recente para a mais antiga', () => {
  const notes = [
    note('antiga', {
      titulo: 'Antiga',
      resumo: 'Resumo',
      tema: 'Produto',
      rascunho: false,
      data: new Date('2025-01-01'),
    }),
    note('recente', {
      titulo: 'Recente',
      resumo: 'Resumo',
      tema: 'Produto',
      rascunho: false,
      data: new Date('2026-01-01'),
    }),
  ];

  assert.deepEqual(
    sortPublishedNotes(notes).map(({ id }) => id),
    ['recente', 'antiga'],
  );
});

test('relaciona notas por tema e limita o resultado', () => {
  const current = note('atual', {
    titulo: 'Atual',
    resumo: 'Resumo',
    tema: 'Arquitetura',
    rascunho: false,
    data: new Date('2026-01-03'),
  });
  const notes = [
    current,
    note('relacionada', {
      titulo: 'Relacionada',
      resumo: 'Resumo',
      tema: 'Arquitetura',
      rascunho: false,
      data: new Date('2026-01-02'),
    }),
    note('outro-tema', {
      titulo: 'Outro tema',
      resumo: 'Resumo',
      tema: 'Produto',
      rascunho: false,
      data: new Date('2026-01-01'),
    }),
  ];

  assert.deepEqual(
    getRelatedNotes(current, notes, 1).map(({ id }) => id),
    ['relacionada'],
  );
});

test('formata datas em português sem deslocamento de fuso', () => {
  assert.equal(formatNoteDate(new Date('2026-08-05')), '05 de agosto de 2026');
  assert.equal(formatNoteDate(undefined), null);
});
