import React from "react";
import { Link } from "react-router-dom";
import "./intro.css";

const Intro = () => {
  return (
    <div className="intro">
      <h1>Bienvenidos</h1>
      <Link to="/home">
        <button>Iniciar</button>
      </Link>
    </div>
  );
};
export default Intro;
