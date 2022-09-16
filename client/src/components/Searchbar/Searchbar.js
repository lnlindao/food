import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchByName } from "../../redux/actions";

const Searchbar = () => {
  const dispatch = useDispatch();

  //estado local para coger el nombre que se quiere buscar
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(SearchByName(name));
    }
  };

  const validateInput = (name) => {
    let alertEmpty = document.getElementById("alert");
    name.length > 0
      ? (alertEmpty.innerHTML = "")
      : (alertEmpty.innerHTML = "Rellene el campo de búsqueda");
  };

  return (
    <div className="searchbar">
      <input
        className="recipeName"
        required
        type="text"
        placeholder="buscar"
        id="name"
        name="name"
        onChange={(e) => handleInputChange(e)}
      ></input>
      <span id="alert"></span>
      <button className="search" type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
};
export default Searchbar;
