import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import { Quiz } from "./components/Quiz";



function App() {
 

  return (
    <BrowserRouter>
      <div className="App">

        <NavBar/>

        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup"  element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
