import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;
  const isAuthPage = request.nextUrl.pathname === '/Auth';
  const isPublicPage = request.nextUrl.pathname === '/';
  const isPublicRoute = ['/feed', '/store', '/chat'].includes(request.nextUrl.pathname);

  // Se estiver na página de autenticação e tiver token, redireciona para o feed
  if (isAuthPage && authToken) {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  // Se não estiver em uma página pública e não tiver token, redireciona para autenticação
  if (!isPublicPage && !isAuthPage && !isPublicRoute && !authToken) {
    return NextResponse.redirect(new URL('/Auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}; 