import React from "react";
require("dotenv").config();

import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//REDUX
import { Provider } from "react-redux";
import { store } from "./redux/store";
import axios from "axios";

//VARIABLES DE ENTORNO
RAILWAY_STATIC_URL;
//axios.defaults.baseURL =  process.env.RAILWAY_STATIC_URL || "http://localhost:3001";
axios.defaults.baseURL =
  "https://recipes-api-production-733b.up.railway.app/" ||
  "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
