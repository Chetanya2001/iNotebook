import express from "express";
import { Router } from "express";
import User from "../models/User.model.js";
import pkg from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const _bcrypt = bcrypt;
const _jwt = jwt;
const { body, validationResult } = pkg;
const router = Router();
const JWT_secret = "secret_key";
// ROUTE 1: Create User using POST method "/api/auth/createuser"
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
      const data = {
        user: {
          usernmae: user.username,
        },
      };

      res.status(200).json("User created");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE 2 : Create User Login using POST method "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          username: user.username,
        },
      };
      const authToken = jwt.sign(data, JWT_secret);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE 3 : GET loggedIn User Details using : POST method "/api/auth/getuser"
router.post("/getuser", (req, res) => {
  try {
    authtoken = req.body;
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
