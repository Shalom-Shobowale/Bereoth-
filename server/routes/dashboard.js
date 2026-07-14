import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken, requireAdminOrEditor } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics endpoints
 */
const router = express.Router();

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Retrieve property, inquiry, user statistics and recent activity
 *     tags:
 *       - Dashboard
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalProperties:
 *                       type: integer
 *                       example: 25
 *
 *                     totalInquiries:
 *                       type: integer
 *                       example: 120
 *
 *                     totalUsers:
 *                       type: integer
 *                       example: 5
 *
 *                     propertiesByStatus:
 *                       type: object
 *                       example:
 *                         Available: 15
 *                         Sold: 5
 *                         Pending: 5
 *
 *                 recentProperties:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: property-id
 *
 *                       title:
 *                         type: string
 *                         example: Luxury Apartment
 *
 *                       price:
 *                         type: number
 *                         example: 250000
 *
 *                       location:
 *                         type: string
 *                         example: Lagos
 *
 *                       status:
 *                         type: string
 *                         example: Available
 *
 *                 recentInquiries:
 *                   type: array
 *                   items:
 *                     type: object
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Admin or editor access required
 *
 *       500:
 *         description: Server error
 */
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