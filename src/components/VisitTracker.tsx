'use client';

import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { trackVisit } from '@app/server/visits';

export const VisitTracker = () => {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    // Skip tracking for static assets
    if (pathname.includes('.')) return;

    trackVisit({ data: { path: pathname } });
  }, [pathname]);

  return null;
};
