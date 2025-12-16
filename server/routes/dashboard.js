import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken, requireAdminOrEditor } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Get dashboard statistics (admin/editor only)
router.get('/stats', authenticateToken, requireAdminOrEditor, asyncHandler(async (req, res) => {
  // Get total properties
  const { count: totalProperties } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true });

  // Get properties by status
  const { data: propertiesByStatus } = await supabase
    .from('properties')
    .select('status')
    .then(({ data }) => {
      const statusCounts = {};
      data?.forEach(property => {
        statusCounts[property.status] = (statusCounts[property.status] || 0) + 1;
      });
      return { data: statusCounts };
    });

  // Get total inquiries
  const { count: totalInquiries } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true });

  // Get total users (admin only)
  let totalUsers = null;
  if (req.user.role === 'admin') {
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    totalUsers = count;
  }

  // Get recent properties
  const { data: recentProperties } = await supabase
    .from('properties')
    .select('id, title, price, location, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  // Get recent inquiries
  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select(`
      id, name, email, created_at,
      properties (title, location)
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  res.json({
    stats: {
      totalProperties: totalProperties || 0,
      totalInquiries: totalInquiries || 0,
      totalUsers,
      propertiesByStatus: propertiesByStatus || {}
    },
    recentProperties: recentProperties || [],
    recentInquiries: recentInquiries || []
  });
}));

export default router;