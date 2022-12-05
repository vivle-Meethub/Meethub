import useStore from "../../store";

const CreatePost = (props:any) =>{

    const setShowCreatePostModal = useStore((state:any) => state.setShowCreatePostModal)

    return(
        
      <>
        <div onClick={()=>setShowCreatePostModal(true)}  className="post-create overflow-hidden shadow-lg rounded-lg h-80 w-60 md:w-80 cursor-pointer m-auto my-4 hover:-translate-y-2 duration-300">
        <div  className="w-full block h-full">

        <div className="bg-white dark:bg-gray-800 w-full p-4">

        <p className="text-white text-md font-medium">
          ㅤ
        </p>
        <p className="text-white dark:text-white text-xl font-medium mb-2">
          ㅤ   
        </p>
        <img
        
    alt="blog photo" 
    src='/Img/plus-circle.svg'
    onError={({ currentTarget }) => {
      currentTarget.onerror = null;
      currentTarget.src="Img/basic-img.png";
    }}
    className="max-h-40 w-full "/>


        <p className="text-white dark:text-gray-300 font-light text-md">
          ㅤ
        </p>

        <div className="flex flex-wrap justify-starts items-center mt-4"></div>
    </div>
</div>
</div>
</>

      
    )
}

export default CreatePost