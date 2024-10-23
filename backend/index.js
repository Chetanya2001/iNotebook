import connectToMongo from "./db.js";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
//Connect Mongo function
connectToMongo(); // No callback needed
//Create app using express
const app = express();
//Set port
const port = 5000;

//middleware
app.use(express.json());
//Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
//Listen Application
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
