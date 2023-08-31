import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { Quiz } from "./components/Quiz";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="dashboard/quiz/:id" element={<Quiz />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
