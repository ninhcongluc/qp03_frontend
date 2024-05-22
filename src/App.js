import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="container">
      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
