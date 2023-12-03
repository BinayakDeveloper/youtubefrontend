import axios from "axios";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import RegisterCss from "../styles/Register.module.scss";
import RegisterImg from "../assets/register.png";

function Register() {
  const navigate = useNavigate();

  async function validate(e) {
    e.preventDefault();

    let name, email, password, confirmPass;
    name = e.target[0].value;
    email = e.target[1].value;
    password = e.target[2].value;
    confirmPass = e.target[3].value;

    if (password === confirmPass) {
      let userData = {
        key: "thisisthecloneofyoutubemadebybinayakdev",
        name,
        email,
        password,
      };

      const response = (
        await axios.post(process.env.REACT_APP_REGISTER, userData)
      ).data;

      if (response.status) {
        toast.success(response.msg);
        Array.from(e.target).forEach((val) => {
          val.value = "";
        });
      } else {
        toast.error(response.msg);
      }
    } else {
      toast.error("Password Mismatched");
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("sessionId");
    if (token !== null) {
      navigate("/dashboard");
    }
  });
  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{
          top: "80px",
        }}
      />
      <div className={RegisterCss.registerContainer}>
        <div className={RegisterCss.registerElements}>
          <div className={RegisterCss.leftElements}>
            <div className={RegisterCss.top}>
              <h2>Register</h2>
            </div>
            <div className={RegisterCss.bottom}>
              <form onSubmit={(e) => validate(e)}>
                <div className={RegisterCss.nameInp}>
                  <span>Your Name</span>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    autoComplete="off"
                    spellCheck="false"
                    name="username"
                    required
                  />
                </div>
                <div className={RegisterCss.emailInp}>
                  <span>Email address</span>
                  <input
                    type="email"
                    placeholder="Your Mail"
                    autoComplete="off"
                    spellCheck="false"
                    name="email"
                    required
                  />
                </div>
                <div className={RegisterCss.passInp}>
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Your Password"
                    name="pass"
                    required
                  />
                </div>
                <div className={RegisterCss.confirmPassInp}>
                  <span>Confirm Password</span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="c-pass"
                    required
                  />
                </div>
                <div className={RegisterCss.submitBtn}>
                  <button type="submit">Sign up</button>
                  <p>
                    Already Registered ?<Link to={"/login"}>Sign in</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className={RegisterCss.rightElements}>
            <img src={RegisterImg} alt="Register" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
