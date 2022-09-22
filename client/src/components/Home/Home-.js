import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./home.css";

//Components
import Searchbar from "../Searchbar/Searchbar";
import Paging from "../Paging/Paging";
import RecipeDetailContainer from "../Recipes/RecipeDetailContainer";
import Controls from "../Searchbar/Controls";

const Home = () => {
  //estado global de todas las recetas para hacer al paginado
  const allRecipes = useSelector((state) => state.recipes);

  //estados para el paginado
  const [page, setPage] = useState(1);
  const recipesPerPage = 9;
  const max = allRecipes.length / recipesPerPage;

  return (
    <div className="container">
      <section id="search">
        <h2 className="title">¿Qué vas a cocinar hoy?</h2>
        <Searchbar />
      </section>

      <section id="controles">
        <Controls />
      </section>

      <section id="recipesContainer">
        <RecipeDetailContainer page={page} recipesPerPage={recipesPerPage} />
      </section>

      <section id="paginado">
        <Paging page={page} setPage={setPage} max={max} />
      </section>
    </div>
  );
};
export default Home;
