import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Schütze nur Admin-Routen (außer Login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    if (!token || token.role !== 'admin') {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Nur Admin-Routen matchen (keine API-Routen!)
export const config = {
  matcher: [
    '/admin/dashboard',
    '/admin/dashboard/:path*',
    '/admin/newsfeed',
    '/admin/newsfeed/:path*',
    '/admin/analytics',
    '/admin/analytics/:path*',
    '/admin/settings',
    '/admin/settings/:path*',
    '/admin/media',
    '/admin/media/:path*',
    '/admin/users',
    '/admin/users/:path*',
    '/admin/authors',
    '/admin/authors/:path*'
  ]
} 