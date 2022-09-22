/*import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  getAllRecipeTypes,
  getRecipesByDiet,
  orderByName,
  orderByHealthScore,
} from "../../redux/actions";

const Controls = () => {
  const dispatch = useDispatch();

  //leer el estadp global donde est'an todos los tipos de dieta
  const AllDiets = useSelector((state) => state.diets);
  const allRecipes = useSelector((state) => state.recipes);

  //estado local para realizar el ordenamiento por nombre
  const [sorted, setSortedRecipes] = useState("");
  const [sortedByHealth, setsortedByHealth] = useState("");

  //ordenamiento por healthScore
  function sortRecipesByHealthScore(e) {
    console.log("antes de ordenar", allRecipes);
    setsortedByHealth(allRecipes);
    console.log(sorted);
    dispatch(orderByHealthScore(e.target.value));
    console.log("al ordenar sortRecipesByHealthScore", sortedByHealth);
  }

  //ordenamiento por nombre
  function sortRecipesByName(e) {
    //NO ENTIENDOOOOOOO POR QUE HAY QUE AGREGAR AQUI UN ESTADO QUE NO HACE NADA MAS QUE GUARDAR EL VALUE Y EN EL DE TIPO DE DIETAS NOOOOO
    setSortedRecipes(e.target.value);
    dispatch(orderByName(e.target.value));
    console.log("al ordenar allRecipes", allRecipes);
  }

  //mostrar de nuevo todas las recetas => boton VER TODO
  function getAllRecipesToRender() {
    dispatch(getAllRecipes());
  }

  //filtrado por tipo de dieta
  function handleFilterRecipeByDiet(e) {
    dispatch(getRecipesByDiet(e.target.value));
  }

  useEffect(() => {
    //cargo todos los tipos de dieta EN EL INPUT
    dispatch(getAllRecipeTypes());
  }, [dispatch, sortRecipesByName]);

  return (
    <>
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
    </>
  );
};
export default Controls;
*/
