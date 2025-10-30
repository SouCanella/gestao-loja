async function getProducts() {
  const url = process.env.NEXT_PUBLIC_API_URL + '/products';
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  return (
    <main style={{padding:'24px'}}>
      <h1>Loja — Catálogo</h1>
      <ul>
        {products.map((p:any)=> (
          <li key={p.id}>{p.name} — R$ {Number(p.price).toFixed(2)}</li>
        ))}
      </ul>
      <p style={{marginTop:24}}><a href="/admin">Ir para Admin</a></p>
    </main>
  );
}
