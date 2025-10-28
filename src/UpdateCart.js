import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

function UpdateCart() {
  const [cartId, setCartId] = useState("");
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newQty, setNewQty] = useState(1);

  // predefined items with prices
  const itemsList = {
    shirt: 500,
    tshirt: 200,
    pant: 700,
    saree: 1500,
    chudidhar: 750,
  };

  // fetch cart by ID
  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${cartId}`);
      setCart(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No cart found with that ID. Try adding one first.");
      setCart(null);
    }
  };

  // change quantity of existing item
  const changeQuantity = (index, quantity) => {
    const updated = { ...cart };
    updated.items[index].quantity = Number(quantity);
    updated.items[index].price =
      updated.items[index].basePrice * Number(quantity);
    setCart(updated);
  };

  // remove item
  const removeItem = (index) => {
    const updated = { ...cart };
    updated.items.splice(index, 1);
    setCart(updated);
  };

  // add a new item
  const addItem = () => {
    if (!newItem || !itemsList[newItem]) {
      alert("Please select a valid item.");
      return;
    }
    const existing = cart.items.find((i) => i.item === newItem);
    if (existing) {
      alert("Item already exists. Try increasing quantity instead.");
      return;
    }

    const newEntry = {
      item: newItem,
      quantity: Number(newQty),
      basePrice: itemsList[newItem],
      price: itemsList[newItem] * Number(newQty),
    };

    const updated = { ...cart };
    updated.items.push(newEntry);
    setCart(updated);
    setNewItem("");
    setNewQty(1);
  };

  // save updated cart to backend
  const saveUpdates = async () => {
    try {
      await api.put(`/cart/${cartId}`, cart);
      alert("Cart updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving updates.");
    }
  };

  return (
    <div>
      <h2>Update Cart</h2>

      <label>
        <strong>Enter Cart ID:</strong>
      </label>
      <input
        type="text"
        value={cartId}
        onChange={(e) => setCartId(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <button onClick={fetchCart}>Fetch Cart</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {cart && (
        <div>
          <h3>User: {cart.name}</h3>
          <ul>
            {cart.items.map((item, index) => (
              <li key={index}>
                <strong>{item.item.toUpperCase()}</strong> — ₹{item.price} — Qty:{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => changeQuantity(index, e.target.value)}
                  style={{ width: "60px" }}
                />
                <button onClick={() => removeItem(index)}>Remove</button>
              </li>
            ))}
          </ul>

          <h4>Add New Item:</h4>
          <select
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          >
            <option value="">--Select--</option>
            {Object.keys(itemsList).map((it) => (
              <option key={it} value={it}>
                {it.toUpperCase()} - ₹{itemsList[it]}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={newQty}
            onChange={(e) => setNewQty(e.target.value)}
            style={{ width: "60px", marginLeft: "10px" }}
          />
          <button onClick={addItem}>Add Item</button>

          <br /><br />
          <button onClick={saveUpdates}>Save Cart Updates</button>
        </div>
      )}

      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default UpdateCart;
