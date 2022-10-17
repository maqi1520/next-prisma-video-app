import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { sendVerificationRequest } from "@/lib/sendVerificationRequest";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  //debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "密码登录",
      credentials: {
        email: {
          label: "邮箱",
          type: "text",
          placeholder: "请输入邮箱",
        },
        password: {
          label: "密码",
          type: "password",
          placeholder: "请输入密码",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        // TODO
        // const maybeUser= await prisma.user.findFirst({where:{
        //   email: credentials.email,
        //  }})

        const user = {
          id: "cl95b4ny10000fjnuhm7rvys5",
          name: "xiaoma",
          image: "https://avatars.githubusercontent.com/u/9312044?v=4",
          email: "164377467@qq.com",
        };

        if (user) {
          // 返回的对象将保存才JWT 的用户属性中
          return user;
        } else {
          // 如果返回null，则会显示一个错误，建议用户检查其详细信息。
          return null;
          // 跳转到错误页面，并且携带错误信息 http://localhost:3000/api/auth/error?error=用户名或密码错误
          //throw new Error("用户名或密码错误");
        }
      },
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 50000,
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "test",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      if (session?.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
