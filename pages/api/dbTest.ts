// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/server/client";
import { ResponseType } from "../../lib/server/withHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  await client.user.create({
    data: {
      username: "junho",
      email: "junho@gmail.com",
      attendance: 0,
    },
  });

  res.status(200).json({ ok: true });
}
