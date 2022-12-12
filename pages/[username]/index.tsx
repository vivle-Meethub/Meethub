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
          timeout: 2000, 
        });
        console.log(response.data);
        setPostCount(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    getPostCount();


    setTimeout(() => {
      sendMessage("GameManager", "GetDate", "12/16/2022");
      sendUserToUnity();
    },2000);
        

  }, [username]);


  useEffect(() => {   
    sendMessage("GameManager", "GetDate", "12/16/2022");
    sendUserToUnity();

}, [postCount]);

  useEffect(() => {   
      sendMessage("GameManager", "GetDate", "12/16/2022");
      sendUserToUnity();

  }, [commitCount]);


  useEffect(() => {   
    sendMessage("GameManager", "GetDate", "12/16/2022");
    sendUserToUnity();

}, [totalCount]);


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
    setTotalCount(String(Number(commitCount) + postCount))

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
              className="unity-post w-full"
            >
              {isLoaded === false && (
                <div className="loading-overlay">
                  <p>Loading... ({loadingPercentage}%)</p>
                </div>
              )}

              <div className="season-test flex p-4">
                <ViewToggle/>


                <div style={is3D ? { display: "flex" } : { display: "none" }}>
                <div className="flex items-center">
                  <span
                  className="cursor-pointer"
                  onClick={()=>{
                    sendMessage("GameManager", "GetDate", "03/30/2022");
                    sendUserToUnity();
                  }}
                  >
                    🌸
                  </span>
                  
                  {/* <SeasonButton emoji="🌸"/> */}
                </div>


                <div className="flex items-center">
                  <span
                  className="cursor-pointer"
                  onClick={()=>{
                    sendMessage("GameManager", "GetDate", "06/30/2022");
                    sendUserToUnity();
                  }}
                  >
                    🌴
                  </span>
                  
                  {/* <SeasonButton emoji="🌴"/> */}
                </div>

                <div className="flex items-center">
                  <span
                  className="cursor-pointer"
                  onClick={()=>{
                    sendMessage("GameManager", "GetDate", "09/30/2022");
                    sendUserToUnity();
                  }}
                  >
                    🍁
                  </span>
                  
                  {/* <SeasonButton emoji="🍁"/> */}
                </div>

                <div className="flex items-center">
                  <span
                  className="cursor-pointer"
                  onClick={()=>{
                    sendMessage("GameManager", "GetDate", "12/30/2022");
                    sendUserToUnity();
                  }}
                  >
                    ⛄
                  </span>
                  
                  {/* <SeasonButton emoji="⛄"/> */}
                </div>

              </div>


                </div>

              {/* ==================== unity section ==================== */}
              <div style={is3D ? { display: "flex", justifyContent:'center' } : { display: "none" }}>
                <Unity
                  className="flex justify-center w-[97%] h-full items-center"
                  unityProvider={unityProvider}
                />
              </div>

              <div style={is3D ? { display: "none" } : { display: "flex", justifyContent:'center' }}>
                {username && isLoaded && (
                  <GitHubCalendar year={year} username={username} blockSize={17}/>
                )}
              </div>

              <div className="react-activity-calendar__count hidden"></div>

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
