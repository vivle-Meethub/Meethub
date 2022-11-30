import axios from "axios";
import {useEffect,useState } from "react";
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


const User:NextPage = ({post}:any) => {
  const router = useRouter();
  const { username }: any = router.query;


  
  
  let date = new Date();
  let today = (date.getMonth()+1) +'/' + date.getDate() + '/' + date.getFullYear();


  const weatherApiKey = "1df5e2040e1f1297719ed96af9dbaeb6";
  const year = "last";
  //DaeyeonKim97 DwarfThema wantop1 pjhhs021 mungjin4966 hyunjungjeon 5onchangwoo


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

  const location = useStore((state:any) => state.location)
  const setLocation = useStore((state:any) => state.setLocation)

  const temperature = useStore((state:any) => state.temperature)
  const setTemperature = useStore((state:any) => state.setTemperature)

  const weather = useStore((state:any) => state.weather)
  const setWeather = useStore((state:any) => state.setWeather)

  const feed = useStore((state:any) => state.feed)

  const [postCount,setPostCount] = useState();



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
      sendWeatherToUnity();  
      sendUserToUnity();
    },2000);
        

  }, [username]);

  useEffect(() => {
    sendWeatherToUnity();       
      sendUserToUnity();
  }, [commitCount]);



  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          function (error) {
            console.error(error);
            resolve({
              latitude: "37.3595704",
              longitude: "127.105399",
            });
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      }).then((coords) => {
        console.log(`coords:${JSON.stringify(coords)}`);
        return coords;
      });
    }

    alert("GPS를 지원하지 않습니다");
    return {
      latitude: "37.3595704",
      longitude: "127.105399",
    };
  }

  const sendWeatherToUnity = async () => {
    sendMessage("GameManager", "GetDate", today);

    try {
      const gsLocation: any = await getLocation();

      console.log("gsLocation", gsLocation);

      await axios({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${gsLocation?.latitude}&lon=${gsLocation?.longitude}&appid=${weatherApiKey}`,
      }).then((response) => {
        console.log(response);

        setLocation(response.data.name);
        setTemperature(
          (
            Math.round((response.data.main.temp - 273.15) * 10) / 10
          ).toString() + "°C"
        );
        setWeather(response.data.weather[0].main);

        

        console.log("location : " + location);
        console.log("temperature : " + temperature);
        console.log("weather : " + weather);
        console.log("date : " + today);

        sendMessage("GameManager", "GetLocation", location);
        sendMessage("GameManager", "GetTemperature", temperature);
        sendMessage("GameManager", "GetWeather", weather);
      
      });
    } catch (err) {
      console.log(err);
    }


  };

  const sendUserToUnity = async () => {
    const commitCountDiv = document.querySelector(
      ".react-activity-calendar__count"
    );
    const words: any = commitCountDiv?.textContent?.split(" ");
    console.log("username : " + username);
    console.log("commit count : " + commitCount);
    setCommitCount(words[0]);

    sendMessage("GameManager", "GetUsername", username);
    sendMessage("GameManager", "GetCommit", commitCount);

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
                  style={{
                    display:"flex",
                    justifySelf:"center",
                    width: "93%",
                    height: "100%",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  unityProvider={unityProvider}
                />
              </div>

              <div style={is3D ? { display: "none" } : { display: "flex", justifyContent:'center' }}>
                {username && isLoaded && (
                  <GitHubCalendar year={year} username={username} blockSize={17}/>
                )}
              </div>

              <div
                style={{ display: "none" }}
                className="react-activity-calendar__count"
              ></div>

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
