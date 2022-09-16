import React from "react";

const dietsDb = (arrayDiets) => {
  let result = [];
  for (let e in arrayDiets) {
    result.push(Object.values(arrayDiets[e]));
  }
  let res = result.join(", ");
  return res;
};

const Card = (data) => {
  const { image, name, diets } = data;
  return (
    <div>
      <h3>{name}</h3>
      <figure>
        <img src={image ? image : "/uploads/default_recipe.jpg"} />
      </figure>
      <div>{Array.isArray(diets) ? dietsDb(diets) : diets}</div>
    </div>
  );
};
export default Card;
