import useStore from "../../store";


const MessageBoxModal = () => {

    const showMessageBoxModal = useStore((state:any) => state.showMessageBoxModal)
    const closeMessageBoxModal = useStore((state:any) => state.closeMessageBoxModal)

return(
    <>
        <section>
          {showMessageBoxModal ? (
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
                      
                      {/* <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={closeMessageBoxModal}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button> */}
                    </div>

                    {/*body*/}
                    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                      {/* <h2 className="mb-4 text-2xl font-semibold leading-tight">Invoices</h2> */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">

                          <tbody>
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
                        onClick={closeMessageBoxModal}
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
    </>
)

}

export default MessageBoxModal