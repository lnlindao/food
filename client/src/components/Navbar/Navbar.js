import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  //con location conozco el path actual y oculto el header en la pagina de intro
  const location = useLocation();

  return (
    <header className={location.pathname === "/" ? "headerHidden" : ""}>
      <div className="container">
        <div id="logo">
          <Link to={"/"}>
            Recipes<span>by Lissette</span>
          </Link>
        </div>
        <nav>
          <Link to={"/recipes"}>Inicio</Link>
          <Link to={"/recipes/create"}>Crear receta</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
