//const express= require("express");
import express from "express";
import { registerUser, loginUser,getUsers } from "../controllers/auth.js";
import { protect } from "../Middlewares/auth.js";
import { createUserSchema } from "../Schemas/UserSchema.js";
import { validate } from "../Middlewares/validateZod.js";
const router = express.Router();

/**
 * @swagger
 * /auth/Register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */


/**
 * @swagger
 * /auth/User:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized - Token missing or invalid
 */


router.post('/Register', validate(createUserSchema), registerUser);

router.get('/User', getUsers);

router.post("/login", loginUser);

//proteted route not accessible without authentication

router.get("/profile",protect,(req,res) => {
   console.log("req.user:", req.user);
    res.json({
        message: "This is a protected route",
        user: req.user // Assuming req.user is set by the auth middleware
    });
})

export default router;