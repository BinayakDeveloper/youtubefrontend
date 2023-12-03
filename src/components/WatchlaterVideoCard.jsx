import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import NoVideoImg from "../assets/no-video.png";
import WatchlaterCss from "../styles/Watchlater.module.scss";
import { MdDeleteOutline } from "react-icons/md";

function WatchlaterVideoCard({ token, videoId, dbIds }) {
  const [videoData, setVideoData] = useState({});
  const [channelData, setChannelData] = useState({});
  const [isRemoved, setIsRemoved] = useState(false);
  const [fetchedDbIds, setFetchedDbIds] = useState([]);

  const [api, setApi] = useState(
    "23c2e64272mshd6db66991d6b7cdp1efe89jsn8aba084b8896"
  );

  let index = 0;

  useEffect(() => {
    setFetchedDbIds(dbIds);

    const allApi = [
      "8dd1c0187dmsh0dc7067a0d6ad15p11b7dbjsn599a10df85de",
      "6045bc6e7cmsh906de508efff181p1a9958jsn345285a31c5f",
    ];

    async function getVideoData() {
      try {
        const options = {
          method: "GET",
          url: "https://yt-api.p.rapidapi.com/video/info",
          params: { id: videoId },
          headers: {
            "X-RapidAPI-Key": api,
            "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          },
        };

        let response = (await axios.request(options)).data;

        setVideoData(response);

        const channelOptions = {
          method: "GET",
          url: "https://youtube-v3-alternative.p.rapidapi.com/channel",
          params: {
            id: response.channelId,
          },
          headers: {
            "X-RapidAPI-Key": api,
            "X-RapidAPI-Host": "youtube-v3-alternative.p.rapidapi.com",
          },
        };

        const channelResponse = (await axios.request(channelOptions)).data.meta;

        setChannelData(channelResponse);
      } catch (error) {
        setApi(allApi[index]);
        index++;
        console.clear();
      }
    }

    getVideoData();
  }, [api, dbIds, index, videoId]);

  async function removeFromWatchLater(e) {
    e.preventDefault();
    let response = await axios.post(process.env.REACT_APP_DELETE_ID, {
      key: "thisisthecloneofyoutubemadebybinayakdev",
      token: token,
      videoId: videoId,
    });
    if (response.data.status) {
      fetchedDbIds.splice(fetchedDbIds.indexOf(videoId), 1);
      setFetchedDbIds(fetchedDbIds);
      setIsRemoved(true);
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  }

  function formatDate(videoData) {
    let currentMinute = new Date().getMinutes();
    let currentHours = new Date().getHours();
    let currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Video Data

    let videoTiming = new Date(videoData.uploadDate);
    let videoMinute = videoTiming.getMinutes();
    let videoHours = videoTiming.getHours();
    let videoDate = videoTiming.getDate();
    let videoMonth = videoTiming.getMonth();
    let videoYear = videoTiming.getFullYear();

    let finalMinute = currentMinute - videoMinute;
    let finalDate = currentDate - videoDate;
    let finalHours = currentHours - videoHours;
    let finalMonth = currentMonth - videoMonth;
    let finalYear = currentYear - videoYear;

    if (finalYear !== 0) {
      return finalYear + " years ago";
    }

    if (finalMonth !== 0) {
      return finalMonth + " months ago";
    }

    if (finalDate !== 0) {
      return finalDate + " days ago";
    }

    if (finalHours !== 0) {
      return finalHours + " hours ago";
    }

    if (finalMinute !== 0) {
      return finalMinute + " minutes ago";
    }
  }

  return (
    <>
      <Toaster containerStyle={{ top: "80px" }} position="top-center" />

      {fetchedDbIds.length !== 0 ? (
        isRemoved === false ? (
          Object.keys(videoData).length !== 0 ? (
            <div className={WatchlaterCss.videoContainer}>
              <Link to={`/watch/${videoData.id}`}>
                <div className={WatchlaterCss.videoElements}>
                  <div className={WatchlaterCss.leftElements}>
                    <div className={WatchlaterCss.thumbnail}>
                      <img
                        src={
                          videoData.thumbnail[videoData.thumbnail.length - 1]
                            .url
                        }
                        alt="thumbnail"
                      />
                    </div>
                  </div>
                  <div className={WatchlaterCss.rightElements}>
                    <div className={WatchlaterCss.first}>
                      <div className={WatchlaterCss.videoTitle}>
                        <p>{videoData.title}</p>
                      </div>
                      <div className={WatchlaterCss.videoInfo}>
                        <p>
                          {videoData.viewCount >= 1000 &&
                          videoData.viewCount < 1000000
                            ? Math.floor(videoData.viewCount / 1000) + "K"
                            : videoData.viewCount >= 1000000
                            ? (videoData.viewCount / 1000000).toFixed(1) + "M"
                            : videoData.viewCount}{" "}
                          • {formatDate(videoData)}
                        </p>
                      </div>
                      <div className={WatchlaterCss.channelInfo}>
                        {Object.keys(channelData).length !== 0 ? (
                          <img
                            src={
                              channelData.thumbnail[
                                channelData.thumbnail.length - 1
                              ].url
                            }
                            alt="channelthumbnail"
                          />
                        ) : null}
                        <p>{videoData.channelTitle}</p>
                      </div>
                      <div className={WatchlaterCss.description}>
                        <p>{}</p>
                      </div>
                    </div>
                    <div className={WatchlaterCss.last}>
                      <div
                        className={WatchlaterCss.deleteVideo}
                        onClick={(e) => {
                          removeFromWatchLater(e);
                        }}
                      >
                        <MdDeleteOutline />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ) : null
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
      )}
    </>
  );
}

export default WatchlaterVideoCard;
