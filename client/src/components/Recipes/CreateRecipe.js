import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createRecipe, getAllRecipeTypes } from "../../redux/actions";
import "./createRecipe.css";

//recibe los datos de los input y verficia errores
function validateForm(dataFromInput) {
  //para verificar que solo se ingrese texto y espacios en el nombre de la receta
  var regex = new RegExp("^[a-zA-Z ]+$");

  let errors = {};

  //validacion del nombre de la receta
  if (!dataFromInput.name || !regex.test(dataFromInput.name)) {
    errors.name = "Ingrese un nombre válido";
  }
  //validacion del resumen
  if (!dataFromInput.summary) {
    errors.summary = "Ingrese un resumen del plato";
  }
  //validar saludable que sea numero y que sea entre 0 y 10
  if (
    dataFromInput.healthScore ||
    dataFromInput.healthScore < 0 ||
    dataFromInput.healthScore > 100 ||
    isNaN(dataFromInput.healthScore)
  ) {
    errors.healthScore = "Ingrese un valor numérico entre 0 y 10";
  }
  //validar que se haya seleccionado al menos 1 dieta
  if (dataFromInput.dietType.length === 0) {
    errors.dietType = "Seleccione al menos 1 tipo de dieta";
  }
  console.log("errors", errors);
  return errors;
}

const CreateRecipe = () => {
  //para regresar a la ruta anterior
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);

  //aqui se guardan los errores
  const [errors, setErrors] = useState({});

  //aqui voy a guardar todos los datos del formulario
  const [input, setInput] = useState({
    name: "",
    summary: "",
    steps: "",
    healthScore: "",
    dietType: [],
  });

  //controlo todos los input del formulario
  const handleChange = (e) => {
    //comprobar los input que no sean checkbox
    if (e.target.type !== "checkbox") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    //comprombar los checkbox
    else {
      const { value, checked } = e.target;
      const diets = input.dietType;
      // Case 1 : el usuario chequea el box
      if (checked) {
        setInput({
          ...input,
          dietType: [...diets, value],
        });
      }
      // Case 2 : el usuario quita el check
      else {
        setInput({
          ...input,
          dietType: diets.filter((e) => e !== value),
        });
      }
    }

    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  //envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    let messageFromForm = document.getElementById("messageFromForm");
    dispatch(createRecipe(input));
    messageFromForm.innerHTML = `<div class="msg">Receta creada</div>`;

    setInput({
      name: "",
      summary: "",
      healthScore: "",
      steps: "",
      dietType: [""],
    });
  };

  useEffect(() => {
    dispatch(getAllRecipeTypes());
    setErrors({ errors: "" });
  }, [dispatch]);

  return (
    <div className="container">
      <div>
        <Link onClick={() => navigate(-1)}>
          <button className="secondary" type="submit">
            <img
              alt="arrow left"
              src="https://assets-global.website-files.com/5fa5ee97e1eb253b5efc0385/61537f4f2d87afd3cd9b1ce8_arrow-left-2.png"
            />{" "}
            Regresar
          </button>
        </Link>
        <h1>Crear una receta</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre*: </label>
          <input
            type={"text"}
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="errors">{errors.name}</p>}
        </div>
        <div>
          <label>Resumen*: </label>
          <textarea
            rows="4"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          {errors.summary && <p className="errors">{errors.summary}</p>}
        </div>
        <div>
          <label>Nivel de saludable: </label>
          <input
            type={"number"}
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
          {errors.healthScore && <p className="errors">{errors.healthScore}</p>}
        </div>
        <div>
          <label>Preparación: </label>
          <textarea
            rows="4"
            value={input.steps}
            name="steps"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <label>Tipo de dieta*:</label>
        {errors.dietType && <p className="errors">{errors.dietType}</p>}

        <div className="diets">
          {allDiets.map(({ name }, index) => {
            return (
              <label key={index}>
                <input
                  type={"checkbox"}
                  value={name}
                  name={"dietType"}
                  onChange={(e) => handleChange(e)}
                />
                {name}
              </label>
            );
          })}
        </div>
        <input
          type={"submit"}
          value="Crear"
          className="primary"
          disabled={Object.values(errors).length !== 0 && "disabled"}
        />

        <div id="messageFromForm"></div>
      </form>
    </div>
  );
};

export default CreateRecipe;
