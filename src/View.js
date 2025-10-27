import React, { useState } from 'react';
import axios from 'axios';

export default function ViewCart() {
  const [id, setId] = useState('');
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/cart/${id}`);
      setCart(res.data);
    } catch {
      alert('Cart not found');
    }
  };

  return (
    <div>
      <h2>View Cart</h2>
      <input value={id} onChange={e => setId(e.target.value)} placeholder='Enter Cart ID' />
      <button onClick={fetchCart}>Fetch</button>
      {cart && <div><p>Name: {cart.name}</p><p>Total: Rs.{cart.total}</p></div>}
    </div>
  );
}