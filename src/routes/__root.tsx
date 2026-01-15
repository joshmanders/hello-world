import { createRootRoute, Outlet, useRouterState, HeadContent, Scripts } from '@tanstack/react-router';
import { Netscape } from '@app/components/Netscape';
import { VisitTracker } from '@app/components/VisitTracker';
import appCss from '@app/styles.css?url';

const getPageTitle = (pathname: string): string => {
  if (pathname.includes('guestbook')) return 'Sign My Guestbook!!';
  return 'Hello World!';
};

const getPageUrl = (pathname: string): string => {
  const base = 'http://hello-world.primcloud.app';
  if (pathname === '/') return `${base}/`;
  return `${base}${pathname}`;
};

const RootComponent = () => {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const title = getPageTitle(pathname);
  const url = getPageUrl(pathname);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-comic bg-retro-gray flex min-h-screen flex-col">
        <VisitTracker />
        <Netscape title={title} url={url}>
          <Outlet />
        </Netscape>
        <Scripts />
      </body>
    </html>
  );
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Hello World!' },
      { property: 'og:image', content: 'http://hello-world.primcloud.app/og.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'http://hello-world.primcloud.app/og.png' },
      // Theme color
      { name: 'theme-color', content: '#c0c0c0' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // Favicons
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  component: RootComponent,
});
