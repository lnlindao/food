import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import {
  getAllRecipes,
  getAllRecipeTypes,
  getRecipesByDiet,
  orderByName,
  orderByHealthScore,
} from "../../redux/actions";

//Components
import Searchbar from "../Searchbar/Searchbar";
import Paging from "../Paging/Paging";
import RecipeDetailContainer from "../Recipes/RecipeDetailContainer";

const Home = () => {
  const dispatch = useDispatch();
  //estado global de todas las recetas
  const allRecipes = useSelector((state) => state.recipes);

  //estado local para realizar el ordenamiento por nombre
  const [sorted, setSortedRecipes] = useState("");
  const [sortedByHealth, setsortedByHealth] = useState("");

  const AllDiets = useSelector((state) => state.diets);

  //mostrar de nuevo todas las recetas => boton VER TODO
  function getAllRecipesToRender() {
    dispatch(getAllRecipes());
  }

  //filtrado por tipo de dieta
  function handleFilterRecipeByDiet(e) {
    dispatch(getRecipesByDiet(e.target.value));
  }

  //ordenamiento por nombre
  function sortRecipesByName(e) {
    //NO ENTIENDOOOOOOO POR QUE HAY QUE AGREGAR AQUI UN ESTADO QUE NO HACE NADA MAS QUE GUARDAR EL VALUE Y EN EL DE TIPO DE DIETAS NOOOOO
    setSortedRecipes(e.target.value);
    console.log(sorted);
    dispatch(orderByName(e.target.value));
  }

  //ordenamiento por healthScore
  function sortRecipesByHealthScore(e) {
    setsortedByHealth(e.target.value);
    console.log("sorted", sortedByHealth);
    dispatch(orderByHealthScore(e.target.value));
  }

  useEffect(() => {
    //cargo todos los tipos de dieta EN EL INPUT
    dispatch(getAllRecipeTypes());
  }, [dispatch]);

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
        <div className="derecha">
          <div>
            Ordenar por nombre:
            <select id="orderByName" onChange={(e) => sortRecipesByName(e)}>
              <option value="none">Seleccionar</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
          <div>
            Ordenar por saludable:
            <select onChange={(e) => sortRecipesByHealthScore(e)}>
              <option value="high">Mayor a menor</option>
              <option value="low">Menor a mayor</option>
            </select>
          </div>
          <div>
            Filtrar por tipo de dieta:
            <select onChange={(e) => handleFilterRecipeByDiet(e)}>
              {AllDiets.map((t) => {
                return (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <button
          className="search"
          type="submit"
          onClick={(e) => getAllRecipesToRender()}
        >
          Ver todo
        </button>
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
