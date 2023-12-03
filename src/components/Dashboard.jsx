import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCss from "../styles/Dashboard.module.scss";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function tokenValidate() {
      let token = localStorage.getItem("sessionId");
      if (token == null) {
        navigate("/login");
      } else {
        let response = (
          await axios.post(process.env.REACT_APP_USERDATA, {
            key: "thisisthecloneofyoutubemadebybinayakdev",
            token,
          })
        ).data;

        if (!response.status) {
          localStorage.removeItem("sessionId");
          navigate("/login");
        } else {
          setUserData(response.data);
        }
      }
    }

    tokenValidate();
  }, [navigate]);

  return (
    <>
      {Object.keys(userData).length !== 0 ? (
        <>
          <div className={DashboardCss.dashboardContainer}>
            <div className={DashboardCss.dashboardElements}>
              <div className={DashboardCss.userDetails}>
                <div className={DashboardCss.profilePic}>
                  <p>{userData.name.slice(0, 1).toUpperCase()}</p>
                </div>

                <div className={DashboardCss.userName}>
                  <p>Binayak</p>
                </div>
              </div>

              <div className={DashboardCss.otherDetails}>
                <p>
                  <strong>Email - </strong>binayakdas598@gmail.com
                </p>
              </div>
              <div className={DashboardCss.dashboardStatus}>
                <p>
                  <strong>Account Status - </strong>
                </p>
                <p>Active</p>
              </div>
              <div
                className={DashboardCss.logout}
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("sessionId");
                  navigate("/login");
                }}
              >
                Log Out
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Dashboard;
