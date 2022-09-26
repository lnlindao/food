import React from "react";
import { Link } from "react-router-dom";
import "./intro.css";

const Intro = () => {
  return (
    <div className="intro">
      <div className="content">
        <h1 className="title">Welcome</h1>
        <p className="textIntro">
          Here you'll find a variety of recipes for all tastes, let's go!.
        </p>
        <Link to="/recipes">
          <button className="search">ENTER</button>
        </Link>
      </div>
    </div>
  );
};
export default Intro;
