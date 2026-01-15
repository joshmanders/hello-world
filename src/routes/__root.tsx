import { createRootRoute, Outlet, useRouterState, HeadContent, Scripts } from '@tanstack/react-router';
import { Netscape } from '@app/components/Netscape';
import { VisitTracker } from '@app/components/VisitTracker';
import appCss from '@app/styles.css?url';

const getPageTitle = (pathname: string): string => {
  if (pathname === '/') return 'Hello World!';
  if (pathname.includes('guestbook')) return 'Sign My Guestbook!!';
  return 'Primcloud';
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
      <body className="font-comic bg-retro-gray flex flex-col">
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
    meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});
