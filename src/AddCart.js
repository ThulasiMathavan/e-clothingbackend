import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

function AddCart() {
  const [userName, setUserName] = useState("");

  const items = [
    { name: "shirt", price: 500 },
    { name: "tshirt", price: 200 },
    { name: "pant", price: 700 },
    { name: "saree", price: 1500 },
    { name: "chudidhar", price: 750 },
  ];

  const [selectedItems, setSelectedItems] = useState({});

  const handleItemToggle = (itemName) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemName]: prev[itemName]
        ? undefined // unselect item
        : { quantity: 1 }, // select with default qty 1
    }));
  };

  const handleQuantityChange = (itemName, quantity) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemName]: { quantity: Number(quantity) },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName) {
      alert("Please enter your name.");
      return;
    }

    const selected = Object.entries(selectedItems).filter(
      ([, value]) => value !== undefined
    );

    if (selected.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    // Add each selected item to backend
    for (const [itemName, { quantity }] of selected) {
      const basePrice = items.find((i) => i.name === itemName).price;
      const totalPrice = basePrice * quantity;
      await api.post("/cart", {
        name: userName,
        item: itemName,
        quantity,
        price: totalPrice,
      });
    }

    alert("All selected items added to cart successfully!");
    setUserName("");
    setSelectedItems({});
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Add Cart</h2>

      <form onSubmit={handleSubmit}>
        <label><strong>User Name:</strong></label><br />
        <input
          type="text"
          placeholder="Enter Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br /><br />

        <h4>Select Items:</h4>
        {items.map((item) => (
          <div key={item.name}>
            <label>
              <input
                type="checkbox"
                checked={!!selectedItems[item.name]}
                onChange={() => handleItemToggle(item.name)}
              />
              {item.name.toUpperCase()} - ₹{item.price}
            </label>

            {selectedItems[item.name] && (
              <>
                <input
                  type="number"
                  min="1"
                  value={selectedItems[item.name]?.quantity || 1}
                  onChange={(e) =>
                    handleQuantityChange(item.name, e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                />
                <label> Qty</label>
              </>
            )}
          </div>
        ))}

        <br />
        <button type="submit">Add Selected Items to Cart</button>
      </form>

      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default AddCart;
