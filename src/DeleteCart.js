// client/src/pages/DeleteCart.js
import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteCart() {
  const [cartId, setCartId] = useState('');

  const deleteCart = async () => {
    if (!cartId.trim()) {
      alert("Please enter a Cart ID");
      return;
    }

    try {
      await axios.delete(`https://e-clothingfrontend.onrender.com/cart/${cartId}`);
      alert("Cart deleted successfully!");
      setCartId('');
    } catch (err) {
      alert(err?.response?.data?.error || "Cart not found");
    }
  };

  return (
    <div>
      <h2>Delete Cart</h2>
      <input
        type="text"
        placeholder="Enter Cart ID"
        value={cartId}
        onChange={(e) => setCartId(e.target.value)}
        style={{ marginRight: "8px" }}
      />
      <button onClick={deleteCart}>Delete</button>
    </div>
  );
}
