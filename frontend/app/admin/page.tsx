'use client';
import { useEffect, useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL;
export default function Admin() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);

  async function load() {
    const res = await fetch(`${API}/products`);
    setItems(await res.json());
  }

  async function create() {
    await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, cost, stock: 0 })
    });
    setName(''); setPrice(0); setCost(0);
    load();
  }

  useEffect(()=>{ load(); },[]);
  return (
    <main style={{padding:'24px'}}>
      <h1>Admin — Produtos</h1>
      <div style={{display:'flex', gap:8, margin:'12px 0'}}>
        <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Preço" type="number" value={price} onChange={e=>setPrice(parseFloat(e.target.value))} />
        <input placeholder="Custo" type="number" value={cost} onChange={e=>setCost(parseFloat(e.target.value))} />
        <button onClick={create}>Criar</button>
      </div>
      <ul>
        {items.map(p=> <li key={p.id}>{p.name} — R$ {Number(p.price).toFixed(2)}</li>)}
      </ul>
      <p style={{marginTop:24}}><a href="/">Voltar à Loja</a></p>
    </main>
  );
}
