import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

import LoginCss from "../styles/Login.module.scss";
import loginImg from "../assets/login.png";

function Login() {
  const navigate = useNavigate();

  async function validate(e) {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;

    let response = (
      await axios.post(process.env.REACT_APP_LOGIN, {
        key: "thisisthecloneofyoutubemadebybinayakdev",
        email,
        password,
      })
    ).data;

    if (response.status) {
      localStorage.setItem("sessionId", response.token);
      navigate("/dashboard");
    } else {
      toast.error(response.msg);
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("sessionId");
    if (token !== null) {
      navigate("/dashboard");
    }
  });

  useEffect(() => {
    let query = matchMedia("(max-width:1300px)");
    query.addEventListener("change", () => {
      if (query.matches) {
        document.body.style.background = "#ececec";
      } else {
        document.body.style.background = "#0f0f0f";
      }
    });
    return () => {
      document.body.style.background = "#0f0f0f";
    };
  });

  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{
          top: "80px",
        }}
      />
      <div className={LoginCss.loginContainer}>
        <div className={LoginCss.loginElements}>
          <div className={LoginCss.leftElements}>
            <div className={LoginCss.top}>
              <h2>Login</h2>
            </div>
            <div className={LoginCss.bottom}>
              <form onSubmit={(e) => validate(e)}>
                <div className={LoginCss.emailInp}>
                  <span>Email address</span>
                  <input
                    type="email"
                    placeholder="Your Mail"
                    autoComplete="off"
                    spellCheck="false"
                    name="email"
                  />
                </div>
                <div className={LoginCss.passInp}>
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Your Password"
                    name="password"
                  />
                  {/* <Link to={"/forgot"}>Forgot password ?</Link> */}
                </div>
                <div className={LoginCss.submitBtn}>
                  <button type="submit">Login</button>
                  <p>
                    Doesn't have an account yet ?
                    <Link to={"/register"}>Sign up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className={LoginCss.rightElements}>
            <img src={loginImg} alt="login" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
