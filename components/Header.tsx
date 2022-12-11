import { useState } from "react";
import { useRouter } from "next/router";
import useStore from "../store";
import { signIn,signOut, useSession } from 'next-auth/react';
import MessageBoxModal from "./modal/MessageBoxModal";

const Header = () => {


  const router = useRouter();
  const [searchUsername, setSearchUsername] = useState("");
  const { data: session } = useSession();

  const openMessageBoxModal = useStore((state:any) => state.openMessageBoxModal)

  const onCheckEnter = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/${searchUsername}`);
    }
  }


  let messageBox = (
    <div className="relative p-1 flex items-center justify-end  ml-5 sm:mr-0 sm:right-auto">
    <a href="#" className="block relative"
      onClick={openMessageBoxModal}
    >
      <img alt="message" src="/Img/envelope.svg" className="mx-auto object-contain rounded-full h-6 w-6"/>
    </a>
  </div>
);

let logout = (
  <div className="relative p-1 flex items-center justify-end mr-4 sm:mr-0 sm:right-auto">
    {session?
      (
      <button onClick={()=>signOut()} className="block relative">
        <img alt="logout" src="/Img/poweron.svg" className="mx-auto object-contain rounded-full h-6 w-6 hover"/>
      </button>
      ) :

      (
        <a href="/" className="block relative">
        <img alt="logout" src="/Img/power.svg" className="mx-auto ml-5 object-contain rounded-full h-6 w-6 hover"/>
      </a>
      )
    }

</div>
);

let name = (<div className="whitespace-nowrap text-xs ml-5"><a href={`/${session?.user?.name}`}>{session?.user?.name}</a></div>)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16  z-40">
        <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
          <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0 justify-center">

          
          {/* meet hub logo */}
          <div 
          className="meethub-logo-box mx-5">
                  <a href="/" className="block relative">
                    <img 
                     alt="meethub-logo" 
                     src="https://avatars.githubusercontent.com/u/65522153?v=4" 
                     className="mx-auto object-contain rounded-full h-16 w-16 " />
                  </a>
              </div>

              
            {/* search */}
            <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full justify-center">
              <div className="relative flex items-center justify-center w-full lg:w-64 h-full group">

                <form onKeyPress={onCheckEnter}>
                  <input
                    name="text"
                    onChange={(e) => setSearchUsername(e.target.value)}
                    type="text"
                    className=" block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#b8e994] ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400"
                    placeholder="Search"
                  />

                </form>
              </div>
            </div>

            {session?name:""}
            {session?messageBox:null}
            {logout}
              
          </div>

        </div>
        
      </header>
      <MessageBoxModal/>
    </>
  )
}

export default Header