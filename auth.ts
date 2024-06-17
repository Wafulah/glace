import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user }) {
      
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },

  session: { strategy: "jwt" },
  ...authConfig,
});
