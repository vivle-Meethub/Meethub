const PostDetail = (props:any) =>{

    return(
        <>
<article className="px-2 py-12 mx-auto max-w-7xl" itemID="#" itemScope itemType="http://schema.org/BlogPosting">
  <div className="w-full mx-auto mb-10 text-left md:w-3/4">
    <div className="pb-6 mb-6 border-b border-gray-200">
      <h1 className="mb-3 text-3xl font-bold text-gray-900 md:leading-tight md:text-4xl" itemProp="headline" title="Rise of Tailwind - A Utility First CSS Framework">
          {props.item.title}
      </h1>

      <div className="flex mb-6 space-x-2">
            <a href="#" className="text-[#78e08f] bg-gray-50 hover:bg-gray-100 text-xs px-3 rounded-full">MTVS</a>
            <a href="#" className="text-[#78e08f] bg-gray-50 hover:bg-gray-100 text-xs px-3 rounded-full">MeetHub</a>
            <a href="#" className="text-[#78e08f] bg-gray-50 hover:bg-gray-100 text-xs px-3 rounded-full">회고</a>
      </div>

      <div className="flex">
        <a className="text-sm" href={`/${props.username}`}>{props.username}</a>
        <div className="text-sm text-gray-400 mx-3">{props.regDate}</div>
      </div>
     
    </div>
        
    <img src={props.item.img}/>
  </div>

  <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2">
    <p>{props.item.content}</p>

  </div>
</article>
        </>
    )
}


export default PostDetail