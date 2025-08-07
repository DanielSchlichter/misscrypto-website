import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Einfache, sichere Konfiguration ohne Firebase-Abhängigkeiten
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'misscrypto-secret-key-2024'
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'https://misscrypto.de'

console.log('🔧 NextAuth Config:', { 
  url: NEXTAUTH_URL, 
  hasSecret: !!NEXTAUTH_SECRET,
  nodeEnv: process.env.NODE_ENV 
});

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'E-Mail', type: 'email' },
        password: { label: 'Passwort', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Keine Credentials bereitgestellt')
          return null
        }

        try {
          console.log('🔐 Login-Versuch für:', credentials.email)
          
          // Einfache Admin-Authentifizierung
          const adminEmail = process.env.ADMIN_EMAIL || 'admin@misscrypto.de'
          const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
          
          if (credentials.email === adminEmail && credentials.password === adminPassword) {
            console.log('✅ Admin Login erfolgreich!')
            return {
              id: 'admin-user',
              email: adminEmail,
              name: 'Admin',
              role: 'admin'
            }
          }
          
          console.log('❌ Ungültige Credentials')
          return null
        } catch (error: any) {
          console.error('❌ Login-Fehler:', error.message)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub
        ;(session.user as any).role = token.role
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 Stunden
  },
  secret: NEXTAUTH_SECRET,
  debug: true // Aktiviere Debug für bessere Fehlererkennung
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 