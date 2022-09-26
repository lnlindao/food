import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchByName } from "../../redux/actions";

const Searchbar = ({ setLoading }) => {
  const dispatch = useDispatch();

  //estado local para coger el nombre que se quiere buscar
  const [name, setName] = useState("");
  const [errors, seterrors] = useState({ name: "vacio" });

  //loader hasta que se cargan las recetas
  // const [loading, setLoading] = useState(false);

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
        new Promise((resolve, reject) => {
          setLoading(true);
          resolve(dispatch(SearchByName(name)));
        }).then(() => {
          setLoading(false);
        });
      }
    }
  };

  function validateInput(value) {
    let errors = {};
    if (value.name.length > 0 && value.name.length < 2) {
      errors.name = "Enter minimum 2 characters";
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
        placeholder="Enter a word to search"
        id="name"
        name="name"
        onChange={(e) => keyDown(e)}
        onKeyDown={(e) => keyDown(e)}
        value={name}
      />

      <input
        value="SEARCH"
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
