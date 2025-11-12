import app from "./index.js";

const PORT = Number(process.env.PORT ?? 3001);

process.on('unhandledRejection', (err) => {
  console.error('[unhandledRejection]', err);
});
process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err);
  process.exit(1);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API listening on :${PORT}`);
});