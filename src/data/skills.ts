export interface SkillGroup {
  name: string;
  items: readonly string[];
}

export const skillGroups = [
  { name: 'Frontend', items: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Astro', 'Tailwind CSS', 'PrimeNG'] },
  { name: 'Backend', items: ['C#', '.NET', 'Python', 'Django', 'Django REST Framework', 'Node.js', 'Express'] },
  { name: 'Mobile', items: ['React Native', 'Expo'] },
  { name: 'Dados', items: ['PostgreSQL', 'SQL Server', 'Redis', 'MongoDB'] },
  { name: 'Infraestrutura e ferramentas', items: ['Docker', 'Nginx', 'Linux', 'Git', 'GitHub', 'Insomnia', 'DBeaver', 'SVN'] },
  { name: 'Conceitos e práticas', items: ['APIs REST', 'Arquitetura de Software', 'Integração de sistemas', 'Modelagem de dados', 'Processamento assíncrono', 'Responsividade', 'Acessibilidade', 'Versionamento', 'Kanban'] },
] as const satisfies readonly SkillGroup[];
