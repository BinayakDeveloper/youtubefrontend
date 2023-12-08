import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import NavbarCss from "../styles/Navbar.module.scss";
import logo from "../assets/yt-logo.png";

import { FaBars, FaArrowLeft } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdHome, MdWatchLater, MdAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

function Navbar() {
  const navigate = useNavigate();

  const [left, setLeft] = useState("-100%");
  const [secStatus, setSecStatus] = useState(false);
  const [userData, setUserData] = useState({});

  // Login Status

  useEffect(() => {
    async function logStatus() {
      let token = localStorage.getItem("sessionId");
      if (token !== null) {
        let response = (
          await axios.post(process.env.REACT_APP_USERDATA, {
            key: "thisisthecloneofyoutubemadebybinayakdev",
            token,
          })
        ).data;
        if (response.status) {
          setUserData(response.data);
        }
      }
    }
    logStatus();
  }, []);

  // Universal Query Using Enter

  function sendQuery(query) {
    if (query.trim() !== "") {
      setSecStatus(false);
      navigate(`./search/${query}`);
    }
  }

  // Desktop Search Operation

  function sendQueryByBtn() {
    let query = document.querySelector("#search-input");
    if (query.value.trim() !== "") {
      query.blur();
      setSecStatus(false);
      navigate(`./search/${query.value}`);
    }
  }

  // Mobile Search Operation

  function mobSendQueryByBtn() {
    let query = document.querySelector("#search-input2");
    if (query.value.trim() !== "") {
      query.blur();
      secStatus(false);
      navigate(`./search/${query.value}`);
    }
  }

  useEffect(() => {
    const mediaQuery = matchMedia("(max-width: 450px)");
    mediaQuery.addEventListener("change", () => {
      if (!mediaQuery.matches) {
        setSecStatus(false);
      }
    });
  });

  return (
    <>
      {secStatus === false ? (
        <nav>
          <div className={NavbarCss.left}>
            <div className={NavbarCss.bars} onClick={() => setLeft("0%")}>
              <FaBars />
            </div>
            <Link to={"/"}>
              <div className={NavbarCss.logo}>
                <div className={NavbarCss.logoImg}>
                  <img src={logo} alt="logo" />
                </div>
                <div className={NavbarCss.label}>
                  <p>YouTube</p>
                </div>
              </div>
            </Link>
          </div>

          <div className={NavbarCss.center}>
            <div className={NavbarCss.searchBox}>
              <div className={NavbarCss.input}>
                <input
                  type="text"
                  id="search-input"
                  placeholder="Search"
                  spellCheck="false"
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.target.blur();
                      sendQuery(e.target.value);
                    }
                  }}
                />
              </div>

              <div className={NavbarCss.searchBtn}>
                <IoSearchSharp onClick={sendQueryByBtn} />
              </div>
            </div>
          </div>

          <div className={NavbarCss.end}>
            <div
              className={NavbarCss.mobSearch}
              onClick={() => setSecStatus(true)}
            >
              <IoSearchSharp />
            </div>
            {Object.keys(userData).length !== 0 ? (
              <p
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                {userData.name.slice(0, 1).toUpperCase()}
              </p>
            ) : (
              <VscAccount />
            )}
          </div>
        </nav>
      ) : (
        <div className={NavbarCss.secBar}>
          <div className={NavbarCss.secBarElements}>
            <div
              className={NavbarCss.secBarBack}
              onClick={() => setSecStatus(false)}
            >
              <FaArrowLeft />
            </div>
            <div className={NavbarCss.secInput}>
              <input
                type="text"
                id="search-input2"
                placeholder="Search"
                spellCheck="false"
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.target.blur();
                    sendQuery(e.target.value);
                  }
                }}
              />
            </div>
            <div className={NavbarCss.secSearchBtn}>
              <IoSearchSharp onClick={mobSendQueryByBtn} />
            </div>
          </div>
        </div>
      )}

      {/* Other Options */}
      <div className={NavbarCss.optionContainer} style={{ left: left }}>
        <div className={NavbarCss.top}>
          <div className={NavbarCss.bars2} onClick={() => setLeft("-100%")}>
            <FaBars />
          </div>
          <div className={NavbarCss.logoImg2}>
            <img src={logo} alt="logo2" />
          </div>
          <div className={NavbarCss.secondaryLabel}>
            <p>YouTube</p>
          </div>
          <br />
        </div>
        <div className={NavbarCss.bottom}>
          <div className={NavbarCss.optionLinks}>
            <Link
              to={"/"}
              onClick={(e) => {
                e.preventDefault();
                setLeft("-100%");
                navigate("/");
              }}
            >
              <MdHome />
              Home
            </Link>
            <Link
              to={"/watchlater"}
              onClick={(e) => {
                e.preventDefault();
                setLeft("-100%");
                navigate("/watchlater");
              }}
            >
              <MdWatchLater />
              Watch Later
            </Link>
            <Link
              to={"/dashboard"}
              onClick={(e) => {
                e.preventDefault();
                setLeft("-100%");
                navigate("/dashboard");
              }}
            >
              <MdAccountCircle />
              Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
