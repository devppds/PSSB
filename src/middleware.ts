// Middleware disabled to fix RSC requests on Cloudflare Pages
// Auth is bypassed (always returns true) so middleware is not needed

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simply pass through all requests without auth check
  return NextResponse.next();
}

export const config = {
  matcher: [],  // Empty matcher = middleware won't run
};
