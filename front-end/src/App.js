// src/App.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/MainPage";
import DashBoard from "./pages/DashBoard";
import MainStore from "./pages/MainStore";
import PackingStore from "./pages/PackingStore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<DashBoard />} />
        <Route path="/MainStore" element={<MainStore />} />
        <Route path="/PackingStore" element={<PackingStore />} />
      </Routes>
    </Router>
  );
}

export default App;
