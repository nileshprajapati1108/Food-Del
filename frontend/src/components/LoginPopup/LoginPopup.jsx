import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // INPUT CHANGE HANDLER (FIXED)
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // LOGIN / SIGNUP SUBMIT
  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        {/* TITLE */}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        {/* INPUTS */}
        <div className="login-popup-input">
          {/* NAME ONLY FOR SIGN UP */}
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* BUTTON */}
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* TERMS */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {/* SWITCH */}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
