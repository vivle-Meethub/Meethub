import { useState } from "react";
import UserStatus from './UserStatus';
import { SkillTooltip } from './SkillTooltip';


const Profile = (props:any) =>{

    const [showModal, setShowModal] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [myStatus, setMyStatus] = useState('online');
   
    let color = 'white'
    let bgColor;
    color === "white"
      ? (bgColor = "bg-slate-700")
      : (bgColor = "bg-" + color + "-500");

    return(
        <>
 <section className="profile flex-col items-center justify-center relative">
    <div className="sticky top-16">
      
<div className="shadow-lg rounded-2xl w-80 p-4 bg-white dark:bg-gray-800 my-3">
    <div className="flex flex-row items-start gap-4">
        <img src={`https://github.com/${props.username}.png`} 
        className="w-28 h-28 rounded-lg"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src="Img/user.svg";
        }}
        />
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
                        <span className="text-black dark:text-indigo-500 font-bold text-center">
                            34
                        </span>
                    </p>
                    <p className="flex flex-col">
                        followers
                        <span className="text-black dark:text-indigo-500 font-bold text-center">
                            455
                        </span>
                    </p>
                    <p className="flex flex-col">
                        following
                        <span className="text-black dark:text-indigo-500 font-bold text-center">
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
                <textarea 
                            className="block h-36 w-full px-5 py-3 mt-2 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out 
                            transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300
                            apearance-none autoexpand" 
                            id="content" 
                            name="content"
                            >
                            </textarea>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 border-gray-100 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    닫기
                  </button>
                  <button
                    className="bg-[#78e08f] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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


    </div>
    </section>
        </>
    )
}

export default Profile