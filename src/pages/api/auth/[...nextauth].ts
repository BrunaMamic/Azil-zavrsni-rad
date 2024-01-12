import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import { compare } from "bcryptjs";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        if(credentials && (!credentials.username || !credentials.password)){
          return null
        }
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        const usr = await prisma.user.findFirst({
          where: {
            username: credentials?.username
          }
        })

        if(!usr){
          return null;
        }

        const isPasswordMatch = compare(credentials?.password || '', usr.password);
        if(!isPasswordMatch){
          return null
        }

        return {
          user: usr.username,
          role: usr.role
        }
      },
    }),

  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {      
      if (user) {
        token.username = user.user,
        token.user_type = user.role;
      }

      return token;
    },
    session: ({ session, token, user }: any) => {      
      if (token) {
        session.user.username = token.username;
        session.user.user_type = token.user_type;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  
  pages: {
    signIn: '/login'
  }
};
export default NextAuth(authOptions);
