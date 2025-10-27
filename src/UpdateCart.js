// client/src/pages/UpdateCart.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateCart() {
  const [cartId, setCartId] = useState("");
  const [cart, setCart] = useState(null);
  const [storeItems, setStoreItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // load available store items (id, name, price)
    axios
      .get("http://localhost:4000/items")
      .then((r) => setStoreItems(r.data || []))
      .catch((e) => {
        console.error("Failed to load items", e);
        setStoreItems([]);
      });
  }, []);

  const loadCart = async () => {
    setMsg("");
    setCart(null);
    const idTrim = cartId.trim();
    if (!idTrim) {
      setMsg("Please enter a Cart ID to load.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`https://e-clothingfrontend.onrender.com/cart/${encodeURIComponent(idTrim)}`);
      // Ensure items array exists and quantities are numbers
      const normalized = (res.data.items || []).map((it) => ({
        itemId: it.itemId,
        quantity: Number(it.quantity) || 0,
      }));
      setCart({ ...res.data, items: normalized });
      setMsg("");
    } catch (err) {
      console.error(err);
      const serverMsg = err?.response?.data?.error;
      setMsg(serverMsg || "Cart not found or server error.");
    } finally {
      setLoading(false);
    }
  };

  const changeQty = (itemId, qty) => {
    if (!cart) return;
    const q = Number(qty);
    if (isNaN(q) || q < 0) return;
    setCart((c) => ({
      ...c,
      items: c.items.map((it) => (it.itemId === itemId ? { ...it, quantity: q } : it)),
    }));
  };

  const removeItem = (itemId) => {
    if (!cart) return;
    setCart((c) => ({ ...c, items: c.items.filter((it) => it.itemId !== itemId) }));
  };

  const addItem = (itemId) => {
    if (!cart) return;
    if (!itemId) return;
    if (cart.items.find((it) => it.itemId === itemId)) {
      setMsg("Item already in cart. Change quantity instead.");
      return;
    }
    setCart((c) => ({ ...c, items: [...c.items, { itemId, quantity: 1 }] }));
    setMsg("");
  };

  const clientTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((sum, it) => {
      const p = storeItems.find((s) => s.id === it.itemId)?.price || 0;
      return sum + p * (Number(it.quantity) || 0);
    }, 0);
  };

  const saveChanges = async () => {
    if (!cart) {
      setMsg("Load a cart first.");
      return;
    }
    // Prepare payload: only include items with quantity > 0
    const payloadItems = cart.items
      .map((it) => ({ itemId: it.itemId, quantity: Number(it.quantity) || 0 }))
      .filter((it) => it.quantity > 0);

    if (payloadItems.length === 0) {
      // If user removed all items, ask confirm or allow empty (server removes 0-qty items)
      if (!window.confirm("This will remove all items from the cart (cart will become empty). Proceed?")) {
        return;
      }
    }

    try {
      setLoading(true);
      const res = await axios.put(`https://e-clothingfrontend.onrender.com/cart/${encodeURIComponent(cartId)}`, {
        items: payloadItems,
      });
      setCart({
        ...res.data,
        items: (res.data.items || []).map((it) => ({ itemId: it.itemId, quantity: Number(it.quantity) || 0 })),
      });
      setMsg("Cart updated successfully.");
    } catch (err) {
      console.error(err);
      const serverMsg = err?.response?.data?.error;
      setMsg(serverMsg || "Failed to update cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Cart</h2>

      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Cart ID"
          value={cartId}
          onChange={(e) => setCartId(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={loadCart} disabled={loading}>
          {loading ? "Loading..." : "Load Cart"}
        </button>
      </div>

      {msg && <div style={{ color: msg.includes("success") ? "green" : "crimson", marginBottom: 12 }}>{msg}</div>}

      {cart ? (
        <div style={{ border: "1px solid #ddd", padding: 12, maxWidth: 700 }}>
          <div style={{ marginBottom: 8 }}>
            <strong>{cart.name}</strong> — Cart ID: {cart.id}
          </div>

          <table border="1" cellPadding="6" style={{ width: "100%", marginBottom: 12 }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity (0 to remove)</th>
                <th>Line total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No items in cart
                  </td>
                </tr>
              ) : (
                cart.items.map((it) => {
                  const store = storeItems.find((s) => s.id === it.itemId) || { name: it.itemId, price: 0 };
                  const lineTotal = (Number(it.quantity) || 0) * (store.price || 0);
                  return (
                    <tr key={it.itemId}>
                      <td>{store.name}</td>
                      <td>Rs. {store.price}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={it.quantity}
                          onChange={(e) => changeQty(it.itemId, e.target.value)}
                          style={{ width: 80 }}
                        />
                      </td>
                      <td>Rs. {lineTotal}</td>
                      <td>
                        <button onClick={() => removeItem(it.itemId)}>Remove</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <div style={{ marginBottom: 12 }}>
            <strong>Client Total Preview: Rs. {clientTotal()}</strong>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ marginRight: 8 }}>Add item: </label>
            <select onChange={(e) => addItem(e.target.value)} defaultValue="">
              <option value="">-- select --</option>
              {storeItems
                .filter((s) => !cart.items.find((it) => it.itemId === s.id))
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — Rs.{s.price}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <button onClick={saveChanges} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Load a cart by entering its ID above to edit items (add, change quantity, remove).</p>
        </div>
      )}
    </div>
  );
}
