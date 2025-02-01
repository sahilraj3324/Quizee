import React, { useState, useEffect } from "react";
import './App.css'
import Quiz from "./page/Quiz";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";

function App() {
  

  

  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
    </>
  )
}

export default App
