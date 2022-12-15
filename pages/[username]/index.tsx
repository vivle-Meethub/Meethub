import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import GitHubCalendar from "react-github-calendar";
import useStore from "../../store";
import { useRouter } from "next/router";
import Profile from "../../components/user/Profile";
import Post from "../../components/user/Post";
import Layout from "../../components/layout";
import ViewToggle from "../../components/user/ViewToggle";
import type { NextPage } from "next";
import MobileProfile from "../../components/user/MobileProfile";
import { Circle } from "rc-progress";


const User:NextPage = () => {

  const router = useRouter();
  const { username }: any = router.query;

  const year = "last";

  const { unityProvider, isLoaded, loadingProgression, sendMessage } =
    useUnityContext({
      loaderUrl: "Build/MeetHub.loader.js",
      dataUrl: "Build/MeetHub.data",
      frameworkUrl: "Build/MeetHub.framework.js",
      codeUrl: "Build/MeetHub.wasm",
    });

  const loadingPercentage = Math.round(loadingProgression * 100);

  const is3D = useStore((state:any) => state.is3D)
  const commitCount = useStore((state:any) => state.commitCount)
  const setCommitCount = useStore((state:any) => state.setCommitCount)

  const postCount = useStore((state:any) => state.postCount)
  const setPostCount = useStore((state:any) => state.setPostCount)

  
  const totalCount = useStore((state:any) => state.totalCount)
  const setTotalCount = useStore((state:any) => state.setTotalCount)


  useEffect(() => {

    const getPostCount = async() => {

      try {
        const response = await axios.get(`/api/post/count/${username}`,{
          method: 'get',
        });
        console.log(response.data);
        setPostCount(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    getPostCount();
    
  }, [username,postCount]);
  

  useEffect(() => {

    setTimeout(()=>{
      sendMessage("GameManager", "GetDate", "12/16/2022");
      sendUserToUnity();
    },2000)


  }, [username,postCount,isLoaded]);



  useEffect(() => {   
    setTimeout(()=>{
      sendMessage("GameManager", "GetDate", "12/16/2022");
      sendUserToUnity();
    },500)

}, [totalCount]);


  useEffect(() => {   
    setTimeout(()=>{
      sendMessage("GameManager", "GetDate", "12/16/2022");
      sendUserToUnity();
    },500)

}, [postCount]);




  const sendUserToUnity = async () => {
    const commitCountDiv = document.querySelector(
      ".react-activity-calendar__count"
    );
    const words: any = commitCountDiv?.textContent?.split(" ");
    console.log("username : " + username);
    console.log("commit count : " + commitCount);
    console.log("post count : " + postCount);
    console.log(String(Number(commitCount) + postCount))
    setCommitCount(words[0]);
    setTotalCount(String(Number(words[0]) + postCount))


    sendMessage("GameManager", "GetUsername", username);
    sendMessage("GameManager", "GetCommit", totalCount);

  };

  return (
    <>
      <Layout seoTitle={username}>

        

        <div className="App flex-col-reverse mt-16">
          <section className="user flex justify-center">

            
              {/* ==================== profile section ==================== */}

              <Profile username={username} postCount = {postCount}/>


            {/* ==================== unity-post section ==================== */}
            <section
             className= {isLoaded===true ? "unity-post w-full" : "hidden"}
            >
                
              {/* ==================== unity section ==================== */}
              
              {isLoaded === false && (
                  <div className="loading-overlay py-72">
                  <div className ="flex justify-center"><Circle className ="flex justify-center w-14" percent={loadingPercentage} strokeWidth={2} strokeColor="#78E08F"/></div>
                  <div className ="flex justify-center mt-3">잠시만 기다려 주세요. ({loadingPercentage}%)</div>
                  </div>
                )}

              {isLoaded !== false && <ViewToggle/>}
              <div style={is3D ? { display: "flex", justifyContent:'center' } : { display: "none" }}>
{/* 
                <Unity
                  className="flex justify-center w-[97%] items-center"
                  unityProvider={unityProvider}
                /> */}
                

                <Unity
                  className= {isLoaded===true ? "flex justify-center w-[97%] lg:max-h-[600px] items-center" : "hidden"}
                  unityProvider={unityProvider}
                />

              </div>

              <div style={is3D ? { display: "none" } : { display: "flex", justifyContent:'center', paddingLeft: '0.5rem',paddingRight: '0.5rem' }}>
                {username && isLoaded && (
                  <GitHubCalendar year={year} username={username} blockSize={17}/>
                )}
              </div>


              <div className="react-activity-calendar__count hidden">{'0'}</div>

              <MobileProfile username={username}/>

              {/* ==================== post section ==================== */}
                  <Post username={username}/>

            </section>
            </section>
        </div>
      </Layout>
    </>
  );
};

export default User;
