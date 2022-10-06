import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllRecipes } from "../../redux/actions";

//Components
import Card from "../Recipes/Card";

const RecipeDetailContainer = ({
  loading,
  setLoading,
  page,
  recipesPerPage,
}) => {
  const dispatch = useDispatch();

  //estado global de todas las recetas
  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(dispatch(getAllRecipes()));
    }).then(() => {
      setLoading(false);
    });

    //cargo todos los cards de recetas
  }, [dispatch, setLoading]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <div>
            <img
              src={`"https://recipes-client-production.up.railway.app/uploads/loading1.gif`}
              className="loading"
              alt="logo"
            />
          </div>
        </div>
      ) : Array.isArray(allRecipes) ? (
        allRecipes.length !== 0 ? (
          allRecipes
            ?.slice(
              (page - 1) * recipesPerPage,
              (page - 1) * recipesPerPage + recipesPerPage
            )
            .map((element) => {
              return (
                <Card
                  key={element.id}
                  id={element.id}
                  image={element.image}
                  name={element.name}
                  diets={element.diets}
                  healthScore={element.healthScore}
                  toDelete={element.toDelete}
                  dishTypes={element.dishTypes}
                />
              );
            })
        ) : (
          //si hay datos pero al filtrar por tipo de dieta no se encuentra nada
          <p className="errors">No recipes yet</p>
        )
      ) : (
        //si al buscar no se encuentra ninguna coincidencia
        <p className="errors">{allRecipes}</p>
      )}
    </>
  );
};
export default RecipeDetailContainer;
