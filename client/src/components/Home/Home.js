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

  //loader hasta que se cargan las recetas
  const [loading, setLoading] = useState([true]);

  //estado local para realizar el ordenamiento por nombre
  const [sorted, setSortedRecipes] = useState("");
  const [sortedByHealth, setsortedByHealth] = useState("");

  const AllDiets = useSelector((state) => state.diets);

  //mostrar de nuevo todas las recetas => boton VER TODO
  function getAllRecipesToRender() {
    new Promise((res, rej) => {
      setLoading(true);
      res(dispatch(getAllRecipes()));
    }).then(() => {
      setLoading(false);
    });
  }

  //filtrado por tipo de dieta
  function handleFilterRecipeByDiet(e) {
    dispatch(getRecipesByDiet(e.target.value));
  }

  //ordenamiento por nombre
  function sortRecipesByName(e) {
    //NO ENTIENDOOOOOOO POR QUE HAY QUE AGREGAR AQUI UN ESTADO QUE NO HACE NADA MAS QUE GUARDAR EL VALUE Y EN EL DE TIPO DE DIETAS NOOOOO
    setSortedRecipes(e.target.value);
    dispatch(orderByName(e.target.value));
  }

  //ordenamiento por healthScore
  function sortRecipesByHealthScore(e) {
    setsortedByHealth(e.target.value);
    console.log("sorted", sorted, sortedByHealth);
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
        <h2 className="title">What do you like to cook today?</h2>
        <Searchbar setLoading={setLoading} />
      </section>
      <section id="controles">
        <div className="derecha">
          <div>
            Sort by name:
            <select id="orderByName" onChange={(e) => sortRecipesByName(e)}>
              <option value="none">Seleccionar</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
          <div>
            Sort by health score:
            <select onChange={(e) => sortRecipesByHealthScore(e)}>
              <option value="high">Mayor a menor</option>
              <option value="low">Menor a mayor</option>
            </select>
          </div>
          <div>
            Filter by diet type:
            <select onChange={(e) => handleFilterRecipeByDiet(e)}>
              <option value="all">View all</option>
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
          View all
        </button>
      </section>
      <section id="recipesContainer">
        <RecipeDetailContainer
          loading={loading}
          setLoading={setLoading}
          page={page}
          recipesPerPage={recipesPerPage}
        />
      </section>
      <section id="paginado">
        <Paging page={page} setPage={setPage} max={max} />
      </section>
    </div>
  );
};
export default Home;
