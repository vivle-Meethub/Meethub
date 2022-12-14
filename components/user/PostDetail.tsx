import axios from 'axios';
import { useEffect } from 'react';
import {useSession } from 'next-auth/react';
import useStore from '../../store';

const PostDetail = (props:any) =>{

  const { data: session } = useSession();
  const tags = useStore((state:any) => state.tags)
  const setTags = useStore((state:any) => state.setTags)
  const post = useStore((state:any) => state.post)


  useEffect(() => {

    const getTags = async() => {

      try {
        
        const response = await axios.get(`/api/post/tag/${post.id}`,{
          method: 'get',
        });
        console.log(response.data);
        setTags(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    getTags();
  }, [post.id]);

  const deletePost = async()=>{
    
    if(!confirm("정말로 삭제 하시겠습니까?"))
      return;

    try {
        const response = await axios.delete(`/api/${props.username}`,{
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          data: {postId : post.id}
        });
        console.log(response);
        window.location.replace(`/${props.username}`);
      } catch (error) {
        console.error(error);
      } 
  }

    return(
        <>
<article className="px-2 py-12 mx-auto max-w-7xl" itemID="#" itemScope itemType="http://schema.org/BlogPosting">
  <div className="w-full mx-auto mb-10 text-left md:w-3/4">
    <div className="pb-6 mb-6 border-b border-gray-200">
      <h1 className="mb-3 font-bold text-gray-900 md:leading-tight md:text-2xl" itemProp="headline" title="Rise of Tailwind - A Utility First CSS Framework">
          {post.title}
      </h1>



      <div className="flex-wrap mb-6">
          {tags.map((tag:any)=>(
            <div className='inline-block'>
              <a key={tag.id} href="#" className="text-[#78e08f] bg-gray-50 hover:bg-gray-100 text-xs px-3 rounded-full">{tag.title}</a>
            </div>
          ))}
      </div>

      <div className="flex justify-between">

        <div>
          <a className="text-sm hover:text-emerald-400" href={`/${props.username}`}>{props.username}</a>
          <span className="text-sm text-gray-400 mx-3">{post.createdAt && post.createdAt.toString().slice(0,10)}</span>
        </div>

        {session?.user?.name === props.username &&
                  <div>
                  <button className="mx-3 text-gray-400 hover:text-black">수정</button>
                  <button onClick={deletePost} className="text-gray-400 hover:text-black">삭제</button>
              </div>
        }


      </div>
     
    </div>
        
    <img src={post.img}/>
  </div>

  <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2">
    <p>{post.content}</p>

  </div>
</article>
        </>
    )
}


export default PostDetail