import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
        user_type: number

    } & DefaultSession["user"];
  }
}
