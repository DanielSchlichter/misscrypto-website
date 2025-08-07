import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'E-Mail', type: 'email' },
        password: { label: 'Passwort', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          console.log('🔐 Firebase Login-Versuch:', credentials.email)
          
          // Verwende Firebase Authentication
          const userCredential = await signInWithEmailAndPassword(
            auth, 
            credentials.email, 
            credentials.password
          )
          
          const user = userCredential.user
          
          console.log('✅ Firebase Login erfolgreich!', user.uid)
          
          return {
            id: user.uid,
            email: user.email || '',
            name: user.displayName || 'Admin',
            role: 'admin' // Alle angemeldeten User sind Admins für jetzt
          }
        } catch (error: any) {
          console.log('❌ Firebase Login-Fehler:', error.message)
          
          // Fallback für Entwicklung - erstelle Admin User wenn er nicht existiert
          if (error.code === 'auth/user-not-found' && process.env.NODE_ENV === 'development') {
            console.log('🔧 Entwicklung: Verwende lokale Admin-Credentials')
            
            const adminEmail = process.env.ADMIN_EMAIL || 'admin@misscrypto.de'
            const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
            
            if (credentials.email === adminEmail && credentials.password === adminPassword) {
              console.log('✅ Entwicklung Login erfolgreich!')
              return {
                id: 'dev-admin',
                email: adminEmail,
                name: 'Dev Admin',
                role: 'admin'
              }
            }
          }
          
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
    strategy: 'jwt' as const,
    maxAge: 24 * 60 * 60, // 24 Stunden
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // Debug-Mode für Development
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 