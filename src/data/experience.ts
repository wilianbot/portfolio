export interface ProfessionalExperience {
  id: 'vision' | 'lts' | 'expresso' | 'lionbridge';
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  details: readonly string[];
  technologies?: readonly string[];
  relatedProductSlug?: string;
  emphasis: 'technical' | 'supporting';
}

export const professionalExperiences: readonly ProfessionalExperience[] = [
  {
    id: 'vision',
    company: 'Vision System',
    role: 'Programador de Sistemas — Trainee',
    period: 'Julho de 2025 — Atual',
    location: 'Chapecó, Santa Catarina, Brasil',
    summary:
      'Desenvolvimento de funcionalidades em sistemas empresariais utilizando Angular, C#/.NET e bancos de dados relacionais.',
    details: [
      'Desenvolvimento de interfaces com Angular, PrimeNG e PrimeFlex.',
      'Implementação de telas com listagens, filtros, paginação, modais e formulários.',
      'Integração do frontend com APIs REST desenvolvidas em C#/.NET.',
      'Desenvolvimento de funcionalidades CRUD envolvendo frontend, backend e banco de dados.',
      'Trabalho com PostgreSQL e SQL Server para consultas, scripts, modelagem e persistência.',
      'Manutenção e evolução de módulos de sistemas empresariais.',
      'Contato com internacionalização de interfaces e experiência multilíngue.',
      'Participação no entendimento e evolução da arquitetura existente.',
    ],
    technologies: ['Angular', 'TypeScript', 'PrimeNG', 'C#', '.NET', 'PostgreSQL', 'SQL Server', 'APIs REST'],
    emphasis: 'technical',
  },
  {
    id: 'lts',
    company: 'LTS — Laboratório de Tecnologias em Software',
    role: 'Estagiário de Desenvolvimento de Software',
    period: 'Maio de 2024 — Junho de 2025',
    location: 'Chapecó, Santa Catarina, Brasil',
    summary:
      'Desenvolvimento de uma plataforma para integração, processamento e visualização de dados públicos.',
    details: [
      'Participação no desenvolvimento de uma solução iniciada como aplicação desktop em Python e posteriormente migrada para uma plataforma web.',
      'Desenvolvimento do backend com Django e Django REST Framework.',
      'Desenvolvimento do frontend com Next.js, React, TypeScript, Tailwind CSS e ShadCN.',
      'Integração e persistência de dados provenientes de APIs e documentos públicos.',
      'Automação de tarefas e processamento de dados.',
      'Uso de PostgreSQL como banco de dados relacional.',
      'Containerização da aplicação com Docker.',
      'Testes e validação de APIs utilizando Insomnia.',
      'Participação em decisões técnicas relacionadas à migração, arquitetura, integração e experiência do usuário.',
    ],
    technologies: ['Python', 'Django', 'Django REST Framework', 'Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Redis', 'Celery', 'Tailwind CSS', 'ShadCN'],
    relatedProductSlug: 'observatorio-legislativo',
    emphasis: 'technical',
  },
  {
    id: 'expresso',
    company: 'Expresso São Miguel',
    role: 'Auxiliar Administrativo',
    period: 'Maio de 2022 — Maio de 2024',
    location: 'Chapecó, Santa Catarina, Brasil',
    summary:
      'Experiência administrativa com organização de informações, atendimento e uso de sistemas internos.',
    details: [
      'Apoio às operações administrativas.',
      'Organização documental e entrada de dados.',
      'Atendimento ao cliente e suporte telefônico.',
      'Uso de sistemas internos de gestão de frota.',
      'Cadastro e atualização de informações veiculares.',
      'Desenvolvimento de habilidades de comunicação, organização e resolução de problemas.',
      'Uso de Excel, Word e ferramentas administrativas.',
    ],
    emphasis: 'supporting',
  },
  {
    id: 'lionbridge',
    company: 'Lionbridge',
    role: 'Avaliador de Mídias',
    period: 'Janeiro de 2021 — Fevereiro de 2022',
    summary:
      'Avaliação de anúncios digitais com foco em qualidade, conformidade e atenção aos detalhes.',
    details: [
      'Análise de anúncios com base em diretrizes definidas.',
      'Verificação de qualidade e conformidade do conteúdo.',
      'Desenvolvimento de atenção aos detalhes e capacidade analítica.',
    ],
    emphasis: 'supporting',
  },
] as const;
