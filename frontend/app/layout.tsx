export const metadata = { title: 'Loja Controle', description: 'MVP Loja + Admin' };
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{fontFamily:'Inter, system-ui', margin:0}}>{children}</body>
    </html>
  );
}
