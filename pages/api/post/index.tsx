import { NextApiRequest, NextApiResponse } from "next";
import {client} from "../../../lib/server/client"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (req.method === "GET") {

      await client?.post.findMany({
        orderBy: {
          createdAt:"desc"
        },
        include : {
          author:true,
          tags:true,
        }

          
      }).then(data=>res.json(data))
    };
}





