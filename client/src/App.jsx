import React from "react";
import Login from "../src/Components/Login/Login.jsx";
import Ahome from "../src/Components/Home/Ahome.jsx";
import Pesticides from "./Components/Pesticides/Pesticides.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeasonCrops from "./Components/Seasons/SeasonCrops.jsx";
import PestsList from "./Components/Crop/PestsList.jsx";
import Home from "./Components/Home/Home.jsx";
import Signup from "./Components/Signup/Signup.jsx";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/auth/signin" element={<Login />} />
        <Route path="/auth/signup" element={< Signup/>} />
        <Route path="/crops" element={<SeasonCrops />} />
        <Route path="/pests" element={<PestsList />} /> 
        <Route path="/pesticide/:id" element={<Pesticides />} />
      </Routes>
    </Router>
  );
}

export default App;