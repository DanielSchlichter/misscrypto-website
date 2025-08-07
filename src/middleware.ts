import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Middleware läuft nach erfolgreicher Authentifizierung
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Prüfe Admin-Rolle für /admin Routen (außer Login)
        if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login')) {
          return token?.role === 'admin'
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*']
} 