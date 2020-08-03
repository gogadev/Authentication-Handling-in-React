import React, { useContext } from "react";

import { AuthContext } from "../../context/context";

import user from "../../assets/user.png";

import "./authentication.style.css";

const Authentication = () => {
  const authContext = useContext(AuthContext);

  const loginHandler = () => {
    // API call to server

    // response from server
    const userResponse = {
      token: "atd2323jb454jtt",
    };
    authContext.login(userResponse.token);
  };

  const logoutHandler = () => {
    authContext.logout();
  };

  return (
    <div className="auth">
      {!authContext.isLoggedIn && (
        <button className="btn" onClick={loginHandler}>
          Login
        </button>
      )}
      {authContext.isLoggedIn && (
        <button className="btn" onClick={logoutHandler}>
          Logout
        </button>
      )}
      {!authContext.isLoggedIn && (
        <div className="auth-page">
          {" "}
          <img className="user" src={user} alt="" />
        </div>
      )}
    </div>
  );
};

export default Authentication;
