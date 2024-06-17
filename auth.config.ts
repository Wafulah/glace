import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

interface SessionToken {
  session_token: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface ApiResponse {
  authUrl: string;
  session_token: SessionToken;
  user_info: UserInfo;
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        name: { label: "Name", type: "text" },
        id: { label: "Id", type: "text" },
      },
      async authorize(credentials) {
        const { id, email, name } = credentials;
        console.log("email", credentials);
        const user = await getUserByEmail(email as string);
        if (!user.id) return null;

        if (user.id === id && user.name === name) return user;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
