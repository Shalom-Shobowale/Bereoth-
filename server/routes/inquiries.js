import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken, requireAdminOrEditor } from '../middleware/auth.js';
import { validateInquiry, validateRequest } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Create inquiry (public route)
router.post('/', validateInquiry, validateRequest, asyncHandler(async (req, res) => {
  const { name, email, phone, message, propertyId } = req.body;

  const { data: inquiry, error } = await supabase
    .from('inquiries')
    .insert({
      name,
      email,
      phone,
      message,
      property_id: propertyId
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating inquiry:', error);
    return res.status(500).json({ message: 'Error submitting inquiry' });
  }

  res.status(201).json({
    message: 'Inquiry submitted successfully',
    inquiry
  });
}));

// Get all inquiries (admin/editor only)
router.get('/', authenticateToken, requireAdminOrEditor, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { data: inquiries, error, count } = await supabase
    .from('inquiries')
    .select(`
      *,
      properties (
        title,
        location,
        price
      )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({ message: 'Error fetching inquiries' });
  }

  res.json({
    inquiries,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      itemsPerPage: limit
    }
  });
}));

// Get single inquiry (admin/editor only)
router.get('/:id', authenticateToken, requireAdminOrEditor, asyncHandler(async (req, res) => {
  const { data: inquiry, error } = await supabase
    .from('inquiries')
    .select(`
      *,
      properties (
        title,
        location,
        price,
        images
      )
    `)
    .eq('id', req.params.id)
    .single();

  if (error || !inquiry) {
    return res.status(404).json({ message: 'Inquiry not found' });
  }

  res.json({ inquiry });
}));

// Delete inquiry (admin/editor only)
router.delete('/:id', authenticateToken, requireAdminOrEditor, asyncHandler(async (req, res) => {
  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', req.params.id);

  if (error) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({ message: 'Error deleting inquiry' });
  }

  res.json({ message: 'Inquiry deleted successfully' });
}));

export default router;