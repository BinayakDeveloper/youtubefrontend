import axios from "axios";
import { useEffect, useState } from "react";
import WatchlaterCss from "../styles/Watchlater.module.scss";
import warningImg from "../assets/Warning.gif";
import WatchlaterVideoCard from "./WatchlaterVideoCard";
import NoVideoImg from "../assets/no-video.png";

function Watchlater() {
  const [isLogged, setIsLogged] = useState(false);
  const [id, setId] = useState([]);
  const [token, setToken] = useState(null);
  const [dbIds, setDbIds] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("sessionId");
    if (token === null) {
      setIsLogged(false);
    } else {
      async function userValidate() {
        let response = await axios.post(process.env.REACT_APP_ALL_VIDEO_ID, {
          key: "thisisthecloneofyoutubemadebybinayakdev",
          token,
        });
        if (response.data.status) {
          setId(response.data.videoIds);
          setDbIds(response.data.videoIds);
          setToken(token);
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      }
      userValidate();
    }
  }, []);

  return (
    <>
      {isLogged ? (
        id.length !== 0 ? (
          <div className={WatchlaterCss.allVideos}>
            {id.map((vidId, ind) => {
              return (
                <WatchlaterVideoCard
                  key={ind}
                  token={token}
                  videoId={vidId}
                  dbIds={dbIds}
                />
              );
            })}
          </div>
        ) : (
          <div
            className="noVideos"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
              marginTop: "50px",
            }}
          >
            <img src={NoVideoImg} alt="novid" height={120} />
            <p
              style={{
                fontSize: "1.2rem",
                color: "#fff",
                fontWeight: "bold",
                letterSpacing: "0.8px",
              }}
            >
              No Videos Available
            </p>
          </div>
        )
      ) : (
        <div className={WatchlaterCss.loginFirst}>
          <div className={WatchlaterCss.warningImg}>
            <img src={warningImg} alt="warning" />
          </div>
          <div className={WatchlaterCss.text}>
            <p>Login First To Use This Feature</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Watchlater;
