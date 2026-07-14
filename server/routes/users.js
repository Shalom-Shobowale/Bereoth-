import express from 'express';
import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { validateUser, validateRequest } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all registered users (Admin only)
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Admin access required
 *
 *       500:
 *         description: Server error
 */
router.get('/', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, email, role, created_at, last_login')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }

  res.json({ users });
}));

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new admin/editor account (Admin only)
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
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
 *               - role
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Admin
 *
 *               email:
 *                 type: string
 *                 example: john@example.com
 *
 *               password:
 *                 type: string
 *                 example: password123
 *
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - editor
 *                 example: editor
 *
 *     responses:
 *       201:
 *         description: User created successfully
 *
 *       400:
 *         description: User already exists
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Admin access required
 *
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken, requireAdmin, validateUser, validateRequest, asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: user, error } = await supabase
    .from('users')
    .insert({
      name,
      email,
      password: hashedPassword,
      role
    })
    .select('id, name, email, role, created_at')
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error creating user' });
  }

  res.status(201).json({
    message: 'User created successfully',
    user
  });
}));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Remove a user account (Admin only)
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: user-id
 *
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User deleted successfully
 *
 *       400:
 *         description: Cannot delete own account
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Admin access required
 *
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Prevent admin from deleting themselves
  if (userId === req.user.id) {
    return res.status(400).json({ message: 'You cannot delete your own account' });
  }

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Error deleting user' });
  }

  res.json({ message: 'User deleted successfully' });
}));

export default router;