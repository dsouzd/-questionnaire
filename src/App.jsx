import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import TakeExam from "./components/Exam/TakeExam";
import Registration from "./components/Registration/Registration";
import Profile from "./components/Profile/Profile";
import ExamInstructions from "./components/Exam/ExamInstructions";
import EditProfile from "./components/EditProfile/EditProfile";
import Result from "./components/Result/Result";
const App = () => {
  return (
    <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/instructions" element={<ExamInstructions />} />
            <Route path="/exam" element={<TakeExam />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/result" element={<Result />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
    </>
  );
};

export default App;
