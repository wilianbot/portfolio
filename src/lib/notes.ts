import type { CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

export function sortPublishedNotes(notes: readonly Note[]): Note[] {
  return notes
    .filter((note) => !note.data.rascunho && note.data.data !== undefined)
    .sort((first, second) => {
      const dateDifference =
        (second.data.data?.getTime() ?? 0) -
        (first.data.data?.getTime() ?? 0);

      return (
        dateDifference ||
        first.data.titulo.localeCompare(second.data.titulo, 'pt-BR')
      );
    });
}

export function formatNoteDate(date: Date | undefined): string | null {
  if (!date || Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function getRelatedNotes(
  current: Note,
  publishedNotes: readonly Note[],
  limit = 2,
): Note[] {
  const safeLimit = Math.max(0, Math.floor(limit));
  const relatedProjectId = current.data.projetoRelacionado?.id;

  return sortPublishedNotes(
    publishedNotes.filter((candidate) => {
      if (candidate.id === current.id) return false;

      const sameProject =
        relatedProjectId !== undefined &&
        candidate.data.projetoRelacionado?.id === relatedProjectId;

      return sameProject || candidate.data.tema === current.data.tema;
    }),
  ).slice(0, safeLimit);
}
