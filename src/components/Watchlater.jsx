import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import WatchlaterCss from "../styles/Watchlater.module.scss";
import warningImg from "../assets/Warning.gif";
import WatchlaterVideoCard from "./WatchlaterVideoCard";
import NoVideoImg from "../assets/no-video.png";

function Watchlater() {
  const [isLogged, setIsLogged] = useState(false);
  const [id, setId] = useState([]);
  const [token, setToken] = useState(null);
  const [dbIds, setDbIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("sessionId");
    if (token === null) {
      setIsLogged(false);
      setLoaded(true);
    } else {
      async function userValidate() {
        let response = await axios.post(process.env.REACT_APP_USERDATA, {
          key: "thisisthecloneofyoutubemadebybinayakdev",
          token,
        });
        if (response.data.status) {
          setId(response.data.data.videoId);
          setDbIds(response.data.data.videoId);
          setToken(token);
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
        setLoaded(true);
      }
      userValidate();
    }
  }, []);

  return (
    <>
      {isLogged ? (
        id.length !== 0 ? (
          loaded ? (
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
          ) : null
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
      ) : loaded ? (
        <div className={WatchlaterCss.loginFirst}>
          <div className={WatchlaterCss.warningImg}>
            <img src={warningImg} alt="warning" />
          </div>
          <div className={WatchlaterCss.text}>
            <p>Login First To Use This Feature</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Watchlater;
