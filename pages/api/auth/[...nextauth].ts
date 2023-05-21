import { ManagementClient, Role } from 'auth0';
import NextAuth, { NextAuthOptions } from 'next-auth';

import {
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_JWT_SECRET,
  SUPABASE_SERVICE_ROLE_KEY,
} from '@/utils/app/auth/constants';
import { getProviders } from '@/utils/app/auth/providers';

import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import jwt from 'jsonwebtoken';

const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users',
})

export const authOptions: NextAuthOptions = {
  providers: await getProviders(),
  session: { strategy: 'jwt' },

  // Supabase adapter is only enabled if JWT secret is specified
  adapter: SUPABASE_JWT_SECRET
    ? SupabaseAdapter({
      url: NEXT_PUBLIC_SUPABASE_URL,
      secret: SUPABASE_SERVICE_ROLE_KEY,
    })
    : undefined,
  
  callbacks: {
    async jwt({token,user}){
      const auth0UserRoles = await auth0.getUserRoles({ id: token.sub!});
      const role: (Role|undefined) = auth0UserRoles[0];
      if(role != undefined){
        token.role = role
      }
      return token;
    },
    async session({ session, token }) {
      console.log('env is');
      console.log(process.env.NODE_ENV);
      const signingSecret = SUPABASE_JWT_SECRET;
      
      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: token.sub,
          email: token.email,
          role: 'authenticated',
        };
        session.customAccessToken = jwt.sign(payload, signingSecret);
      }
      
      return session;
    },
  },
};

export default NextAuth(authOptions);

