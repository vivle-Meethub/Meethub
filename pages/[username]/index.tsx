import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import GitHubCalendar from "react-github-calendar";
import useStore from "../../store";
import { useRouter } from "next/router";
import Profile from "../../components/user/Profile";
import Post from "../../components/user/Post";
import Layout from "../../components/Layout";
import ViewToggle from "../../components/user/ViewToggle";
import SeasonButton from "../../components/user/SeasonButton";



const User = () => {
  const router = useRouter();
  const { username }: any = router.query;

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
  const [commitCount, setCommitCount] = useState("");
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const [today, setToday] = useState(new Date().toLocaleDateString());
  

  const is3D = useStore((state:any) => state.is3D)


  useEffect(() => {
    setTimeout(() => {
      sendUserToUnity();
    }, 2000);

    sendWeatherToUnity();

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
        sendMessage("GameManager", "GetDate", today);
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
    sendMessage("GameManager", "GetCommit", words[0]);
  };

  return (
    <>
      <Layout seoTitle={username}>

        <div className="App flex-col-reverse">
          <section className="user flex justify-center">

            
              {/* ==================== profile section ==================== */}

              <Profile username={username}/>


            {/* ==================== unity-post section ==================== */}
            <section
              style={{ marginTop: "20px", marginLeft: "30px" }}
              className="unity-post"
            >
              {isLoaded === false && (
                <div className="loading-overlay">
                  <p>Loading... ({loadingPercentage}%)</p>
                </div>
              )}

              <div className="season-test flex">
                <ViewToggle/>

                <div
                  onClick={()=>{
                    sendMessage("GameManager", "GetDate", "03/30/2022");
                    sendUserToUnity();
                  }}  
                >
                  <SeasonButton emoji="🌸"/>
                </div>

                <div
                  onClick={()=>{
                    sendMessage("GameManager", "GetDate", "08/30/2022");
                    sendUserToUnity();
                  }}  
                >
                    <SeasonButton emoji="🌴"/>
                </div>

                <div
                  onClick={()=>{
                    sendMessage("GameManager", "GetDate", "09/30/2022");
                    sendUserToUnity();
                  }}  
                >
                  <SeasonButton emoji="🍁"/>
                </div>


                <div
                  onClick={()=>{
                    sendMessage("GameManager", "GetDate", "12/30/2022");
                    sendUserToUnity();
                  }}  
                >
                  <SeasonButton emoji="⛄"/>
                </div>
              </div>

              {/* ==================== unity section ==================== */}
              <div style={is3D ? { display: "flex" } : { display: "none" }}>
                <Unity
                  style={{
                    display:"flex",
                    justifySelf:"center",
                    width: "80%",
                    height: "80%",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  unityProvider={unityProvider}
                />
              </div>

              <div style={is3D ? { display: "none" } : { display: "block" }}>
                {username && isLoaded && (
                  <GitHubCalendar year={year} username={username} />
                )}
              </div>

              <div
                style={{ display: "none" }}
                className="react-activity-calendar__count"
              ></div>

              {/* ==================== post section ==================== */}
                  <Post/>

            </section>
            </section>
        </div>
      </Layout>
    </>
  );
};

export default User;
