import "./App.css";
import Intro from "./components/Intro/Intro";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//COMPONENTES
import Home from "./components/Home/Home";
import RecipeDetail from "./components/Recipes/RecipeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/recipes" element={<Home />}></Route>
        <Route path="/recipe/:idReceta" element={<RecipeDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
