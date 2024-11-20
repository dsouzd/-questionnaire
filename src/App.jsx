import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import TakeExam from "./components/Exam/TakeExam";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import { UserProvider } from "./components/context/UserContext";
import Profile from "./components/Profile/Profile";
import Result from "./components/Result/Result";

const App = () => {
  return (
    <>
      <UserProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/exam" element={<TakeExam />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
