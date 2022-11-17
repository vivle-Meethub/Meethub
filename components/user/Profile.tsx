import { v4 as uuid } from 'uuid';
import { Line } from "rc-progress";
import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState,useRef } from "react";
import { createPopper } from "@popperjs/core";
import UserStatus from './UserStatus';
import { SkillTooltip } from './SkillTooltip';


const Profile = (props:any) =>{

    const [progress,setProgress] = useState(0);
    const [photoURL, setPhotoURL] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [dropdownPopoverShow, setDropdownPopoverShow] =useState(false);
    const btnDropdownRef:any = useRef();
    const popoverDropdownRef:any = useRef();
    const [dropdown, setDropdown] = useState(false);

    const [myStatus, setMyStatus] = useState('online');
   

    // const userStatusUI = {
    //   "online": 
    //   <small className='flex items-center justify-center cursor-pointer'>
    //     <span className='text-xs'>Online</span>
    //     <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-green-700"></span>
    //   </small>
    //   ,
    //   "idle": 
    //   <small className='flex items-center justify-center cursor-pointer'>
    //     <span className='text-xs'>Online</span>
    //     <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-red-700"></span>
    //   </small>
    //   ,
    //   "doNotDisturb": 
    //   <small className='flex items-center justify-center cursor-pointer'>
    //     <span className='text-xs'>Online</span>
    //     <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-yellow-700"></span>
    //   </small>
    // };

    

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
            <SkillTooltip/>
            <SkillTooltip/>
            <SkillTooltip/>
            <SkillTooltip/>
        </div>

        {/* dropdown section */}
        <div>
      <div onClick={() => setDropdown(!dropdown)} className="p-3 bg-white dark:bg-darkSecondary shadow-lg rounded-xl flex items-center justify-center w-44 cursor-pointer">
        <UserStatus status = {myStatus}/>
      </div>
      <ul
        className={
          dropdown
            ? 'flex my-1 items-center space-x-2 p-2 rounded-xl bg-white dark:bg-darkSecondary shadow-2xl w-fit'
            : 'invisible inline-flex my-1 items-center space-x-2 p-2 rounded-xl bg-white dark:bg-darkSecondary shadow-2xl w-fit'
        }>
          <li onClick={()=>{
            setMyStatus('online')
            setDropdown(false)
          }}>
            <UserStatus status='online'/>
          </li>

          <li onClick={()=>{
            setMyStatus('idle')
            setDropdown(false)
          }}>
            <UserStatus status='idle'/>
          </li>

          <li onClick={()=>{
            setMyStatus('doNotDisturb')
            setDropdown(false)
          }}>
            <UserStatus status='doNotDisturb'/>
          </li>
        
      </ul>
    </div>


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


    </div>
    </section>
        </>
    )
}

export default Profile