import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import TakeExam from "./components/Exam/TakeExam";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Register from "./Registration/Register";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/exam" element={<TakeExam />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
};

export default App;
