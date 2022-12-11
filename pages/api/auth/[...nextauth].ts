import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter/dist/index'
import GitHubProvider from 'next-auth/providers/github';
import NaverProvider from "next-auth/providers/naver";
import { prisma } from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;


const options = {  
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),

      NaverProvider(
        { clientId: process.env.NAVER_CLIENT_ID!,
          clientSecret: process.env.NAVER_CLIENT_SECRET!
        }),   
  ],

  adapter: PrismaAdapter(prisma!),
  secret: process.env.SECRET,
};