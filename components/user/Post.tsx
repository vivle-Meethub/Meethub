import InfiniteScroll from "react-infinite-scroll-component";
import { useState,useEffect,useRef } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

import { useSession } from 'next-auth/react';

import CreatePost from "./CreatePost";
import CreatePostModal from "../modal/CreatePostModal";
import useStore from "../../store";
import PostDetailModal from "../modal/PostDetailModal";

const Post = (props:any) =>{

  const router = useRouter();
  const { username }: any = router.query;
  const { data: session } = useSession();

    // const [items,setItems] = useState<any>([]);
    const [hasMore,sethasMore] = useState(true);

    
    const posts = useStore((state:any) => state.posts)
    const setPosts = useStore((state:any) => state.setPosts)
    const setPost = useStore((state:any) => state.setPost)


const openCreatePostModal = useStore((state:any) => state.openCreatePostModal)
const openPostDetailModal = useStore((state:any) => state.openPostDetailModal)

const setPostAndOpenModal = (index:number) => {
  openPostDetailModal();
    setPost(posts[index]);
  };

    useEffect(() => {

        const getPosts = async() => {

          try {
            
            const response = await axios.get(`/api/${props.username}`,{
              method: 'get',
            });
            console.log(response.data);
            setPosts(response.data);
          } catch (error) {
            console.error(error);
          }
        };
      
        getPosts();
      }, [username]);

    // const fetchComments = async() => {
    //     const res = await fetch(
    //       `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    //     )
    
    //     const data = await res.json();
    //     return data;
    //   };


    const fetchData = async() => {
        // const commentsFormServer = await fetchComments();
    
        // setItems([...items, ...commentsFormServer]);
    
        // if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
        //     sethasMore(false);
        // }
        // setPage(page + 1);
      };


      return(
        <>
      <section className="post mt-10">
        {posts.length < 1 ? 

      <article className="post-empty">

      <div>

        <div className="flex justify-center">
          <span className="mt-24">작성한 포스트가 없습니다.</span>  <br/>
        </div>

        <div className="h-56 w-full rounded-lg flex cursor-context-menu">
        <div className="m-auto text-gray-200 select-none">

          
        {session?.user?.name === username &&
          <div 
            className="px-6 py-3 bg-[#78e08f] text-white font-bold text-sm rounded-lg hover:scale-110 active:scale-90 transition-transform ease-in-out duration-200"
            onClick={openCreatePostModal}
            >
              게시물 작성하기
          </div>
        }
        </div>
    </div>
      </div>     
      </article>

        : <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4></h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
          조회할 데이터가 없습니다.
        </p>
        }
        >
        
<div>


<div className="flex flex-wrap post-box">
    {session?.user?.name === username &&
      <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-4">
        <CreatePost username={username}/>
      </div>
    }


{posts && posts.map((post :any, index:number)=>{
  return <div 
            key={post.id}
            className="w-full sm:w-1/2 md:w-1/3 mb-4 px-4"
          >
              <div 
            className="post-item overflow-hidden shadow-lg rounded-lg h-80 cursor-pointer
            m-auto my-4 hover:-translate-y-2 duration-300" 
            onClick = {()=>setPostAndOpenModal(index)}
            >
<div className="w-full block h-full">
    <img 
    alt="blog photo" 
    src={post.img}
    onError={({ currentTarget }) => {
      currentTarget.onerror = null;
      currentTarget.src="Img/basic-img.png";
    }}
    className="h-40 w-full object-cover"/>
    <div className="bg-white dark:bg-gray-800 w-full p-4">

        <p className="text-gray-800 dark:text-white text-base font-bold mb-2 truncate ...">
            {post.title}
        </p>
        <p className="text-[#495057] dark:text-gray-300 text-sm whitespace-normal text-ellipsis overflow-hidden leading-normal h-[4.5em]">
            {post.content}
        </p>

        <p className="text-[#868E96] text-xs mt-3">
          {post.createdAt.toString().slice(0,10)}
        </p>


    </div>

   
      
</div>
</div>

  </div>
  
  })}

</div>

</div>


</InfiniteScroll>
}  
  </section>


      <PostDetailModal username={username}/>  
      <CreatePostModal username={username}/>

        </>
      )

}


export default Post