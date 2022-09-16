import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

const dietsDb = (arrayDiets) => {
  let result = [];
  for (let e in arrayDiets) {
    result.push(Object.values(arrayDiets[e]));
  }
  let res = result.join(", ");
  return res;
};

const Card = (data) => {
  const { image, name, diets, id, healthScore } = data;
  return (
    <div
      className="card"
      style={{
        backgroundImage: image
          ? `url(${image}`
          : "url(/uploads/default_recipe.jpg)",
      }}
    >
      <Link to={`/recipe/${id}`}>
        <h3 className="title">{name}</h3>
        <div className="diets">
          {Array.isArray(diets) ? dietsDb(diets) : diets}
          <p>HS: {healthScore}</p>
        </div>
      </Link>
    </div>
  );
};
export default Card;
