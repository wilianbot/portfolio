import { normalizePublicSiteUrl } from '../lib/public-site-url';

export const siteConfig = {
  name: 'WR Labs',
  title: 'WR Labs — Laboratório de produtos digitais',
  description: 'Laboratório de produtos digitais.',
  email: 'wrlabs.apps@gmail.com',
  emailSubject: 'Contato pelo site da WR Labs',
  github: null as string | null,
  linkedin: null as string | null,
  domain: normalizePublicSiteUrl(import.meta.env.PUBLIC_SITE_URL) ?? null,
  language: 'pt-BR',
  author: 'Wilian',
  tagline: 'Produtos digitais construídos com atenção.',
  defaultOgImage: '/og/home.jpg',
  manifest: '/manifest.webmanifest',
  contact: {
    title: 'Tem uma ideia, projeto ou oportunidade?',
    description:
      'A WR Labs está aberta a conversas sobre desenvolvimento, produtos digitais e oportunidades profissionais.',
  },
  about: {
    title: 'Construindo produtos enquanto evoluo como desenvolvedor.',
    introduction:
      'Sou Wilian, desenvolvedor de software e estudante de Sistemas de Informação. Trabalho com desenvolvimento de sistemas e construo produtos próprios através da WR Labs.',
    interests: [
      {
        title: 'Arquitetura de software',
        description:
          'Interesso-me por estruturas claras, decisões sustentáveis e sistemas que possam evoluir sem complexidade desnecessária.',
      },
      {
        title: 'Construção de produtos',
        description:
          'Gosto de transformar problemas e ideias em produtos úteis, equilibrando escopo, execução e aprendizado.',
      },
      {
        title: 'Web e mobile',
        description:
          'Construo aplicações web e mobile pensando no contexto em que cada solução será realmente utilizada.',
      },
      {
        title: 'Experiência do usuário',
        description:
          'Tenho atenção à clareza, ao desempenho e aos detalhes que tornam uma interface mais simples de usar.',
      },
      {
        title: 'Aprendizado contínuo',
        description:
          'Uso cada projeto para aprofundar fundamentos, rever decisões e desenvolver uma prática mais consistente.',
      },
    ],
    journey: [
      {
        title: 'Experiência administrativa',
        description:
          'Uma etapa profissional anterior em atividades administrativas.',
      },
      {
        title: 'Laboratório de Tecnologias em Software',
        description:
          'Experiência de estágio no Laboratório de Tecnologias em Software.',
      },
      {
        title: 'Observatório Legislativo',
        description:
          'Participação no Observatório Legislativo durante o contexto de estágio, sem atribuição de propriedade integral do produto.',
      },
      {
        title: 'Programador de Sistemas',
        description: 'Atuação profissional como Programador de Sistemas.',
      },
      {
        title: 'Produtos pessoais',
        description:
          'Criação de produtos próprios para explorar ideias, resolver problemas e consolidar aprendizados.',
      },
      {
        title: 'WR Labs',
        description:
          'Nascimento da WR Labs como espaço para organizar e desenvolver esses produtos.',
      },
    ],
    technologyGroups: [
      { name: 'Frontend', description: 'Interfaces web e experiência de uso.' },
      { name: 'Backend', description: 'Regras de negócio e arquitetura de sistemas.' },
      { name: 'Dados', description: 'Modelagem, persistência e acesso à informação.' },
      { name: 'Infraestrutura', description: 'Ambientes, publicação e confiabilidade.' },
      { name: 'Mobile', description: 'Aplicações para dispositivos móveis.' },
    ],
  },
} as const;
