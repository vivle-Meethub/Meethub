import axios from 'axios';
import { useState,useEffect } from "react";
import UserStatus from './UserStatus';
import { SkillTooltip } from './SkillTooltip';
import {useSession } from 'next-auth/react';
import { useRouter } from "next/router";

const Profile = (props:any) =>{

    const [showModal, setShowModal] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [myStatus, setMyStatus] = useState('online');
    const { data: session, status } = useSession();
   
    let color = 'white'
    let bgColor;
    color === "white"
      ? (bgColor = "bg-slate-700")
      : (bgColor = "bg-" + color + "-500");

    return(
        <>
 <section className="profile flex-col items-center justify-center relative">
    <div className="sticky top-16 max-sm:hidden">
      
<div className="shadow-lg rounded-2xl w-80 p-4 bg-white dark:bg-gray-800 my-3 mt-auto pb-[100%] pt-14">
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
                            {props.postCount}
                        </span>
                    </p>
                    <p className="flex flex-col">
                        followers
                        <span className="text-black dark:text-indigo-500 font-bold text-center">
                            0
                        </span>
                    </p>
                    <p className="flex flex-col">
                        following
                        <span className="text-black dark:text-indigo-500 font-bold text-center">
                            0
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>

    {session?.user?.name !== props.username &&
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
    }

    <div className="flex space-x-2 my-4">
            <SkillTooltip skill={'C/C++'} description={'C 언어에 객체지향 프로그래밍을 지원하기 위한 내용이 덧붙여진 것이라고 할 수도 있지만, 애초부터 객체지향을 염두에 두고 만들어진 언어와는 다르게, 단지 더 좋은 C 언어로서 수속형 언어로 취급하기도 한다. 초기의 C++은 C 위에 놓인 트랜스레이터로 구현되었다. 즉, C++ 프로그램을 일단 C 프로그램으로 변환하고 나서 C 컴파일러로 컴파일하는 식이었고 따라서 C 언어에 대해 상위 호환성을 갖는 언어였다.'}/>
            <SkillTooltip skill={'Java'} description={'자바는 썬 마이크로시스템즈의 제임스 고슬링과 다른 연구원들이 개발한 객체 지향적 프로그래밍 언어이다. 처음에는 가전제품 내에 탑재해 동작하는 프로그램을 위해 개발되었지만 현재 웹 애플리케이션 분야에 가장 많이 사용하는 언어 중 하나이고, 안드로이드를 비롯한 모바일 기기용 소프트웨어 개발에도 널리 사용되고 있다.'}/>
            <SkillTooltip skill={'JavaScript'} description={'자바스크립트(JavaScript)는 객체(object) 기반의 스크립트 언어입니다.HTML로는 웹의 내용을 작성하고, CSS로는 웹을 디자인하며, 자바스크립트로는 웹의 동작을 구현할 수 있습니다.자바스크립트는 주로 웹 브라우저에서 사용되나, Node.js와 같은 프레임워크를 사용하면 서버 측 프로그래밍에서도 사용할 수 있습니다.현재 컴퓨터나 스마트폰 등에 포함된 대부분의 웹 브라우저에는 자바스크립트 인터프리터가 내장되어 있습니다.'}/>
            <SkillTooltip skill={'Python'} description={'파이썬은 가독성이 높고 쉬운 문법 덕택에 다른 프로그래밍 언어보다 빠른 습득이 가능하다는 특징이 있습니다. 그 덕에 프로그래밍을 전공하지 않은 비전공자 중심으로 인기를 얻어 데이터 분석과 모델링을 다루는 통계학부터 딥러닝과 인공지능을 활용하는 의학에까지 다양한 분야에 두루 활용되고 있습니다.'}/>
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