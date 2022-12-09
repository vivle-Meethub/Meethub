import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../../lib/server/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (req.method === "GET") {

        const {username} = req.query

        await client.post.count({
            where: {
              author:{
                name:String(username)
              }
            },
          }).then(data=>res.json(data))
    };


}





