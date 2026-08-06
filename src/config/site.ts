import { normalizePublicSiteUrl } from '../lib/public-site-url';
import { profile } from '../data/profile';

export const siteConfig = {
  name: 'WR Labs',
  title: profile.seoTitle,
  description: profile.seoDescription,
  email: profile.email,
  emailSubject: 'Contato pelo site da WR Labs',
  github: profile.links.github.href,
  linkedin: profile.links.linkedin.href,
  domain: normalizePublicSiteUrl(import.meta.env.PUBLIC_SITE_URL) ?? null,
  language: 'pt-BR',
  author: profile.fullName,
  authorDisplayName: profile.displayName,
  professionalTitle: profile.professionalTitle,
  location: profile.location,
  tagline: 'Produtos digitais construídos com atenção.',
  defaultOgImage: '/og/home.jpg',
  manifest: '/manifest.webmanifest',
  contact: {
    title: 'Tem uma ideia, projeto ou oportunidade?',
    description:
      'A WR Labs está aberta a conversas sobre desenvolvimento, produtos digitais e oportunidades profissionais.',
  },
} as const;
