export function normalizePublicSiteUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim();

  if (!candidate) return undefined;

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error('PUBLIC_SITE_URL deve ser uma URL absoluta válida.');
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('PUBLIC_SITE_URL deve usar http:// ou https://.');
  }

  if (
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'PUBLIC_SITE_URL deve conter somente a origem, sem credenciais, caminho, query ou fragmento.',
    );
  }

  return url.origin;
}
