import React, { useState } from "react";

function ShoppingCart() {
  // State for cart items
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Add an item
  const addItem = () => {
    const newItem = { name: "Apple", price: 10, quantity: 1 };

    // Check if item exists
    const existingItem = cartItems.find(item => item.name === newItem.name);

    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.name === newItem.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, newItem];
    }

    setCartItems(updatedCart);

    // Update total price
    const total = updatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Remove an item
  const removeItem = name => {
    const updatedCart = cartItems.filter(item => item.name !== name);
    setCartItems(updatedCart);

    const total = updatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Shopping Cart</h1>
      <button onClick={addItem}>Add Apple</button>

      <h2>Cart Items:</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.name}>
              {item.name} - ${item.price} x {item.quantity}{" "}
              <button onClick={() => removeItem(item.name)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );
}

export default ShoppingCart;
