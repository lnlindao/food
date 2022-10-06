import React from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRecipe, getAllRecipes } from "../../redux/actions";

const dietsDb = (arrayDiets) => {
  let result = [];
  for (let e in arrayDiets) {
    result.push(Object.values(arrayDiets[e]));
  }
  let res = result.join(", ");
  return res;
};

const Card = (data) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToDetail = (id) => {
    navigate(`/recipe/${id}`);
  };
  const deleteRecipeById = (e, id) => {
    e.stopPropagation();
    //dispatch(deleteRecipe(id));
    if (
      window.confirm("Are you sure you want to delete the recipe?") === true
    ) {
      new Promise((resolve, reject) => {
        resolve(dispatch(deleteRecipe(id)));
      }).then(() => {
        dispatch(getAllRecipes());
      });
    } else {
    }
  };

  const { image, name, diets, id, healthScore, toDelete } = data;

  return (
    <div
      onClick={() => goToDetail(id)}
      className="card"
      style={{
        backgroundImage: image
          ? `url(${image}`
          : "url(/uploads/default_recipe.jpg)",
      }}
    >
      <div className="link">
        {toDelete === true && (
          <div className="delete" onClick={(e) => deleteRecipeById(e, id)}>
            <img
              alt="delete button"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Delete-button.svg/16px-Delete-button.svg.png"
            />
          </div>
        )}
        <h3 className="title">{name}</h3>
        <div className="diets">
          {Array.isArray(diets) ? dietsDb(diets) : diets}

          <p>HS: {healthScore}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
