import { NextApiRequest, NextApiResponse } from "next";
import {client} from "../../../lib/server/client"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (req.method === "GET") {

        const {postId} = req.query

      await client?.post.findUnique({
         where:{
            id: String(postId)
         },
         include:{
            author:true,
            tags:true,
         }          
      }).then(data=>res.json(data))
    };
}





