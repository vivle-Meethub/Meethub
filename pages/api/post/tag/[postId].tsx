import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../lib/server/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (req.method === "GET") {

        const {postId} = req.query

        await client.tag.findMany({
            where: {
                postId:String(postId),
              
            },
          }).then(data=>res.json(data))
    };


}