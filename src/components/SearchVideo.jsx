import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SearchVideoCard from "./SearchVideoCard";
import SearchCss from "../styles/Search.module.scss";
import Loader from "./Loader.jsx";

function SearchVideo() {
  const { query } = useParams();
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

    async function searchResults() {
      const options = {
        method: "GET",
        url: "https://yt-api.p.rapidapi.com/search",
        params: { query },
        headers: {
          "X-RapidAPI-Key": api,
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        },
      };

      try {
        const response = (await axios.request(options)).data;
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
        setVideos(response.data);
        setLoaded(true);
      } catch {
        setApi(allApi[index]);
        index++;
        console.clear();
      }
    }
    searchResults();
  }, [query, api, index]);

  return (
    <>
      {loaded ? (
        <div className={SearchCss.searchResults}>
          {videos.map((vid, ind) => {
            return vid.type === "video" ? (
              <SearchVideoCard
                key={ind}
                token={token}
                allId={allId}
                videoId={vid.videoId}
                vidThumbnail={vid.thumbnail[vid.thumbnail.length - 1].url}
                length={vid.lengthText}
                vidTitle={vid.title}
                views={vid.viewCount}
                publishedTime={vid.publishedTimeText}
                channelThumbnail={
                  vid.channelThumbnail[vid.channelThumbnail.length - 1].url
                }
                channelTitle={vid.channelTitle}
                description={vid.description}
                badge={vid.badges}
              />
            ) : null;
          })}
        </div>
      ) : (
        <div className={SearchCss.loader}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default SearchVideo;
