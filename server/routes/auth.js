import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";
import { validateLogin, validateRequest } from "../middleware/validation.js";
import { authenticateToken } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/errorHandler.js";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user and return a JWT token
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1Ni...
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *
 *       401:
 *         description: Invalid credentials
 *
 *       500:
 *         description: Internal server error
 */
router.post(
  "/login",
  validateLogin,
  validateRequest,
  asyncHandler(async (req, res) => {
    console.log("🔐 Login route was hit"); // Add this!
    const { email, password } = req.body;

    // Find user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" },
    );

    // Update last login
    await supabase
      .from("users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }),
);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current logged-in user
 *     tags:
 *       - Authentication
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: User profile returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */

router.get(
  "/profile",
  authenticateToken,
  asyncHandler(async (req, res) => {
    res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        created_at: req.user.created_at,
      },
    });
  }),
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Authentication
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             example:
 *               message: Logged out successfully
 *
 *       401:
 *         description: Unauthorized
 */

router.post("/logout", authenticateToken, (req, res) => {
  res.json({ message: "Logged out successfully" });
});

export default router;
