import React, { useEffect, useState } from "react";
 
import api from "./api";

function Home() {
  const [carts, setCarts] = useState([]);

  // Fetch all cart details
  const fetchCarts = async () => {
    try {
      const res = await api.get("/cart");
      setCarts(res.data);
    } catch (err) {
      console.error("Error fetching carts:", err);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
       

      <h2>🧾 All Cart Details</h2>

      {carts.length === 0 ? (
        <p>No carts found. Add some items to get started!</p>
      ) : (
        carts.map((cart) => (
          <div
            key={cart.id}
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>
              🆔 Cart ID: {cart.id} | 👤 Name: <strong>{cart.name}</strong>
            </h3>

            {cart.items.length === 0 ? (
              <p>No items in this cart.</p>
            ) : (
              <table
                border="1"
                cellPadding="5"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#ddd" }}>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.item}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              Total Amount: ₹
              {cart.items.reduce((sum, i) => sum + i.price, 0)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
