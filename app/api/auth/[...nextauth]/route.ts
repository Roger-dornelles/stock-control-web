import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import type { DefaultSession } from "next-auth";

import apiClient from "@/lib/apiClient";

declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "sub", type: "text" },
      },
      async authorize() {
        const user = await apiClient(`/auth/profile`);

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" as const, maxAge: 24 * 60 * 60 },
  jwt: { maxAge: 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string | number;
        session.user.name = token.name as string;
        session.user.role = token.role;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
