import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { validateLogin, validateRequest } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Login route
router.post('/login', validateLogin, validateRequest, asyncHandler(async (req, res) => {
   console.log('🔐 Login route was hit'); // Add this!
  const { email, password } = req.body;

  // Find user by email
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Check password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  // Update last login
  await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', user.id);

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}));

// Get current user profile
router.get('/profile', authenticateToken, asyncHandler(async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      created_at: req.user.created_at
    }
  });
}));

// Logout route (client-side token removal)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;