import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddCart() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [cartId, setCartId] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axios.get('https://e-clothingfrontend.onrender.com/items').then(r => {
      const list = r.data.map(i => ({ ...i, quantity: 0 }));
      setItems(list);
    });
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, quantity: Number(quantity) } : it
      )
    );
  };

  const createCart = async () => {
    const filtered = items.filter(it => it.quantity > 0);
    if (!cartId || !name) return alert('Please enter name and cart ID');
    if (filtered.length === 0) return alert('Select at least one item');

    try {
      await axios.post('https://e-clothingfrontend.onrender.com/cart', {
        id: cartId,
        name,
        items: filtered.map(it => ({ itemId: it.id, quantity: it.quantity }))
      });
      alert('Cart added successfully!');
      setCartId('');
      setName('');
      setItems(items.map(i => ({ ...i, quantity: 0 })));
    } catch (e) {
      alert('Error adding cart');
    }
  };

  return (
    <div>
      <h2>Add Cart</h2>
      <input
        placeholder="Cart ID"
        value={cartId}
        onChange={e => setCartId(e.target.value)}
      />
      <input
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <h3>Select Items</h3>
      <ul>
        {items.map(i => (
          <li key={i.id}>
            {i.name} - Rs.{i.price}{' '}
            <input
              type="number"
              min="0"
              value={i.quantity}
              onChange={e => handleQuantityChange(i.id, e.target.value)}
              style={{ width: '60px' }}
            />
          </li>
        ))}
      </ul>

      <button onClick={createCart}>Add Cart</button>
    </div>
  );
}
