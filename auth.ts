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
        console.log(token.session_token, "token session");
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.session_token = token.session_token as string;
        console.log(session, session.user.session_token, "session");
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      console.log(token, "tokenn");
      console.log(existingUser, "existing user");
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.session_token = existingUser.session_token;
      console.log(token, token.session_token, "token.sessin");
      return token;
    },
  },

  session: { strategy: "jwt" },
  ...authConfig,
});
