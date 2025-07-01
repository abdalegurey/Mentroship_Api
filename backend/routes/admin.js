//const express= require("express");
import express from "express";
import { registerUser, loginUser } from "../controllers/auth.js";
import { protect } from "../Middlewares/auth.js";
import { authorize } from "../Middlewares/authorize.js";
const router = express.Router();





router.get('/dashboard', protect, authorize('admin'), (req, res) => {
  res.json({
    user: req.user
  });
});



export default router;