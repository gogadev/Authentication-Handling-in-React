import React, { useContext } from "react";

import { AuthContext } from "../../context/context";

import approvedImg from "../../assets/approved.png";

import "./protected-page.style.css";

const ProtectedPage = () => {
  const authContext = useContext(AuthContext);
  return (
    <div className="protected-page">
      <div className="protected">
        {authContext.isLoggedIn && (
          <div>
            <h1 className="welcome">Welcome</h1>
            <img className="approved-img" src={approvedImg} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtectedPage;
