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
        <ul>
          <li>Inicio</li>
          <li>Crear receta</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
