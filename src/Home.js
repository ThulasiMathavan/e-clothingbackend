import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await axios.get("https://e-clothingfrontend.onrender.com/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>All User Carts</h2>
      <button onClick={loadUsers}>Refresh</button>

      {users.length === 0 ? (
        <p>No carts yet. Please add one.</p>
      ) : (
        users.map((u) => (
          <div
            key={u.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginTop: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{u.name} — Cart ID: {u.id}</h3>
            <ul>
              {u.items.map((it, idx) => {
                const itemInfo = it.itemId
                  ? it
                  : { itemId: "unknown", quantity: 0 };
                return (
                  <li key={idx}>
                    {itemInfo.itemId} — Qty: {it.quantity}
                  </li>
                );
              })}
            </ul>
            <strong>Total: Rs.{u.total}</strong>
          </div>
        ))
      )}
    </div>
  );
}
