import express from 'express';
import bcrypt from 'bcryptjs';
import { supabase } from '../index.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { validateUser, validateRequest } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Get all users (admin only)
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

// Create new user (admin only)
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

// Delete user (admin only)
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