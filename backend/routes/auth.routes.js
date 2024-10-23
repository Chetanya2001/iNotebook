import express from "express";
import { Router } from "express";
import User from "../models/User.model.js";
import pkg from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import checkAuth from "../middleware/middleware.js";
//Use Bcrypt for hashing password
const _bcrypt = bcrypt;
//Using Jwt to sign a token
const _jwt = jwt;
const { body, validationResult } = pkg;
const router = Router();
const JWT_secret = "secret_key";

// ROUTE 1: Create User using POST method "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("username", "Enter a Valid Username").isLength({ min: 3 }), // Validation for Username
    body("email", "Enter a Valid Email").isEmail(), //Validation for Email
    body("password", "Enter a Valid Password") //Validation for Password
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
      // Find User in User table where email id is req.body.email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      //Make a Hash_password using salt and hash function
      const salt = await _bcrypt.genSalt(10);
      const secpass = await _bcrypt.hash(req.body.password, salt);
      //Create a new user
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secpass,
      });
      //Send data to response
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
    body("email", "Enter a valid email").isEmail(), //Validation for Email
    body("password", "Password cannot be blank").exists(), //Validation for Password
  ],
  async (req, res) => {
    //Error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Acquire email and password to req.body
    const { email, password } = req.body;

    try {
      // Find user by email
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      // Compare password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      // Create JWT payload without exp in the user object
      const data = {
        user: {
          username: user.username,
        },
      };

      // Sign JWT with expiration of 1 hour (3600 seconds)
      const authToken = _jwt.sign(data, JWT_secret, { expiresIn: "1h" });

      // Send token in response
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 : GET loggedIn User Details using : POST method "/api/auth/getuser"
router.post("/getuser", checkAuth, async (req, res) => {
  try {
    // Get the username by checkAuth req
    const username = req.userData.user.username;
    //Find the user in User table by using username
    const user = await User.find({ username: username }).select("-password");
    if (!user) {
      res.status(400).json({ error: "User cannot get" });
    }
    // Send user in response
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
