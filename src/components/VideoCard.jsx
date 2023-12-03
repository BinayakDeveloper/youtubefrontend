import axios from "axios";
import Cardcss from "../styles/Card.module.scss";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function VideoCard({
  token,
  videoId,
  allId,
  thumbnailUrl,
  vidLength,
  channelLogo,
  title,
  channelName,
  views,
  publishedTime,
}) {
  const [showWlOpt, setShowWlOpt] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  async function addToWatchLater(e) {
    e.preventDefault();
    let response = (
      await axios.post(process.env.REACT_APP_ADD_ID, {
        key: "thisisthecloneofyoutubemadebybinayakdev",
        token,
        videoId,
      })
    ).data;
    if (response.status) {
      setIsSaved(true);
      toast.success(response.msg, { duration: 2500 });
    } else {
      toast.error(response.msg, { duration: 2500 });
    }
  }

  async function removeFromWatchLater(e) {
    e.preventDefault();
    let response = (
      await axios.post(process.env.REACT_APP_DELETE_ID, {
        key: "thisisthecloneofyoutubemadebybinayakdev",
        token,
        videoId,
      })
    ).data;

    if (response.status) {
      setIsSaved(false);
      toast.success(response.msg, { duration: 2500 });
    } else {
      toast.error(response.msg, { duration: 2500 });
    }
  }

  useEffect(() => {
    if (allId.includes(videoId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [allId, videoId]);

  return (
    <>
      <Toaster containerStyle={{ top: "80px" }} position="top-center" />
      <Link to={`./watch/${videoId}`}>
        <div className={Cardcss.card}>
          <div className={Cardcss.thumbnail}>
            <img src={thumbnailUrl} alt="vidThumbnail" />
            <div className={Cardcss.vidLength}>
              <p>{vidLength}</p>
            </div>
          </div>

          <div className={Cardcss.otherInfo}>
            <div className={Cardcss.logo}>
              <img src={channelLogo} alt="logo" />
            </div>

            <div className={Cardcss.videoInfo}>
              <div className={Cardcss.title}>
                <p>{title}</p>
              </div>

              <div className={Cardcss.channelName}>
                <p>{channelName}</p>
              </div>

              <div className={Cardcss.viewsPublish}>
                <p>
                  {views >= 1000
                    ? views < 1000000
                      ? Math.floor(views / 1000) + "K"
                      : Math.floor(views / 1000000) + "M"
                    : views}{" "}
                  views •
                </p>
                <p>{publishedTime}</p>
              </div>
            </div>
            {token !== null ? (
              <div
                className={Cardcss.watchLater}
                onClick={(e) => {
                  e.preventDefault();
                  if (showWlOpt) setShowWlOpt(false);
                  else setShowWlOpt(true);
                }}
              >
                <HiDotsVertical />
                {showWlOpt ? (
                  isSaved === false ? (
                    <div
                      className={Cardcss.wlOption}
                      onClick={(e) => addToWatchLater(e)}
                    >
                      <div className={Cardcss.watchLaterBtn}>
                        <IoTimeOutline />
                        <span>Save To Watch Later</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={Cardcss.wlOption}
                      onClick={(e) => removeFromWatchLater(e)}
                    >
                      <div className={Cardcss.watchLaterBtn}>
                        <IoTimeOutline />
                        <span>Remove From Watch Later</span>
                      </div>
                    </div>
                  )
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Link>
    </>
  );
}

export default VideoCard;
