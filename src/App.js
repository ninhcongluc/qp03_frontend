import "./App.css";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="container">
      <nav>
        <ul>
          <Link to="/homepage" class="list">
            Homepage
          </Link>
        </ul>
      </nav>

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
