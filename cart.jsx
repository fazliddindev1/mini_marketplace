import React, { useEffect, useState } from "react"

export default function Cart() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("mini_cart")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    // Listen to add-item event
    function listener(e) {
      const p = e.detail
      setItems(prev => {
        const found = prev.find(i => i.id === p.id)
        if (found) {
          return prev.map(i =>
            i.id === p.id ? { ...i, qty: i.qty + 1 } : i
          )
        }
        return [...prev, { ...p, qty: 1 }]
      })
    }

    window.addEventListener("add-item", listener)
    return () => window.removeEventListener("add-item", listener)
  }, [])

  useEffect(() => {
    localStorage.setItem("mini_cart", JSON.stringify(items))
  }, [items])

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div>
      {items.length === 0 && <p>Cart is empty</p>}

      {items.map(i => (
        <div key={i.id} style={{
          border: "1px solid #ddd",
          padding: "8px",
          marginBottom: "5px",
          borderRadius: "6px"
        }}>
          <strong>{i.title}</strong><br />
          ${i.price} × {i.qty}<br />
          <button className="btn" style={{ marginTop: 5 }}
            onClick={() => removeItem(i.id)}
          >Remove</button>
        </div>
      ))}

      <hr />

      <strong>Total items:</strong> {items.reduce((s, i) => s + i.qty, 0)}<br />
      <strong>Total sum:</strong> $
      {items.reduce((s, i) => s + i.qty * i.price, 0).toFixed(2)}
    </div>
  )
}
