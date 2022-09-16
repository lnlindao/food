import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeDetail } from "../../redux/actions";

const RecipeDetail = () => {
  const { idReceta } = useParams();

  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);

  useEffect(() => {
    dispatch(getRecipeDetail(idReceta));
  }, [dispatch, idReceta]);

  //const { image, name, diets, dishTypes, steps } = recipeDetail[0];
  return (
    <section>
      {recipeDetail.map((e) => {
        const { id, image, name, diets, dishTypes, steps, summary } = e;

        return (
          <div key={id}>
            <h3>{name}</h3>

            <div>
              {Array.isArray(diets) ? (
                diets.map((d, i) => {
                  return (
                    <div key={i}>
                      <strong>Dietas:</strong> {d.name}
                    </div>
                  );
                })
              ) : (
                <div>
                  <strong>Dietas:</strong> {diets}
                </div>
              )}
              <div>
                {dishTypes && (
                  <div>
                    <strong>Tipo de dieta: </strong>
                    {dishTypes}
                  </div>
                )}
              </div>
            </div>

            <img
              src={image ? image : "/uploads/default_recipe.jpg"}
              alt="default recipe"
            />

            <div>
              <p>
                <strong>Acerca de este plato:</strong>{" "}
              </p>
              <div dangerouslySetInnerHTML={{ __html: summary }} />
            </div>

            <div>
              <p>
                <strong>Preparación:</strong>{" "}
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
          </div>
        );
      })}
    </section>
  );
};
export default RecipeDetail;
