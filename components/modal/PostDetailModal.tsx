import PostDetail from "../user/PostDetail"
import useStore from "../../store"
import { useState } from "react";

const PostDetailModal = (props:any)=> {

    const showPostDetailModal = useStore((state:any) => state.showPostDetailModal)
    const closePostDetailModal = useStore((state:any) => state.closePostDetailModal)


    let [tempItem, setTempItem] = useState({});
    let [tempRegDate, setTempRegDate] = useState('');


        
        const closeAndResetPost = () => {
          closePostDetailModal();
          setTempItem({});
        //   setActiveDetailDialog(false);
        };


    return(
        <div
        className={
          showPostDetailModal
          ? 'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 '
          : 'hidden'
        }>
        <div className="dialog relative w-[90%] md:w-[35rem] lg:w-[45rem] h-[60%] md:h-[30rem] bg-white shadow-lg rounded-xl space-y-2 overflow-y-scroll">
          <div className="sticky z-20 top-0 left-0 right-0 flex items-center justify-between bg-white shadow-sm py-4 px-6">
            <h1 className="text-sm md:text-2xl font-semibold">Post</h1>
            <img src='/Img/x-mark.svg' alt="close"  onClick={closePostDetailModal} className="cursor-pointer w-6 h-6" />
          </div>
    
    
          <div className="py-2 px-6">
              <PostDetail item ={tempItem} username={props.username} regDate={tempRegDate}/>
              <div>
    
              <div className="mt-6">
        
        </div>
            <div className=" items-center px-5 py-12 lg:px-20"></div>
              
            </div>
      </div>
              </div>
              </div>
    )
}

export default PostDetailModal