import { defineMiddleware } from 'astro:middleware';
import { localeFromPath } from './i18n';
import { localizeHtml } from './i18n/html';
export const onRequest = defineMiddleware(async ({ url }, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html') || url.pathname.startsWith('/previews/')) return response;
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(localizeHtml(await response.text(), localeFromPath(url.pathname)), { status: response.status, headers });
});
