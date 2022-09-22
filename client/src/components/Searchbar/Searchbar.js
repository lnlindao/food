import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchByName } from "../../redux/actions";

const Searchbar = () => {
  const dispatch = useDispatch();

  //estado local para coger el nombre que se quiere buscar
  const [name, setName] = useState("");
  const [errors, seterrors] = useState({ name: "vacio" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SearchByName(name));
  };

  //control del input de busqueda
  const keyDown = (e) => {
    setName(e.target.value);
    seterrors(validateInput({ name: e.target.value }));
    if (e.keyCode === 13) {
      if (name) {
        console.log("entro al enter name", name);
        dispatch(SearchByName(name));
      }
    }
  };

  function validateInput(value) {
    let errors = {};
    if (value.name.length > 0 && value.name.length < 2) {
      errors.name = "Ingrese mínimo 2 caracteres";
    }
    if (value.name.length === 0) {
      errors.name = "vacio";
    }
    return errors;
  }

  return (
    <div className="searchbar">
      <input
        className="recipeName"
        required
        type="text"
        placeholder="Ingresa una palabra para buscar"
        id="name"
        name="name"
        onChange={(e) => keyDown(e)}
        onKeyDown={(e) => keyDown(e)}
        value={name}
      />

      <input
        value="BUSCAR"
        type={"submit"}
        disabled={(errors.name || errors.name === "vacio") && "disabled"}
        className="primary"
        onClick={(e) => handleSubmit(e)}
      />

      {errors.name && errors.name !== "vacio" && (
        <span className="errors">{errors.name}</span>
      )}
    </div>
  );
};
export default Searchbar;
