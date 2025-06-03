//const express= require("express");
import express from "express";
import { registerUser, loginUser } from "../controllers/auth.js";
import { protect } from "../Middlewares/auth.js";
import { createUserSchema } from "../Schemas/UserSchema.js";
import { validate } from "../Middlewares/validateZod.js";
const router = express.Router();




router.post('/Register', validate(createUserSchema), registerUser);
router.post("/login", loginUser);

//proteted route

router.get("/profile",protect,(req,res) => {
   console.log("req.user:", req.user);
    res.json({
        message: "This is a protected route",
        user: req.user // Assuming req.user is set by the auth middleware
    });
})

export default router;