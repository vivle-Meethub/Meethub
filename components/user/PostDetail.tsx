import axios from 'axios';
import { useEffect } from 'react';
import {useSession } from 'next-auth/react';
import useStore from '../../store';

const PostDetail = (props:any) =>{

  const { data: session } = useSession();
  let rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });
  let today = new Date();

  const tags = useStore((state:any) => state.tags)
  const setTags = useStore((state:any) => state.setTags)
  
  const post = useStore((state:any) => state.post)
  const setPost = useStore((state:any) => state.setPost)

  const author = useStore((state:any) => state.author)
  const setAuthor = useStore((state:any) => state.setAuthor)

  const relativeTime = useStore((state:any) => state.relativeTime)
  const setRelativeTime = useStore((state:any) => state.setRelativeTime)


  useEffect(() => {

    const getPost = async() => {

      try {
        
        const response = await axios.get(`/api/post/${post.id}`,{
          method: 'get',
          timeout: 2000, 
        });
        console.log(response.data);
        await setPost(response.data);
        await setRelativeTime(response.data.createdAt)
        await setAuthor(response.data.author.name);
        await setTags(response.data.tags);
      } catch (error) {
        console.error(error);
      }
    };
  
    getPost();
  }, [post.id]);

  const deletePost = async()=>{
    
    if(!confirm("정말로 삭제 하시겠습니까?"))
      return;

    try {
        const response = await axios.delete(`/api/${author}`,{
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          data: {postId : post.id}
        });
        console.log(response);
        window.location.replace(`/${author}`);
      } catch (error) {
        console.error(error);
      } 
  }

    return(
        <>
<article className="px-2 py-12 mx-auto max-w-7xl" itemID="#" itemScope itemType="http://schema.org/BlogPosting">
  <div className="w-full  mb-10 text-left">
    <div className="pb-6 mb-6 border-b border-gray-200">
      <h1 className="mb-3 font-bold text-gray-900 md:leading-tight md:text-2xl" itemProp="headline" title="Rise of Tailwind - A Utility First CSS Framework">
          {post.title}
      </h1>



      <div className="flex-wrap mb-6">
          {tags.map((tag:any)=>(
            <div key={tag.id} className='inline-block'>
              <a href="#" className="text-[#78e08f] bg-gray-50 hover:bg-gray-100 text-xs px-3 rounded-full">{tag.title}</a>
            </div>
          ))}
      </div>

      <div className="flex justify-between">

        <div>
          <a className="text-sm hover:text-emerald-400" href={`/${author}`}>{author}</a>
          <span className="text-sm text-gray-400 mx-3">{rtf.format(
            Math.ceil( 
            ( (Date.parse(relativeTime.toString()) - today.getTime() )  / (1000 * 60 * 60 * 24) )
            )
            ,"days"
            )}
            </span>
        </div>

        {session?.user?.name === author &&
                  <div>
                  <button className="mx-3 text-gray-400 hover:text-black">수정</button>
                  <button onClick={deletePost} className="text-gray-400 hover:text-black">삭제</button>
              </div>
        }


      </div>
     
    </div>

    <div>
    <img src={post.img}/>
  </div>
          

  </div>

  <div>
    <p>{post.content}</p>

  </div>
</article>
        </>
    )
}


export default PostDetail