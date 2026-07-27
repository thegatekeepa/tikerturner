import tktn from "./app.js";
import pool  from "./configs/db.js";


const PORT = process.env.PORT || 9000;
const baseUrl = process.env.DB_HOST || localhost;

async function startServer() {
  try {
    await pool.query("SELECT 1");

    console.log("TikerTurner is connected to PostgreSQL");

    tktn.listen(PORT, () => {
      console.log(`TikerTurner is live on ${baseUrl}:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to PostgreSQL:", error);
    process.exit(1);
  }
}

startServer();