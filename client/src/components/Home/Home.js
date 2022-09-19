import React from "react";
import { useEffect, useState } from "react";
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
import Card from "../Recipes/Card";
import Searchbar from "../Searchbar/Searchbar";

const Home = () => {
  const dispatch = useDispatch();

  //loader hasta que se cargan las recetas
  const [loading, setLoading] = useState([true]);

  //estado local para realizar el ordenamiento por nombre
  const [sorted, setSortedRecipes] = useState("");
  const [sortedByHealth, setsortedByHealth] = useState("");

  const allRecipes = useSelector((state) => state.recipes);
  const AllDiets = useSelector((state) => state.recipeType);

  //filtrado por tipo de dieta
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
    dispatch(orderByName(e.target.value));
  }

  //ordenamiento por healthScore
  function sortRecipesByHealthScore(e) {
    setsortedByHealth(e.target.value);
    dispatch(orderByHealthScore(e.target.value));
  }

  useEffect(() => {
    setTimeout(() => {
      console.log("Delayed for 1 second.");
      setLoading(false);

      //cargo todos los cards de recetas
      dispatch(getAllRecipes());
    }, "1000");

    //cargo todos los tipos de dieta
    dispatch(getAllRecipeTypes());
  }, [dispatch]);

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
            Tipo de dieta:
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
        {loading ? (
          <img
            src="http://localhost:3000/uploads/loading1.gif"
            className="loading"
            alt="logo"
          />
        ) : Array.isArray(allRecipes) ? (
          allRecipes?.map((element) => {
            return (
              <Card
                key={element.id}
                id={element.id}
                image={element.image}
                name={element.name}
                diets={element.diets}
                healthScore={element.healthScore}
              />
            );
          })
        ) : (
          <span>No se han encontrado coincidencias</span>
        )}
      </section>
    </div>
  );
};
export default Home;
