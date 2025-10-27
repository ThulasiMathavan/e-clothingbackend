import React, { useState } from 'react';
import axios from 'axios';

export default function CartDetails() {
  const [id, setId] = useState('');
  const [data, setData] = useState(null);

  const fetchCart = async () => {
    try {
      const r = await axios.get(`http://localhost:4000/cart/${id}`);
      setData(r.data);
    } catch {
      alert('Cart not found');
    }
  };

  return (
    <div>
      <input value={id} onChange={e => setId(e.target.value)} placeholder='Cart ID' />
      <button onClick={fetchCart}>Fetch</button>
      {data && <div>Total: {data.total}</div>}
    </div>
  );
}