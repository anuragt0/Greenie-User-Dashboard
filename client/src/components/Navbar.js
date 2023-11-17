// Navbar.js

import React from 'react';
import {useNavigate} from "react-router-dom"
import "../css/navbar.css"

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <nav className="navbar">
    <div className="logo">Greenie User's Dashboard</div>
    <div className="nav-buttons">
      <button onClick={()=>{navigate("/dashboard")}} className="nav-button">Dashboard</button>
      <button onClick={()=>{navigate("/create")}} className="nav-button">Register</button>
    </div>
  </nav>
  );
};

export default Navbar;
