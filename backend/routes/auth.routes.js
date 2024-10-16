import express from "express";
import { Router } from "express";
import User from "../models/User.model.js";
const router = Router();
router.get("/", (req, res) => {
  const user = User(req.body);
  user.save();
  console.log(user);
  res.send(user);
});

export default router;
