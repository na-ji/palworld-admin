import { NextResponse } from 'next/server';

import { auth } from './auth';

const passthroughsMiddleware = () => NextResponse.next();

const authIsConfigured =
  !!process.env.AUTH_DISCORD_ID && !!process.env.AUTH_DISCORD_SECRET && !!process.env.AUTH_SECRET;

export const middleware = authIsConfigured ? auth : passthroughsMiddleware;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png).*)',
  ],
};
