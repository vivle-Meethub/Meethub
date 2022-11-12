import InfiniteScroll from "react-infinite-scroll-component";
import { useState,useEffect } from "react";

const Post = (prop:any) =>{

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

<div >
<div className="post-box flex flex-wrap">
{items.map((item :any)=>{
return <div className="post-item" key={item.id}>
      <div><img style={{width:'300px', height:'300px'}} src = {`https://source.unsplash.com/random/${item.id}`}/></div>
      <div>{item.id}</div>
      <div style={{width: '319px',whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{item.name}</div>
      <div>{item.email}</div>

</div>})}
</div>
</div>

</InfiniteScroll>      
    
  </section>
        </>
      )

}


export default Post