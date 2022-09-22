import React, { useState } from "react";
import "./paging.css";

const Paging = ({ page, setPage, max }) => {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(page) + 1);
  };
  const prevPage = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(page) - 1);
  };

  const keyDown = (e) => {
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > Math.ceil(max) ||
        isNaN(parseInt(e.target.value))
      ) {
        setInput(1);
        setPage(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <button className="secondary" disabled={page === 1} onClick={prevPage}>
        Prev
      </button>
      <input
        className="pagingNumber"
        name="page"
        autoComplete="off"
        value={input}
        onKeyDown={(e) => keyDown(e)}
        onChange={(e) => handleChange(e)}
      />
      <p className="mh">of {Math.ceil(max)} </p>
      <button
        className="secondary"
        disabled={page === Math.ceil(max)}
        onClick={nextPage}
      >
        Next
      </button>
    </>
  );
};
export default Paging;
