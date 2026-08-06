export interface CurrentFocus {
  workingAt: string;
  studying: readonly string[];
  interests: readonly string[];
}

export const currentFocus: CurrentFocus = {
  workingAt: 'Vision System',
  studying: ['Arquitetura de Software', 'Sistemas distribuídos', 'TanStack', 'Astro'],
  interests: ['Produtos digitais', 'Dados públicos', 'Integração de APIs', 'Performance', 'Experiência do usuário'],
};
