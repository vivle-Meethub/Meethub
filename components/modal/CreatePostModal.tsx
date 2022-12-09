import useStore from "../../store";
import { useState, useRef} from "react";
import { Line } from "rc-progress";
import { v4 as uuid } from 'uuid';
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { TagsInput } from "react-tag-input-component";

const CreatePostModal = (props:any) =>{

const showCreatePostModal = useStore((state:any) => state.showCreatePostModal)
const closeCreatePostModal = useStore((state:any) => state.closeCreatePostModal)
const username = props.username;

const [photoURL, setPhotoURL] = useState('');
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [file,setFile] = useState<File>();
const [tagTitles, setTagtitles] = useState([]);
const [progress,setProgress] = useState(0);

let fileInput=useRef<HTMLInputElement>(null);


const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };


  const imageHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const file = (target.files as FileList)[0];
    setFile(file);
    uploadFiles(file);
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

    return(
                  <div
                  className={
                    showCreatePostModal
                      ? 'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 '
                      : 'hidden'
                  }>
                  <div className="dialog relative w-[90%] md:w-[35rem] lg:w-[45rem] h-[60%] md:h-[30rem] bg-white shadow-lg rounded-xl space-y-2 overflow-y-scroll">
                    <div className="sticky z-20 top-0 left-0 right-0 flex items-center justify-between bg-white shadow-sm py-4 px-6">
                      <h1 className="text-sm md:text-2xl font-semibold">글쓰기</h1>
                      <img src='/Img/x-mark.svg' alt="close"  onClick={closeCreatePostModal} className="cursor-pointer w-6 h-6" />
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
    )
}

export default CreatePostModal