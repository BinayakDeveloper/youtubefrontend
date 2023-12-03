import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import SearchCss from "../styles/Search.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";

function SearchVideoCard({
  token,
  allId,
  videoId,
  vidThumbnail,
  length,
  vidTitle,
  views,
  publishedTime,
  channelThumbnail,
  channelTitle,
  description,
  badges,
}) {
  const [showWL, setShowWL] = useState(false);
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
      <div className={SearchCss.searchContainer}>
        <Link to={`/watch/${videoId}`}>
          <div className={SearchCss.elements}>
            <div className={SearchCss.leftElements}>
              <div className={SearchCss.thumbnail}>
                <img src={vidThumbnail} alt="thumbnail" />
              </div>
              <div className={SearchCss.timeStamp}>
                <p>{length}</p>
              </div>
            </div>
            <div className={SearchCss.rightElements}>
              <div className={SearchCss.title}>
                <p>{vidTitle}</p>
              </div>
              <div className={SearchCss.viewsPublished}>
                <p>
                  {views >= 1000
                    ? views < 1000000
                      ? Math.floor(views / 1000) + "K"
                      : Math.floor(views / 1000000) + "M"
                    : views}{" "}
                  • {publishedTime}
                </p>
              </div>
              <div className={SearchCss.channelInfo}>
                <div className={SearchCss.channelThumbnail}>
                  <img src={channelThumbnail} alt="thumbnail" />
                </div>
                <div className={SearchCss.channelName}>
                  <p title={channelTitle}>{channelTitle}</p>
                </div>
              </div>
              <div className={SearchCss.description}>
                <p>{description}</p>
              </div>
              <div className={SearchCss.badges}>
                {badges !== undefined && badges.length !== 0
                  ? badges.map((badge, ind) => {
                      return (
                        <div className={SearchCss.badgeContent} key={ind}>
                          <p>{badge}</p>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <div
            className={SearchCss.watchLater}
            onClick={(e) => {
              e.preventDefault();
              if (showWL) setShowWL(false);
              else setShowWL(true);
            }}
          >
            <HiDotsVertical />
            {showWL ? (
              isSaved === false ? (
                <div
                  className={SearchCss.wlOption}
                  onClick={(e) => addToWatchLater(e)}
                >
                  <div className={SearchCss.watchLaterBtn}>
                    <IoTimeOutline />
                    <span>Save To Watch Later</span>
                  </div>
                </div>
              ) : (
                <div
                  className={SearchCss.wlOption}
                  onClick={(e) => removeFromWatchLater(e)}
                >
                  <div className={SearchCss.watchLaterBtn}>
                    <IoTimeOutline />
                    <span>Remove From Watch Later</span>
                  </div>
                </div>
              )
            ) : null}
          </div>
        </Link>
      </div>
    </>
  );
}

export default SearchVideoCard;
