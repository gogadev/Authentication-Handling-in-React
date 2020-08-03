import React from "react";

import img from "../../assets/img.jpg";

import "./header.style.css";

const Header = () => {
  return (
    <header>
      <div className="image">
        {" "}
        <img className="img" src={img} alt="" />
      </div>
      <h1 className="title">Authentication App</h1>
    </header>
  );
};

export default Header;
