import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

function DeleteCart() {
  const [id, setId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    await api.delete(`/cart/${id}`);
    alert("Cart deleted successfully!");
    setId("");
  };

  return (
    <div>
      <h2>Delete Cart</h2>
      <form onSubmit={handleDelete}>
        <input type="text" placeholder="Enter Cart ID" value={id} onChange={(e) => setId(e.target.value)} required />
        <button type="submit">Delete</button>
      </form>

      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default DeleteCart;
