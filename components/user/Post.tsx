import InfiniteScroll from "react-infinite-scroll-component";
import { useState,useEffect,useRef } from "react";
import axios from 'axios';
import { useRouter,Router } from "next/router";
import { Line } from "rc-progress";
import { v4 as uuid } from 'uuid';
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import PostDetail from "./PostDetail";
import { signIn,signOut, useSession } from 'next-auth/react';
import { TagsInput } from "react-tag-input-component";

const Post = (props:any) =>{

  const router = useRouter();
  const { username }: any = router.query;
  const { data: session, status } = useSession();

    const [items,setItems] = useState<any>([]);
    const [hasMore,sethasMore] = useState(true);
    const [progress,setProgress] = useState(0);
    
const [photoURL, setPhotoURL] = useState('');
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [file,setFile] = useState<File>();

let fileInput=useRef<HTMLInputElement>(null);


const [activeDialog, setActiveDialog] = useState(false);
const [activeDetailDialog, setActiveDetailDialog] = useState(false);
let [tempItem, setTempItem] = useState({});
let [tempRegDate, setTempRegDate] = useState('');

const [tagTitles, setTagtitles] = useState([]);

const dialog = () => {
 
setActiveDialog(true);
};

const CloseDialog = () => {
setActiveDialog(false);
};

const detailDialog = (index:number) => {
  setTempItem(items[index]);
  setTempRegDate(items[index].createdAt.toString().slice(0,10))
  setActiveDetailDialog(true);
  };
  
  const CloseDetailDialog = () => {
    setTempItem({});
    setActiveDetailDialog(false);
  };

const resetState = async() => {
  setActiveDialog(false);
  setTitle('');
  setContent('');
  setPhotoURL('');
  setFile(undefined);
}


const uploadFiles = (file:any) => {

  if(!file) return;

  const newFileName = uuid();
  const storageRef = ref(storage,`post-images/${newFileName}`);
  const uploadTask = uploadBytesResumable(storageRef,file);

  uploadTask.on("state_changed", (snapshot) =>{
    const prog = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );

    setProgress(prog);
  },(err)=>console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url)=>setPhotoURL(url));
    }
  );

};


const imageHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  const target = event.currentTarget;
  const file = (target.files as FileList)[0];
  setFile(file);
  uploadFiles(file);
}

    const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };

    const contentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    };


    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();

      try {
  
        const formData = { title, content,photoURL, username, tagTitles};

        console.log(formData);
              
        const response = await axios.post(`/api/${username}`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: formData,
        });
        console.log(response);
        window.location.replace(`/${username}`);
        // await resetState();
        // await Router.push(`/${props.username}`);
      } catch (error) {
        console.error(error);
      }
  
    }

    useEffect(() => {

        const getPosts = async() => {

          try {
            
            const response = await axios.get(`/api/${username}`,{
              method: 'get',
              timeout: 2000, 
            });
            console.log(response.data);
            setItems(response.data);
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
        {items.length < 1 ? 

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
            onClick={dialog}
            >
              게시물 작성하기
          </div>
        }
        </div>
    </div>
      </div>     
      </article>

        : <InfiniteScroll
          dataLength={items.length}
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
  
  
<div className="post-box flex flex-wrap">

  {/* create post  */}
  {session?.user?.name === username &&
<div onClick={dialog}  className="post-create overflow-hidden shadow-lg rounded-lg h-80 w-60 md:w-80 cursor-pointer m-auto my-4 hover:-translate-y-2 duration-300">
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
}

{/* create post end  */}

{items && items.map((item :any, index:number)=>{
  return <div 
  className="post-item overflow-hidden shadow-lg rounded-lg h-80 w-60 md:w-80 cursor-pointer
  m-auto my-4 hover:-translate-y-2 duration-300" 
  key={item.id}
  onClick = {()=>detailDialog(index)}
  >
<div  className="w-full block h-full">
    <img 
    alt="blog photo" 
    src={item.img}
    onError={({ currentTarget }) => {
      currentTarget.onerror = null;
      currentTarget.src="Img/basic-img.png";
    }}
    className="max-h-40 w-full object-cover"/>
    <div className="bg-white dark:bg-gray-800 w-full p-4">

        <p className="text-gray-800 dark:text-white text-base font-bold mb-2 truncate ...">
            {item.title}
        </p>
        <p className="text-[#495057] dark:text-gray-300 text-sm whitespace-normal text-ellipsis overflow-hidden leading-normal h-[4.5em]">
            {item.content}
        </p>

        <p className="text-[#868E96] text-xs mt-3">
          {item.createdAt.toString().slice(0,10)}
        </p>

        

    </div>
      
</div>
</div>
  })}
</div>
</div>


</InfiniteScroll>
}  
  </section>

    {/* detail dialog section */}  
    <div
    className={
      activeDetailDialog
      ? 'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 '
      : 'hidden'
    }>
    <div className="dialog relative w-[90%] md:w-[35rem] lg:w-[45rem] h-[60%] md:h-[30rem] bg-white shadow-lg rounded-xl space-y-2 overflow-y-scroll">
      <div className="sticky z-20 top-0 left-0 right-0 flex items-center justify-between bg-white shadow-sm py-4 px-6">
        <h1 className="text-sm md:text-2xl font-semibold">Post</h1>
        <img src='/Img/x-mark.svg' alt="close"  onClick={CloseDetailDialog} className="cursor-pointer w-6 h-6" />
      </div>


      <div className="py-2 px-6">
          <PostDetail item ={tempItem} username={username} regDate={tempRegDate}/>
          <div>

          <div className="mt-6">
    
    </div>
        <div className=" items-center px-5 py-12 lg:px-20"></div>
          
        </div>
  </div>
          </div>
          </div>
  {/* detail dialog section end */} 


  
          {/* dialog section */}
            <div
    className={
      activeDialog
        ? 'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 '
        : 'hidden'
    }>
    <div className="dialog relative w-[90%] md:w-[35rem] lg:w-[45rem] h-[60%] md:h-[30rem] bg-white shadow-lg rounded-xl space-y-2 overflow-y-scroll">
      <div className="sticky z-20 top-0 left-0 right-0 flex items-center justify-between bg-white shadow-sm py-4 px-6">
        <h1 className="text-sm md:text-2xl font-semibold">글쓰기</h1>
        <img src='/Img/x-mark.svg' alt="close"  onClick={CloseDialog} className="cursor-pointer w-6 h-6" />
      </div>
      <div className="py-2 px-6">
        <div>
                            <div>
                                <div className="mt-1">
                                    <input 
                                    id="title" 
                                    name="title" 
                                    type="text"
                                    value={title}
                                    required 
                                    placeholder="제목" 
                                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out 
                                    transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 
                                    focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                    onChange ={titleHandler} 
                                    />
                                    
                                </div>
                            </div>

                       

          <div className="mt-6">
                    <form  className="space-y-6">

                        <div>
                            <textarea 
                            className="block h-48 w-full px-5 py-3 mt-2 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out 
                            transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300
                            apearance-none autoexpand" 
                            value={content}
                            id="content" 
                            name="content"
                            onChange ={contentHandler}
                            >
                            </textarea>
                        </div>


                        <div>
                        <TagsInput
                          value={tagTitles}
                          onChange={setTagtitles}
                          name="tag"
                          placeHolder="tag"
                        />
                        
                      </div>

            
              <div>
                <input 
                  type="file" 
                  className="post-image"
                  accept="image/*"
                  onChange={imageHandler}
                  ref={fileInput}
                  
                  />
                {/* <button
                className="bg-[#b8e994] hover:bg-[#78e08f] text-white font-bold py-2 px-4 border-b-4
                          border-[#78e08f] hover:border-[#b8e994] rounded"
                >
                  Upload
                </button> */}
              </div>

            <hr />

            {/* <h3>Upload {progress} %</h3> */}
            <Line percent={progress} strokeWidth={2} strokeColor="#b8e994" />

            {photoURL?.length > 0 && (
              <div>
                <img className="w-28 h-28" src={photoURL} alt='업로드 이미지'/>
              </div>
            )}

        <div>
            <button onClick={submitData} className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-[#b8e994] hover:bg-[#78e08f] focus:outline-none">업로드</button>
        </div>
      </form>   
    </div>

              
        <div className=" items-center px-5 py-12 lg:px-20"></div>

        </div>
  </div>
          </div>
          </div>
      {/* dialog section end */}
        </>
      )

}


export default Post