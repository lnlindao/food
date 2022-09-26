import "./App.css";
import React from "react";

import Intro from "./components/Intro/Intro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//COMPONENTES
import Home from "./components/Home/Home";
import RecipeDetail from "./components/Recipes/RecipeDetail";
import Navbar from "./components/Navbar/Navbar";
import CreateRecipe from "./components/Recipes/CreateRecipe";

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Navbar location={window.location.pathname} />
        <Routes>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/recipes" element={<Home />}></Route>
          <Route
            path="/recipe/:idReceta"
            element={<RecipeDetail />}
          ></Route>{" "}
          <Route path="/recipes/create" element={<CreateRecipe />}></Route>
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
