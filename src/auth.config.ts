import type { NextAuthConfig } from "next-auth";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Google,

    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize() {
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;