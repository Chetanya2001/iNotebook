import connectToMongo from "./db.js";
import express from "express";
connectToMongo(); // No callback needed

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
