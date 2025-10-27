import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import AddCart from './AddCart';
import UpdateCart from './UpdateCart';
import DeleteCart from './DeleteCart';

export default function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Clothing Store</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/add" style={{ marginRight: "10px" }}>Add Cart</Link>
          <Link to="/update" style={{ marginRight: "10px" }}>Update Cart</Link>
          <Link to="/delete">Delete Cart</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCart />} />
          <Route path="/update" element={<UpdateCart />} />
          <Route path="/delete" element={<DeleteCart />} />
        </Routes>
      </div>
    </Router>
  );
}
