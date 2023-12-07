import { useEffect, useState } from "react";
import axios from "axios";

import HomeCss from "../styles/Home.module.scss";
import VideoCard from "./VideoCard";
import Loader from "./Loader";

function Home() {
  const [videos, setVideos] = useState([]);
  const [token, setToken] = useState(null);
  const [allId, setAllId] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [api, setApi] = useState(
    "8dd1c0187dmsh0dc7067a0d6ad15p11b7dbjsn599a10df85de"
  );

  let index = 0;

  useEffect(() => {
    const allApi = [
      "6045bc6e7cmsh906de508efff181p1a9958jsn345285a31c5f",
      "23c2e64272mshd6db66991d6b7cdp1efe89jsn8aba084b8896",
    ];

    async function youtubeHomeData() {
      const options = {
        method: "GET",
        url: "https://yt-api.p.rapidapi.com/trending",
        params: { geo: "IN" },
        headers: {
          "X-RapidAPI-Key": api,
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        },
      };

      try {
        const response = (await axios.request(options)).data.data;
        let curToken = localStorage.getItem("sessionId");

        let { data } = await axios.post(process.env.REACT_APP_USERDATA, {
          key: "thisisthecloneofyoutubemadebybinayakdev",
          token: curToken,
        });

        if (data.status) {
          setToken(curToken);
          setAllId(data.data.videoId);
        } else {
          setToken(null);
        }

        setVideos(response);
        setLoaded(true);
      } catch {
        setApi(allApi[index]);
        index++;
        console.clear();
      }
    }

    youtubeHomeData();
  }, [api, index]);

  return (
    <>
      <div className={HomeCss.homeVideos}>
        <div className={HomeCss.contents}>
          {loaded ? (
            videos.map((vid, ind) => {
              return vid.type === "video" ? (
                <VideoCard
                  key={ind}
                  token={token}
                  allId={allId}
                  videoId={vid.videoId}
                  thumbnailUrl={vid.thumbnail[2].url}
                  vidLength={vid.lengthText}
                  channelLogo={vid.channelThumbnail[0].url}
                  title={vid.title}
                  channelName={vid.channelTitle}
                  views={vid.viewCount}
                  publishedTime={vid.publishedTimeText}
                />
              ) : null;
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
