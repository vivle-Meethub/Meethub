import { SkillTooltip } from './SkillTooltip';
import { useSession } from 'next-auth/react';
import StateDropdown from "./StateDropdown";
import MessageModal from "../modal/MessageModal";
import useStore from "../../store";

const Profile = (props:any) =>{

  const openMessageModal = useStore((state:any) => state.openMessageModal)
  
    const { data: session } = useSession();
   
    let color = 'white'
    let bgColor;
    color === "white"
      ? (bgColor = "bg-slate-700")
      : (bgColor = "bg-" + color + "-500");

    return(
        <>
 <section className="profile flex-col items-center justify-center relative">
    <div className="sticky top-16 max-sm:hidden bg-[#F9FAFA]">
      
<div className="shadow-lg rounded-2xl w-80 p-4 bgs-white dark:bg-gray-800 my-3 mt-auto pb-[100%] pt-14">
    <div className="flex flex-row items-start gap-4">

        

        

    </div>


    <div className="w-full flex flex-col justify-center items-center">

    
    <div className='profile-image-container'>
    <img src={`https://github.com/${props.username}.png`} 
        className="w-40 h-40 rounded-lg"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src="Img/user.png";
        }}
        />
    </div>


    <div className='profile-name mt-2'>
        <p className="text-gray-800 dark:text-white text-xl font-medium text-center">
            {props.username}
        </p>
        <p className="text-gray-400 text-xs text-center">
            FullStack dev
        </p>
        </div>

        <div className='flex justify-center items-center'>
        {/* <StateDropdown/> */}
        </div>
    </div>

    <div className="p-3 bg-white dark:bg-darkSecondary shadow-lg  flex items-center justify-center w-72 h-14 mt-5">
        <div className="text-xs mx-2">posts <span className='text-[#6AB04C]'>{props.postCount}</span></div>
        <div className="text-xs mx-2">followers <span className='text-[#6AB04C]'>0</span></div>
        <div className="text-xs mx-2">following <span className='text-[#6AB04C]'>0</span></div>
    </div>

    {session?.user?.name !== props.username &&
      <div className="flex items-center justify-between gap-4 mt-6">

      <div
          className="flex w-1/2 px-4 py-2 text-base border rounded-lg text-grey-500 bg-white hover:bg-gray-200 cursor-pointer"
          onClick={openMessageModal}
      >

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
          
          <span className='px-3'>
          message
        </span>
          
      </div>

      <div className="flex w-1/2 px-4 py-2 text-base border rounded-lg text-white bg-[#b8e994] hover:bg-[#78e08f] cursor-pointer">
          
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>

        <span className='px-3'>
        follow
        </span>
      </div>

      </div>
    }


    <div className='text-sm mt-5'>기술스택</div>

    <div className="flex space-x-2 my-4">
            <SkillTooltip skill={'C/C++'} description={'C 언어에 객체지향 프로그래밍을 지원하기 위한 내용이 덧붙여진 것이라고 할 수도 있지만, 애초부터 객체지향을 염두에 두고 만들어진 언어와는 다르게, 단지 더 좋은 C 언어로서 수속형 언어로 취급하기도 한다. 초기의 C++은 C 위에 놓인 트랜스레이터로 구현되었다. 즉, C++ 프로그램을 일단 C 프로그램으로 변환하고 나서 C 컴파일러로 컴파일하는 식이었고 따라서 C 언어에 대해 상위 호환성을 갖는 언어였다.'}/>
            <SkillTooltip skill={'Java'} description={'자바는 썬 마이크로시스템즈의 제임스 고슬링과 다른 연구원들이 개발한 객체 지향적 프로그래밍 언어이다. 처음에는 가전제품 내에 탑재해 동작하는 프로그램을 위해 개발되었지만 현재 웹 애플리케이션 분야에 가장 많이 사용하는 언어 중 하나이고, 안드로이드를 비롯한 모바일 기기용 소프트웨어 개발에도 널리 사용되고 있다.'}/>
            <SkillTooltip skill={'JavaScript'} description={'자바스크립트(JavaScript)는 객체(object) 기반의 스크립트 언어입니다.HTML로는 웹의 내용을 작성하고, CSS로는 웹을 디자인하며, 자바스크립트로는 웹의 동작을 구현할 수 있습니다.자바스크립트는 주로 웹 브라우저에서 사용되나, Node.js와 같은 프레임워크를 사용하면 서버 측 프로그래밍에서도 사용할 수 있습니다.현재 컴퓨터나 스마트폰 등에 포함된 대부분의 웹 브라우저에는 자바스크립트 인터프리터가 내장되어 있습니다.'}/>
            <SkillTooltip skill={'Python'} description={'파이썬은 가독성이 높고 쉬운 문법 덕택에 다른 프로그래밍 언어보다 빠른 습득이 가능하다는 특징이 있습니다. 그 덕에 프로그래밍을 전공하지 않은 비전공자 중심으로 인기를 얻어 데이터 분석과 모델링을 다루는 통계학부터 딥러닝과 인공지능을 활용하는 의학에까지 다양한 분야에 두루 활용되고 있습니다.'}/>
        </div>

        

        <MessageModal/>

</div>
    </div>
    </section>
        </>
    )
}

export default Profile