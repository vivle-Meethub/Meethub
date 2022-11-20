import { useState } from "react";
import { useRouter } from "next/router";
import { signIn,signOut, useSession } from 'next-auth/react';

const Header = () => {

  const [showMessageModal, setShowMessageModal] = useState(false);

  const router = useRouter();
  const [username, setUsername] = useState("");
  const { data: session, status } = useSession();

  const onCheckEnter = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/${username}`);
    }
  }


  let messageBox = (
                <div className="relative p-1 flex items-center justify-end  ml-5 mr-4 sm:mr-0 sm:right-auto">
                <a href="#" className="block relative"
                  onClick={() => setShowMessageModal(true)}
                >
                  <img alt="message" src="/img/envelope.svg" className="mx-auto object-cover rounded-full h-6 w-6 " />
                </a>
              </div>
  );

  let logout = (
              <div className="relative p-1 flex items-center justify-end  ml-5 mr-4 sm:mr-0 sm:right-auto">
                {session?
                  (
                  <button onClick={()=>signOut()} className="block relative">
                    <img alt="logout" src="/img/poweron.svg" className="mx-auto object-cover rounded-full h-6 w-6 hover"/>
                  </button>
                  ) :

                  (
                    <a href="/" className="block relative">
                    <img alt="logout" src="/img/power.svg" className="mx-auto object-cover rounded-full h-6 w-6 hover"/>
                  </a>
                  )
                }

            </div>
  );

  let name = (<div className="text-">{session?.user?.name}</div>)


  // if (session) {
  //   left = (
  //     <div className="left">

  //     </div>
  //   );
  // }


  // if (!session) {
  //   left = (
  //     <div className="left">

  //     </div>
  //   );
  // }


  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16  z-40">
        <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
          <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0 justify-center">

          {/* meet hub logo */}
          <div className="meethub-logo-box mx-5">
                  <a href="/" className="block relative">
                    <img alt="meethub-logo" src="https://avatars.githubusercontent.com/u/65522153?v=4" className="mx-auto object-cover rounded-full h-16 w-16 " />
                  </a>
              </div>

              
            {/* search */}
            <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full justify-center">
              <div className="relative flex items-center justify-center w-full lg:w-64 h-full group">
                <div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                  
                  
                  {/* <svg fill="none" className="relative w-5 h-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                  </svg> */}
                </div>

                {/* <svg className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                  </path>
                </svg> */}

                <form onKeyPress={onCheckEnter}>
                  <input
                    name="text"
                    onChange={(e) => setUsername(e.target.value)}
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

        {/* Message Modal section */}
        <section>
          {showMessageModal ? (
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
                        쪽지함
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowMessageModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>

                    {/*body*/}
                    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                      {/* <h2 className="mb-4 text-2xl font-semibold leading-tight">Invoices</h2> */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">

                          <tbody>
                            <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                              <td className="p-3">
                                <p>DaeyeonKim97</p>
                              </td>
                              <td className="p-3">
                                <p>코딩 과외하고 있습니다.</p>
                              </td>
                              <td className="p-3">
                                <p>14 Jan 2022</p>
                                <p className="dark:text-gray-400">Friday</p>
                              </td>
                              <td className="p-3">

                                <p className="dark:text-gray-400 flex justify-center items-center">
                                  <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-yellow-500 block"></span>
                                  <span>Idle</span>
                                </p>
                              </td>

                              <td className="p-3 text-right">
                                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                                  <a href="#" className="block relative"
                                  >
                                    <img alt="profil" src="/img/paper-airplane.svg" className="mx-auto object-cover rounded-full h-6 w-6 " />
                                  </a>
                                </span>
                              </td>
                            </tr>
                            <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                              <td className="p-3">
                                <p>DwarfThema</p>
                              </td>
                              <td className="p-3">
                                <p>마 니 내랑 사업 하나 하자</p>
                              </td>
                              <td className="p-3">
                                <p>13 Jan 2022</p>
                                <p className="dark:text-gray-400">thursday</p>
                              </td>
                              <td className="p-3">
                                <p className="dark:text-gray-400 flex justify-center items-center">
                                  <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-red-600 block"></span>
                                  <span>Do not Disturb</span>
                                </p>
                              </td>

                              <td className="p-3 text-right">
                                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                                  <a href="#" className="block relative"
                                  >
                                    <img alt="profil" src="/img/paper-airplane.svg" className="mx-auto object-cover rounded-full h-6 w-6 " />
                                  </a>
                                </span>
                              </td>
                            </tr>
                            <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                              <td className="p-3">
                                <p>pjhhs021</p>
                              </td>
                              <td className="p-3">
                                <p>언제 한 번 고기 먹으러 가시죠</p>
                              </td>
                              <td className="p-3">
                                <p>12 Jan 2022</p>
                                <p className="dark:text-gray-400">Wednesday</p>
                              </td>
                              <td className="p-3">

                                <p className="dark:text-gray-400 flex justify-center items-center">
                                  <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-red-600 block"></span>
                                  <span>Do not Disturb</span>
                                </p>
                              </td>

                              <td className="p-3 text-right">
                                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                                  <a href="#" className="block relative"
                                  >
                                    <img alt="profil" src="/img/paper-airplane.svg" className="mx-auto object-cover rounded-full h-6 w-6 " />
                                  </a>
                                </span>
                              </td>
                            </tr>
                            <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                              <td className="p-3">
                                <p>admin</p>
                              </td>
                              <td className="p-3">
                                <p>meethub에 오신 것을 환영합니다!</p>
                              </td>
                              <td className="p-3">
                                <p>11 Jan 2022</p>
                                <p className="dark:text-gray-400">Tuesday</p>
                              </td>
                              <td>

                                <p className="dark:text-gray-400 flex justify-center items-center">
                                  <span className="ml-2 mr-3 rounded-full w-3 h-3 bg-green-700 block"></span>
                                  <span>Online</span>

                                </p>

                              </td>
                              <td className="p-3 text-right">
                                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                                  <a href="#" className="block relative"
                                  >
                                    <img alt="profil" src="/img/paper-airplane.svg" className="mx-auto object-cover rounded-full h-6 w-6 " />
                                  </a>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowMessageModal(false)}
                      >
                        닫기
                      </button>

                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

        </section>
      </header>

    </>
  )
}

export default Header