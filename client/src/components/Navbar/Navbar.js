import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <header>
      <div id="logo">
        <Link to={"/"}>
          Recipes<span>by Lissette</span>
        </Link>
      </div>
      <nav>
        <Link to={"/recipes"}>Inicio</Link>
        <Link to={"/recipes/create"}>Crear receta</Link>
      </nav>
    </header>
  );
};

export default Navbar;
