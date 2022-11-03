import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const clinet = global.client || new PrismaClient(/* { log: ["query"] } */);
//{ log: ["query"] } 를 활용하면 백엔드 로그에서 얼마나 많은 쿼리를 받고있는지 확인 할 수 있음

if (process.env.NODE_ENV === "development") global.client = clinet;

export default clinet;
