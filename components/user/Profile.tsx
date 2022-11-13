import { v4 as uuid } from 'uuid';
import { Line } from "rc-progress";
import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState,useRef } from "react";
import { createPopper } from "@popperjs/core";


const Profile = (props:any) =>{

    const [progress,setProgress] = useState(0);
    const [photoURL, setPhotoURL] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [dropdownPopoverShow, setDropdownPopoverShow] =useState(false);
    const btnDropdownRef:any = useRef();
    const popoverDropdownRef:any = useRef();

    let color = 'white'
    let bgColor;
    color === "white"
      ? (bgColor = "bg-slate-700")
      : (bgColor = "bg-" + color + "-500");

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

    const openDropdownPopover = () => {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start"
      });
      setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
      setDropdownPopoverShow(false);
    };

    const formHandler = (e:any) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
      }
      


    return(
        <>
 <section className="profile flex-col items-center justify-center relative">
    <div className="sticky top-16">
      
<div className="shadow-lg rounded-2xl w-80 p-4 bg-white dark:bg-gray-800 my-3">
    <div className="flex flex-row items-start gap-4">
        <img src={`https://github.com/${props.username}.png`} className="w-28 h-28 rounded-lg"/>
        <div className="h-28 w-full flex flex-col justify-between">
            <div>
                <p className="text-gray-800 dark:text-white text-xl font-medium">
                    {props.username}
                </p>
                <p className="text-gray-400 text-xs">
                    FullStack dev
                </p>
            </div>
            <div className="rounded-lg bg-blue-100 dark:bg-white p-2 w-full">
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-black">
                    <p className="flex flex-col">
                        posts
                        <span className="text-black dark:text-indigo-500 font-bold">
                            34
                        </span>
                    </p>
                    <p className="flex flex-col">
                        followers
                        <span className="text-black dark:text-indigo-500 font-bold">
                            455
                        </span>
                    </p>
                    <p className="flex flex-col">
                        following
                        <span className="text-black dark:text-indigo-500 font-bold">
                            9.3
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div className="flex items-center justify-between gap-4 mt-6">
        <button 
            type="button" 
            className="w-1/2 px-4 py-2 text-base border rounded-lg text-grey-500 bg-white hover:bg-gray-200 "
            onClick={() => setShowModal(true)}
        >
            message
        </button>
        <button type="button" className="w-1/2 px-4 py-2 text-base border rounded-lg text-white bg-[#b8e994] hover:bg-[#78e08f] ">
            follow
        </button>

    </div>

    <div className="flex space-x-2 my-4">
            <div  className="text-xs px-3 bg-gray-200 text-gray-800 rounded-full ">Badge</div>
            <div  className="text-xs px-3 bg-red-200 text-red-800 rounded-full">Badge</div>
            <div  className="text-xs px-3 bg-orange-200 text-orange-800 rounded-full">Badge</div>
            <div  className="text-xs px-3 bg-yellow-200 text-yellow-800 rounded-full">Badge</div>
        </div>


    {/* dropdown section */}

    <section>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            {/* <button
              className={
                "text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                bgColor
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {color === "white" ? "White Dropdown" : color + " Dropdown"}
            </button> */}

            {/* <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "12rem" }}
            >
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Action
              </a>
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Another action
              </a>
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Something else here
              </a>
              <div className="h-0 my-2 border border-solid border-t-0 border-slate-800 opacity-25" />
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-slate-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Seprated link
              </a>
            </div> */}
          </div>
        </div>
      </div>

    </section>

    {/* modal section */}
    <section>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    쪽지 보내기
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  안녕하세요. Meethub에서 개발자를 구하고 있습니다. <br/>
                  관심 있으시면 쪽지 주세요!
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    닫기
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    전송
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    </section>



</div>

    {/* <div className="font-bold text-xl px-5 py-5">{props.username}</div> */}

    <div>
    <a href={`https://github.com/${props.username}`}>
        <img
        src={`https://github-readme-stats.vercel.app/api?username=${props.username}&theme=vue&show_icons=true&line_height=40&count_private=true&hide=contribs`}
        alt={`${props.username}'s GitHub Stats`}
        />
    </a>
    </div>

    <div>
    <img
        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${props.username}&card_width=500`}
        alt={`${props.username}'s GitHub Stats`}
    />
    </div>


    {/* status drop down */}
    {/* className="absolute z-10 bg-white border mt-2 rounded w-max"  */}
    <div  
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            (color === "white" ? "bg-white " : bgColor + " ") +
            "absolute z-10 bg-white border mt-2 rounded w-max text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
          }
          style={{ minWidth: "12rem" }}
    >
        <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <div className="ml-2 mr-3 rounded-full w-3 h-3 bg-green-700"></div>
            <div  className="pl-1 pr-2 mr-10 text-gray-700 text-sm">
                Active
                <div className="text-xs text-gray-500">Based on activity</div>
            </div>
            <div className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
        </div>
        <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <div className="ml-2 mr-3 rounded-full w-3 h-3 bg-red-600"></div>
            <div className="pl-1 pr-2 mr-10 text-gray-700 text-sm">
                Do not Disturb
                <div className="text-xs text-gray-500">Mute notifications</div>
            </div>
        </div>
        <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <div className="ml-2 mr-3 rounded-full w-3 h-3 bg-yellow-500"></div>
            <div className="pl-1 pr-2 mr-10 text-gray-700 text-sm">
                Set as away
            </div>
        </div>
        <div className="py-2 border-t">
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer ">
              <div className="ml-2 mr-3">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
               </svg>
               </div>
               <div className="pl-1 pr-2 mr-10 text-gray-700 text-sm">
                Add a Status
               </div>
          </div>
        </div>
        <div className="py-2 border-t">
            <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer ">
                <div className="ml-2 mr-3"></div>
                 <div className="pl-1 pr-2 mr-10 text-gray-700 text-sm">
                  Chat Notification settings
                 </div>
            </div>
          </div>
    </div>

    {/* <form onSubmit={formHandler}>
    <input type="file" className="input"/>
    <button
    className="bg-[#b8e994] hover:bg-[#78e08f] text-white font-bold py-2 px-4 border-b-4
            border-[#78e08f] hover:border-[#b8e994] rounded"
    type="submit">Upload</button>
    </form>

    <hr />

    <h3>Upload {progress} %</h3>
    <Line percent={progress} strokeWidth={2} strokeColor="#b8e994" />

    {photoURL?.length > 0 && (
    <div>
    <img style={{width:"300px", height:"300px"}} src={photoURL} alt='업로드 이미지'/>
    </div>
    )} */}


<div className='mt-3'>
      <button  type="button"
       className="flex items-center justify-between rounded-full border p-1.5"
       ref={btnDropdownRef}
       onClick={() => {
         dropdownPopoverShow
           ? closeDropdownPopover()
           : openDropdownPopover();
       }}
       
       >
          <div className="ml-2 mr-1 rounded-full w-3 h-3 bg-green-700"></div>
          <div className="pl-1 pr-2 text-gray-700 text-sm">
          Active
          </div>
          <div className="mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
          </div>
      </button>
    </div>


    </div>




    </section>
        </>
    )
}

export default Profile