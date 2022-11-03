import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import GitHubCalendar from "react-github-calendar";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

const User = () => {
  const router = useRouter();
  const { username }: any = router.query;

  const key = "1df5e2040e1f1297719ed96af9dbaeb6";
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
  const [is3D, setIs3D] = useState(true);

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
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${gsLocation?.latitude}&lon=${gsLocation?.longitude}&appid=${key}`,
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
        <div className="App">
          <section className="user" style={{ display: "flex" }}>
            {/* ==================== profile section ==================== */}
            <section className="profile">
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "70%",
                  overflow: "hidden",
                }}
                className="box"
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "70%",
                    overflow: "hidden",
                  }}
                  className="profile"
                  src={`https://github.com/${username}.png`}
                  alt="profile"
                />
              </div>

              <div className="font-bold text-xl px-5 py-5">{username}</div>

              <div>
                <a href={`https://github.com/${username}`}>
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${username}&theme=vue&show_icons=true&line_height=40&count_private=true&hide=contribs`}
                    alt={`${username}'s GitHub Stats`}
                  />
                </a>
              </div>

              <div>
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&card_width=500`}
                  alt={`${username}'s GitHub Stats`}
                />
              </div>
            </section>

            {/* ==================== unity section ==================== */}
            <section
              style={{ marginTop: "20px", marginLeft: "30px" }}
              className="unity"
            >
              {isLoaded === false && (
                <div className="loading-overlay">
                  <p>Loading... ({loadingPercentage}%)</p>
                </div>
              )}

              <div className="season-test flex justify-end">
                <div className="flex items-center mr-20">
                  <div
                    onClick={() => {
                      setIs3D(!is3D);
                    }}
                    className="relative inline-block w-10 mr-2 align-middle select-none"
                  >
                    <input
                      type="checkbox"
                      name="toggle"
                      id="Green"
                      className="checked:bg-green-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="Green"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  <span className="text-gray-400 font-medium">
                    {is3D ? "3D" : "2D"}
                  </span>
                </div>

                <div
                  onClick={() => {
                    sendMessage("GameManager", "GetDate", "03/30/2022");
                    sendUserToUnity();
                  }}
                  className="my-5 mx-1 button w-40 h-16 bg-pink-500 rounded-lg cursor-pointer select-none
active:translate-y-2  active:[box-shadow:0_0px_0_0_#DB2777,0_0px_0_0_#F472B6]
active:border-b-[0px]
transition-all duration-150 [box-shadow:0_10px_0_0_#DB2777,0_15px_0_0_#F472B6]
border-b-[1px] border-pink-500
"
                >
                  <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
                    봄
                  </span>
                </div>

                <div
                  onClick={() => {
                    sendMessage("GameManager", "GetDate", "08/30/2022");
                    sendUserToUnity();
                  }}
                  className="my-5 mx-1 button w-40 h-16 bg-green-500 rounded-lg cursor-pointer select-none
active:translate-y-2  active:[box-shadow:0_0px_0_0_#10B981,0_0px_0_0_#34D399]
active:border-b-[0px]
transition-all duration-150 [box-shadow:0_10px_0_0_#10B981,0_15px_0_0_#34D399]
border-b-[1px] border-green-500
"
                >
                  <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
                    여름
                  </span>
                </div>

                <div
                  onClick={() => {
                    sendMessage("GameManager", "GetDate", "09/30/2022");
                    sendUserToUnity();
                  }}
                  className="my-5 mx-1 button w-40 h-16 bg-red-500 rounded-lg cursor-pointer select-none
active:translate-y-2  active:[box-shadow:0_0px_0_0_#DC2626,0_0px_0_0_#F87171]
active:border-b-[0px]
transition-all duration-150 [box-shadow:0_10px_0_0_#DC2626,0_15px_0_0_#F87171]
border-b-[1px] border-red-500
"
                >
                  <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
                    가을
                  </span>
                </div>

                <div
                  onClick={() => {
                    sendMessage("GameManager", "GetDate", "12/30/2022");
                    sendUserToUnity();
                  }}
                  className="my-5 mx-1 button w-40 h-16 bg-blue-500 rounded-lg cursor-pointer select-none
active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
active:border-b-[0px]
transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
border-b-[1px] border-blue-500
"
                >
                  <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
                    겨울
                  </span>
                </div>
              </div>
              <div style={is3D ? { display: "block" } : { display: "none" }}>
                <Unity
                  style={{
                    width: "850px",
                    height: "477px",
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
            </section>

            {/* ==================== post section ==================== */}
            {/* 포스트 레이아웃을 구축하고 예시 이미지를 넣어 무한 스크롤을 테스트*/}
            <section className="post">

            </section>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default User;
