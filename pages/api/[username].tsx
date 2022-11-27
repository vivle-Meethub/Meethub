import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/server/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (req.method === "GET") {
      const {username} = req.query


      await client?.post.findMany({
        where : {
          author: {
            name :String(username)
          }
        },
        orderBy: {
          createdAt:"desc"
        }

          
      }).then(data=>res.json(data))
    };

    if (req.method === "POST") {

      const {title,content,photoURL,username} = req.body.data;

      await client?.post.create({
         data : {
            title:title,
            content:content,
            published : true,
            img:photoURL,
            author : {
              connect : {
                name:username
              }
            }


         }
      })

      res.end();
      
    };

  

}