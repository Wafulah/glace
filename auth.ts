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
        session.user.session_token = token.session_token as string;
        session.user.jwt_token = token.jwt_token as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(
        token.sub,
        token.session_token as string
      );

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.session_token = existingUser.session_token;
      token.jwt_token = existingUser.jwt_token;

      return token;
    },
  },

  session: { strategy: "jwt" },
  ...authConfig,
});
