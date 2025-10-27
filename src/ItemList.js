import React from 'react';
export default function ItemList({ items }) {
  return (
    <div>
      {items.map(it => (
        <div key={it.id}>{it.name} - Rs.{it.price}</div>
      ))}
    </div>
  );
}