import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getRecipeDetail } from "../../redux/actions";
import "./recipeDetail.css";

const RecipeDetail = () => {
  //para regresar a la ruta anterior
  const navigate = useNavigate();

  //loader hasta que se carga el detalle de la receta
  const [loading, setLoading] = useState([true]);

  let dietsList = [];
  const { idReceta } = useParams();

  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);

  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(dispatch(getRecipeDetail(idReceta)));
    }).then((res) => {
      setLoading(false);
    });
  }, [dispatch, idReceta]);

  //const { image, name, diets, dishTypes, steps } = recipeDetail[0];
  return (
    <section className="container">
      {recipeDetail.map((e) => {
        const { id, image, name, diets, dishTypes, steps, summary } = e;

        return loading ? (
          <div key={id} className="loader">
            <img
              src={`${
                "https://recipes-client-production.up.railway.app/" ||
                "http://localhost:3000"
              }/uploads/loading1.gif`}
              className="loading"
              alt="logo"
            />
          </div>
        ) : (
          <div key={id}>
            <div>
              <Link onClick={() => navigate(-1)}>
                <button className="secondary" type="submit">
                  <img
                    alt="arrow left"
                    src="https://assets-global.website-files.com/5fa5ee97e1eb253b5efc0385/61537f4f2d87afd3cd9b1ce8_arrow-left-2.png"
                  />
                  Back
                </button>
              </Link>
              <h2>{name}</h2>
            </div>

            <section className="detail">
              <div>
                <img
                  src={image ? image : "/uploads/default_recipe.jpg"}
                  alt="default recipe"
                />
              </div>

              <div>
                <strong>Diets: </strong>
                {typeof diets !== "string"
                  ? diets.forEach((d) => {
                      //si vienen de la BD vienen como arreglo
                      dietsList.push(d.name);
                    })
                  : diets}
                {dietsList.join(", ")}.
                <div>
                  {dishTypes && (
                    <div>
                      <strong>Tipos de plato: </strong>
                      {dishTypes}
                    </div>
                  )}
                </div>
                <div>
                  <p>
                    <strong>Description:</strong>
                  </p>
                  <div> {summary.replace(/<[^>]+>/g, "")} </div>
                </div>
                {steps && (
                  <div>
                    <p>
                      <strong>Directions:</strong>
                    </p>
                    {Array.isArray(steps)
                      ? steps.map((s, i) => {
                          return (
                            <div key={i}>
                              <span className="stepNumber">
                                <strong>{s.number}. </strong>
                              </span>
                              <span className="stepText">{s.step}</span>
                            </div>
                          );
                        })
                      : steps}
                  </div>
                )}
              </div>
            </section>
          </div>
        );
      })}
    </section>
  );
};
export default RecipeDetail;
