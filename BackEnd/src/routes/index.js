const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const friendRoutes = require("./friendRoutes");

const router = express.Router();

// Auth Routes
router.use("/auth", authRoutes);

// User Routes
router.use("/user", userRoutes);

// Friends Routes
router.use("/friends", friendRoutes)

module.exports = router;