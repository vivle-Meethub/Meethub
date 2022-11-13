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

  const fetchComments = async() => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    )

    const data = await res.json();
    return data;
  };

  
  const fetchData = async() => {
    const commentsFormServer = await fetchComments();

    setItems([...items, ...commentsFormServer]);

    if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
        sethasMore(false);
    }
    setPage(page + 1);
  };

  
  /* s3 업로드 테스트 */
  const uploadFile = async (e:any) => {
    e.preventDefault();
    const s3:any = new ReactS3Client(s3Config);
    const file = fileInput.current.files[0];
    const newFileName = uuid();

    try {
      if(file) {
        console.log(file.type);
        if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
          alert('JPEG, PNG, JPG 파일만 업로드 가능합니다.');
          e.target.value = null;
        } else{

          if (file.size > 10 * 1024 * 1024) {
            alert('10mb 이하의 파일만 업로드 할 수 있습니다.');
            e.target.value = null;              
          } else {

            const res = await s3.uploadFile(file, newFileName);
            console.log(res);
        
            if (res.status === 204) {
              console.log("파일업로드 완료");
            } else {
              console.log("파일업로드 실패");
            }

          }
        }
      }

  } catch (exception) {
      console.log(exception);
  }

  }
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

        <div className="App flex-col-reverse mt-16">
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

              <div className="season-test flex p-4">
                <ViewToggle/>

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
