import React from "react";
import { Link } from "react-router-dom";
import "./intro.css";

const Intro = () => {
  return (
    <div className="intro">
      <div className="content">
        <h1 className="title">Bienvenidos</h1>
        <Link to="/recipes">
          <button className="search">Iniciar</button>
        </Link>
      </div>
    </div>
  );
};
export default Intro;
