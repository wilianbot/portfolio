export interface ProfileLink {
  label: string;
  href: string | null;
}

export interface Language {
  name: string;
  proficiency: string;
}

export const profile = {
  fullName: 'Wilian Robal dos Santos',
  displayName: 'Wilian Robal',
  professionalTitle: 'Desenvolvedor Full Stack',
  location: 'Chapecó, Santa Catarina, Brasil',
  email: 'wrlabs.apps@gmail.com',
  subtitle:
    'Desenvolvedor Full Stack construindo aplicações web, sistemas empresariais e produtos digitais.',
  seoTitle: 'Wilian Robal — Desenvolvedor Full Stack | WR Labs',
  seoDescription:
    'Portfólio de Wilian Robal, desenvolvedor Full Stack em Chapecó, com experiência em Angular, React, Django, C#/.NET, PostgreSQL, Docker e construção de produtos digitais.',
  homeDescription:
    'Sou Wilian Robal, desenvolvedor Full Stack em Chapecó. Trabalho com sistemas empresariais e construo aplicações web e mobile por meio da WR Labs, com interesse especial em Arquitetura de Software, integração de dados e experiência do usuário.',
  about: [
    'Sou Wilian Robal, desenvolvedor de software em Chapecó e estudante de Sistemas de Informação. Minha trajetória profissional começou em áreas administrativas, onde desenvolvi organização, comunicação e atenção aos detalhes, e evoluiu para o desenvolvimento de aplicações web, APIs e sistemas empresariais.',
    'Durante meu estágio no Laboratório de Tecnologias em Software, participei da construção e evolução de uma plataforma de dados públicos, trabalhando com Django, Next.js, PostgreSQL, Docker e processamento de dados.',
    'Atualmente, na Vision System, desenvolvo funcionalidades full stack em sistemas empresariais utilizando Angular, C#/.NET, PostgreSQL e SQL Server.',
    'Paralelamente, construo produtos próprios por meio da WR Labs e estudo Arquitetura de Software, com interesse em sistemas úteis, performáticos e fáceis de manter.',
  ],
  buildingInterests: [
    {
      title: 'Arquitetura de Software',
      description:
        'Estruturas claras, integração entre sistemas e decisões que favoreçam manutenção e evolução.',
    },
    {
      title: 'Produtos digitais',
      description:
        'Aplicações que partem de problemas reais e equilibram engenharia, escopo e experiência de uso.',
    },
    {
      title: 'Web, mobile e dados',
      description:
        'Interfaces, APIs e fluxos de dados pensados de forma integrada para o contexto de cada produto.',
    },
    {
      title: 'Performance e experiência',
      description:
        'Sistemas responsivos, acessíveis e simples de compreender tanto para usuários quanto para quem os mantém.',
    },
  ],
  languages: [
    { name: 'Português', proficiency: 'Nativo' },
    { name: 'Inglês', proficiency: 'Conhecimento profissional em desenvolvimento' },
  ] satisfies Language[],
  links: {
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/wilianwr',
    },
    github: { label: 'GitHub', href: null },
    archivedPortfolio: {
      label: 'Portfólio anterior',
      href: 'https://portfolio3d-sable.vercel.app/',
    },
  } satisfies Record<string, ProfileLink>,
} as const;
