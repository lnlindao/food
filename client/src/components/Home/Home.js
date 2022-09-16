import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRecipes, getAllRecipeTypes } from "../../redux/actions";
import Card from "../Recipes/Card";

const Home = () => {
  //loader hasta que se cargan las recetas
  //const [loading, setLoading] = useState([true]);

  //local states para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);

  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const AllDiets = useSelector((state) => state.recipeType);

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllRecipeTypes());
  }, [dispatch]);

  return (
    <div className="container">
      {AllDiets.map((e) => console.log(e))}
      <h1>¿Qué vas a cocinar hoy?</h1>
      <section id="controles">
        <div>
          Ordenar:
          <select>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
        <div>
          Tipo de dieta:
          <select>
            {AllDiets.map((t) => {
              return (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      <section id="recipesContainer">
        {allRecipes?.map((element) => {
          return (
            <div className="card" key={element.id}>
              <Link to={`/recipe/${element.id}`}>
                <Card
                  image={element.image}
                  name={element.name}
                  diets={element.diets}
                />
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default Home;
