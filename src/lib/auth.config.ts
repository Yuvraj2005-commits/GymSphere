import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        console.log("Credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        console.log("User:", user);

        if (!user) {
          console.log("User not found");
          return null;
        }

        if (!user.password) {
          console.log("Password is null");
          return null;
        }

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        console.log("Password valid:", valid);

        if (!valid) {
          return null;
        }

        console.log("Login successful");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
