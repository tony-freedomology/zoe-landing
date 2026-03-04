import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // If accessing from jesus.red, rewrite root to /jesus-red
  if (hostname.includes('jesus.red')) {
    const url = request.nextUrl.clone();
    
    // Only rewrite the root path — let other paths pass through
    if (url.pathname === '/') {
      url.pathname = '/jesus-red';
      return NextResponse.rewrite(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
