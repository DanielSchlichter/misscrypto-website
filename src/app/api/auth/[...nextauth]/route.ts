import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

// Stelle sicher, dass NEXTAUTH_URL und NEXTAUTH_SECRET gesetzt sind
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'https://misscrypto.de'
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret-misscrypto-2024'

if (!process.env.NEXTAUTH_SECRET) {
  console.warn('⚠️ NEXTAUTH_SECRET nicht gesetzt, verwende Fallback');
}

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
          
          // Prüfe ob Firebase Auth verfügbar ist
          if (!auth) {
            console.error('❌ Firebase Auth ist nicht initialisiert');
            throw new Error('Firebase Auth nicht verfügbar');
          }
          
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
          
          // Fallback Admin Login für Produktion und Entwicklung
          console.log('🔧 Verwende lokale Admin-Credentials als Fallback')
          
          const adminEmail = process.env.ADMIN_EMAIL || 'admin@misscrypto.de'
          const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
          
          if (credentials.email === adminEmail && credentials.password === adminPassword) {
            console.log('✅ Fallback Login erfolgreich!')
            return {
              id: 'fallback-admin',
              email: adminEmail,
              name: 'Admin',
              role: 'admin'
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
  secret: NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // Debug-Mode für Development
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 