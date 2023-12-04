import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import WatchCss from "../styles/Watch.module.scss";
import { IoEyeOutline } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";

function Watch() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState({});
  const [channelData, setChannelData] = useState([]);
  const [related, setRelated] = useState([]);
  const [token, setToken] = useState(null);
  const [addedVideo, setAddedVideo] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
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

    async function getVideoDetails() {
      const options = {
        method: "GET",
        url: "https://yt-api.p.rapidapi.com/dl",
        params: { id: id },
        headers: {
          "X-RapidAPI-Key": api,
          "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
        },
      };

      try {
        const response = (await axios.request(options)).data;

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

        const relatedOptions = {
          method: "GET",
          url: "https://yt-api.p.rapidapi.com/related",
          params: { id: response.id },
          headers: {
            "X-RapidAPI-Key": api,
            "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
          },
        };

        const relatedResponse = (await axios.request(relatedOptions)).data.data;

        setRelated(relatedResponse);
      } catch {
        setApi(allApi[index]);
        index++;
        console.clear();
      }
    }

    getVideoDetails();
  }, [id, api, index]);

  useEffect(() => {
    async function tokenValidate() {
      let token = localStorage.getItem("sessionId");
      if (token !== null) {
        let { data } = await axios.post(process.env.REACT_APP_USERDATA, {
          key: "thisisthecloneofyoutubemadebybinayakdev",
          token: token,
        });
        if (data.status) {
          setToken(token);
          let ids = (
            await axios.post(process.env.REACT_APP_ALL_VIDEO_ID, {
              key: "thisisthecloneofyoutubemadebybinayakdev",
              token: token,
            })
          ).data;
          setAddedVideo(ids.videoIds);
          if (ids.videoIds.includes(videoData.id)) {
            setIsSaved(true);
          } else {
            setIsSaved(false);
          }
          setLoaded(true);
        }
      }
    }
    tokenValidate();
  }, [videoData]);

  async function addToWatchLater(e) {
    e.preventDefault();
    let response = await axios.post(process.env.REACT_APP_ADD_ID, {
      key: "thisisthecloneofyoutubemadebybinayakdev",
      token: token,
      videoId: videoData.id,
    });
    if (response.data.status) {
      addedVideo.push(videoData.id);
      setAddedVideo(addedVideo);
      setIsSaved(true);
      toast.success(response.data.msg);
    } else {
      toast.success(response.data.msg);
    }
  }

  async function removeFromWatchLater(e) {
    e.preventDefault();
    let response = await axios.post(process.env.REACT_APP_DELETE_ID, {
      key: "thisisthecloneofyoutubemadebybinayakdev",
      token: token,
      videoId: videoData.id,
    });
    if (response.data.status) {
      let videoIdIndex = addedVideo.indexOf(videoData.id);
      addedVideo.splice(videoIdIndex, 1);
      setAddedVideo(addedVideo);
      setIsSaved(false);
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  }

  return (
    <>
      {videoData.formats !== undefined && channelData.length !== 0 ? (
        loaded ? (
          <>
            <Toaster containerStyle={{ top: "80px" }} position="top-center" />
            <div className={WatchCss.watchContainer}>
              <div className={WatchCss.containerElements}>
                <div className={WatchCss.leftElements}>
                  <div className={WatchCss.mainVideo}>
                    <video
                      src={videoData.formats[videoData.formats.length - 1].url}
                      autoPlay
                      controls
                    />
                  </div>
                  <div className={WatchCss.videoInfo}>
                    <div className={WatchCss.title}>
                      <p>{videoData.title}</p>
                    </div>
                    <div className={WatchCss.channelInfo}>
                      <div className={WatchCss.leftInfo}>
                        <img
                          src={
                            channelData.thumbnail[
                              channelData.thumbnail.length - 1
                            ].url
                          }
                          alt="ch-thumbnail"
                        />
                        <div className={WatchCss.titleSub}>
                          <p>{channelData.title}</p>
                          <p>{channelData.subscriberCount} subscribers</p>
                        </div>
                      </div>

                      <div className={WatchCss.rightInfo}>
                        <div className={WatchCss.views}>
                          <IoEyeOutline />
                          <p>
                            {videoData.viewCount >= 1000
                              ? videoData.viewCount < 1000000
                                ? Math.floor(videoData.viewCount / 1000) + "K"
                                : Math.floor(videoData.viewCount / 1000000) +
                                  "M"
                              : videoData.viewCount}
                          </p>
                        </div>
                        {token !== null ? (
                          isSaved === false ? (
                            <div
                              className={WatchCss.watchLater}
                              onClick={(e) => {
                                addToWatchLater(e);
                              }}
                            >
                              <MdSaveAlt />
                              <p>Save</p>
                            </div>
                          ) : (
                            <div
                              className={WatchCss.watchLater}
                              onClick={(e) => {
                                removeFromWatchLater(e);
                              }}
                            >
                              <IoMdRemoveCircleOutline />
                              <p>Remove</p>
                            </div>
                          )
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={WatchCss.rightElements}>
                  <div className={WatchCss.relatedContainer}>
                    {related.map((relVid, ind) => {
                      return relVid.type === "video" ? (
                        <Link to={`/watch/${relVid.videoId}`} key={ind}>
                          <div className={WatchCss.relatedElements}>
                            <div className={WatchCss.relatedLeftElements}>
                              <div className={WatchCss.relatedThumbnail}>
                                <img
                                  src={
                                    relVid.thumbnail[
                                      relVid.thumbnail.length - 1
                                    ].url
                                  }
                                  alt="thumbnail"
                                />
                              </div>
                              <div className={WatchCss.timeStamp}>
                                <p>{relVid.lengthText}</p>
                              </div>
                            </div>
                            <div className={WatchCss.relatedRightElements}>
                              <div className={WatchCss.relatedTitle}>
                                <p>{relVid.title}</p>
                              </div>
                              <div className={WatchCss.relatedChannelName}>
                                <p>{relVid.channelTitle}</p>
                              </div>
                              <div className={WatchCss.relatedViewsDate}>
                                <p>
                                  {relVid.viewCount >= 1000
                                    ? relVid.viewCount < 1000000
                                      ? Math.floor(relVid.viewCount / 1000) +
                                        "K"
                                      : Math.floor(relVid.viewCount / 1000000) +
                                        "M"
                                    : relVid.viewCount}{" "}
                                  • {relVid.publishedTimeText}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null
      ) : null}
    </>
  );
}

export default Watch;
