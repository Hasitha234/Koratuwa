// src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/MainPage';
import Home from './pages/DashBoard';
import MainStore from './pages/MainStore';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/MainStore" element={<MainStore />} />
      </Routes>
    </Router>
  );
}

export default App;
