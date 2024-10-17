import express from "express";
import { Router } from "express";
import User from "../models/User.model.js";
import pkg from "express-validator";
import bcrypt from "bcryptjs";
const _bcrypt = bcrypt;
const { body, validationResult } = pkg;
const router = Router();
router.post(
  "/createuser",
  [
    body("username", "Enter a Valid Username").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Enter a Valid Password")
      .isLength({ min: 5 })
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .matches(/[^a-zA-Z0-9]/)
      .withMessage("Password must contain a special character"),
  ],
  async (req, res) => {
    //Error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      //Using bcrypt
      const salt = await _bcrypt.genSalt(10);
      const secpass = await _bcrypt.hash(req.body.password, salt);
      //Create a new user
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secpass,
      });
      res.status(200).json("User created");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
