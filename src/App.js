import React from "react";
import {  Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import AddCart from "./AddCart";
import UpdateCart from "./UpdateCart";
import DeleteCart from "./DeleteCart";

function App() {
  return (
    
      <div>
        <h1>Clothing Management</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/add">Add Cart</Link> |{" "}
          <Link to="/update">Update Cart</Link> |{" "}
          <Link to="/delete">Delete Cart</Link>
        </nav>
        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCart />} />
          <Route path="/update" element={<UpdateCart />} />
          <Route path="/delete" element={<DeleteCart />} />
        </Routes>
      </div>
  
  );
}

export default App;
