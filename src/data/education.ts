export interface Education {
  institution: string;
  course: string;
  period: string;
  status: string;
  description?: string;
}

export const education: Education = {
  institution: 'Unochapecó — Universidade Comunitária da Região de Chapecó',
  course: 'Bacharelado em Sistemas de Informação',
  period: 'Desde julho de 2023',
  status: 'Em andamento',
  description:
    'Formação voltada a desenvolvimento de software, banco de dados, engenharia de software, sistemas de informação e arquitetura.',
};
