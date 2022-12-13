import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/server/client";


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

      const {title,content,photoURL,username,tagTitles} = req.body.data;

    let tags = new Array(tagTitles.length)
    .fill(null)
    .map((value:any,index:number)=> ({'title':tagTitles[index]}))


      const post = await client?.post.create({
         data : {
            title:title,
            content:content,
            published : true,
            img:photoURL,
            tags:{
              createMany:{
                data: [
                  ...tags
                ],
              }
            },
            author : {
              connect : {
                name:username
              }
            }

         }
      })

      res.json(post);
      
    };


    if (req.method === "DELETE") {

      console.log(req.body.postId);

      await client.tag.deleteMany({
        where: { 
          postId : req.body.postId
         },
      });

      const post = await client.post.delete({
        where: { id: req.body.postId },
      });
      
      res.json(post);
    };

  

}