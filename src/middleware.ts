import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('a_session_' + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  // Se o usuário estiver logado e tentar acessar a landing page
  if (session?.value && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/feed', request.url), {
      status: 307, // Temporary Redirect
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
}; 