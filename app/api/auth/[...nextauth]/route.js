import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../../models/User';
import { connect, isDbConneted } from '@/lib/db';
connect()

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        farmName: { label: 'Farm Name', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        
        try {
          const user = await User.findOne({ farmName: credentials.farmName });
          if (user) {
            const isPasswordCorrect = credentials.password === user.password;

            if (isPasswordCorrect) {
               return user
            }
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    
    async session({ session, user, token }) {
      return token
    },
   
    
  },
  
  
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
