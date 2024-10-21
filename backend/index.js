import connectToMongo from "./db.js";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
connectToMongo(); // No callback needed

const app = express();
const port = 5000;

//middleware
app.use(express.json());
//Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
