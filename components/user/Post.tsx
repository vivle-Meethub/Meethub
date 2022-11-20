import InfiniteScroll from "react-infinite-scroll-component";
import { useState,useEffect } from "react";

const Post = (props:any) =>{

    const [items,setItems] = useState<any>([]);
    const [hasMore,sethasMore] = useState(true);
    const [page,setPage] = useState(2);

    useEffect(() => {

        const getComments = async() => {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
          )
    
          const data = await res.json();
          setItems(data);
        }
    
        getComments();
      }, []);

    const fetchComments = async() => {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
        )
    
        const data = await res.json();
        return data;
      };


    const fetchData = async() => {
        const commentsFormServer = await fetchComments();
    
        setItems([...items, ...commentsFormServer]);
    
        if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
            sethasMore(false);
        }
        setPage(page + 1);
      };


        /* s3 업로드 테스트 */
  // const uploadFile = async (e:any) => {
  //   e.preventDefault();
  //   const s3:any = new ReactS3Client(s3Config);
  //   const file = fileInput.current.files[0];
  //   const newFileName = uuid();

  //   try {
  //     if(file) {
  //       console.log(file.type);
  //       if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
  //         alert('JPEG, PNG, JPG 파일만 업로드 가능합니다.');
  //         e.target.value = null;
  //       } else{

  //         if (file.size > 10 * 1024 * 1024) {
  //           alert('10mb 이하의 파일만 업로드 할 수 있습니다.');
  //           e.target.value = null;              
  //         } else {

  //           const res = await s3.uploadFile(file, newFileName);
  //           console.log(res);
        
  //           if (res.status === 204) {
  //             console.log("파일업로드 완료");
  //           } else {
  //             console.log("파일업로드 실패");
  //           }

  //         }
  //       }
  //     }

  // } catch (exception) {
  //     console.log(exception);
  // }

  // }


      return(
        <>
            <section className="post mt-10">
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
조회할 데이터가 없습니다.
</p>
}
>





<div>
<div className="post-box flex flex-wrap">
{items.map((item :any)=>{
return <div className="post-item overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto" key={item.id}>
<a href="#" className="w-full block h-full">
    <img alt="blog photo" src = {`https://source.unsplash.com/random/${item.id}`} className="max-h-40 w-full object-cover"/>
    <div className="bg-white dark:bg-gray-800 w-full p-4">
        <p className="text-indigo-500 text-md font-medium">
            Article
        </p>
        <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
            {item.id}
        </p>
        <p className="text-gray-400 dark:text-gray-300 font-light text-md">
            {item.name}
        </p>
        <div className="flex flex-wrap justify-starts items-center mt-4">
            <div className="text-xs mr-2 py-1.5 px-4 text-white bg-[#f1e05a] rounded-2xl">
                #JavaScript
            </div>
            <div className="text-xs mr-2 py-1.5 px-4 text-white bg-[#3178c6] rounded-2xl">
                #TypeScript
            </div>
        </div>
    </div>
</a>
</div>
})}
</div>
</div>

{/* <div>
<div className="post-box flex flex-wrap">
{items.map((item :any)=>{
return <div className="post-item" key={item.id}>
      <div><img style={{width:'300px', height:'300px'}} src = {`https://source.unsplash.com/random/${item.id}`}/></div>
      <div>{item.id}</div>
      <div style={{width: '319px',whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{item.name}</div>
      <div>{item.email}</div>

</div>})}
</div>
</div> */}

</InfiniteScroll>      
    
  </section>
        </>
      )

}


export default Post