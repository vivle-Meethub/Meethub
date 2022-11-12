import { useState } from "react";
import { useRouter } from "next/router";

const Header = ()=>{

    const router = useRouter();
    const [username, setUsername] = useState("");
    
    const onCheckEnter = (e:any) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            router.push(`/${username}`);
        }
      }
    
    
    return(
        <>
<header className="fixed top-0 left-0 right-0 w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16  z-40">
    <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
            <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
                <div className="relative flex items-center w-full lg:w-64 h-full group">
                    <div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                        <svg fill="none" className="relative w-5 h-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                            </path>
                        </svg>
                    </div>
                    <svg className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                        </path>
                    </svg>

                    <form onKeyPress={onCheckEnter}>
                        <input 
                        name="text" 
                        onChange={(e) => setUsername(e.target.value)}
                        type="text" 
                        className=" block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#b8e994] ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400" 
                        placeholder="Search"
                        />    

                    </form>

                    <form>
                           

                    </form>

            
                    </div>
                </div>
                <div className="relative p-1 flex items-center justify-end  ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <a href="#" className="block relative">
                        <img alt="profil" src="/img/paper-airplane.svg" className="mx-auto object-cover rounded-full h-6 w-6 "/>
                    </a>
                </div>

                <div className="relative p-1 flex items-center justify-end  ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <a href="#" className="block relative">
                        <img alt="profil" src="/img/power.svg" className="mx-auto object-cover rounded-full h-6 w-6 "/>
                    </a>
                </div>
            </div>
        </div>
    </header>

        </>
    )
}

export default Header