import express from "express";
import { supabase } from "../config/supabase.js";
import { authenticateToken, requireAdminOrEditor } from "../middleware/auth.js";
import { validateInquiry, validateRequest } from "../middleware/validation.js";
import { asyncHandler } from "../middleware/errorHandler.js";

/**
 * @swagger
 * tags:
 *   name: Inquiries
 *   description: Property inquiry management endpoints
 */
const router = express.Router();

/**
 * @swagger
 * /inquiries:
 *   post:
 *     summary: Submit property inquiry
 *     description: Public endpoint for customers interested in a property
 *     tags:
 *       - Inquiries
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
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Smith
 *
 *               email:
 *                 type: string
 *                 example: john@example.com
 *
 *               phone:
 *                 type: string
 *                 example: +2348000000000
 *
 *               message:
 *                 type: string
 *                 example: I want to schedule a property inspection
 *
 *               propertyId:
 *                 type: string
 *                 example: property-id
 *               created_at:
                    type: string
                    example: 2026-01-01T12:00:00Z
 *
 *     responses:
 *       201:
 *         description: Inquiry submitted successfully
 *
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateInquiry,
  validateRequest,
  asyncHandler(async (req, res) => {
    const { name, email, phone, message, propertyId } = req.body;

    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .insert({
        name,
        email,
        phone,
        message,
        property_id: propertyId,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating inquiry:", error);
      return res.status(500).json({ message: "Error submitting inquiry" });
    }

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry,
    });
  }),
);

/**
 * @swagger
 * /inquiries:
 *   get:
 *     summary: Get all inquiries
 *     description: Retrieve customer inquiries with pagination
 *     tags:
 *       - Inquiries
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *
 *     responses:
 *       200:
 *         description: List of inquiries returned successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  authenticateToken,
  requireAdminOrEditor,
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const {
      data: inquiries,
      error,
      count,
    } = await supabase
      .from("inquiries")
      .select(
        `
      *,
      properties (
        title,
        location,
        price
      )
    `,
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching inquiries:", error);
      return res.status(500).json({ message: "Error fetching inquiries" });
    }

    res.json({
      inquiries,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit,
      },
    });
  }),
);

/**
 * @swagger
 * /inquiries/{id}:
 *   get:
 *     summary: Get single inquiry
 *     tags:
 *       - Inquiries
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
 *         example: inquiry-id
 *
 *     responses:
 *       200:
 *         description: Inquiry returned successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Inquiry not found
 */
router.get(
  "/:id",
  authenticateToken,
  requireAdminOrEditor,
  asyncHandler(async (req, res) => {
    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .select(
        `
      *,
      properties (
        title,
        location,
        price,
        images
      )
    `,
      )
      .eq("id", req.params.id)
      .single();

    if (error || !inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.json({ inquiry });
  }),
);

/**
 * @swagger
 * /inquiries/{id}:
 *   delete:
 *     summary: Delete inquiry
 *     tags:
 *       - Inquiries
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
 *         example: inquiry-id
 *
 *     responses:
 *       200:
 *         description: Inquiry deleted successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  authenticateToken,
  requireAdminOrEditor,
  asyncHandler(async (req, res) => {
    const { error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      console.error("Error deleting inquiry:", error);
      return res.status(500).json({ message: "Error deleting inquiry" });
    }

    res.json({ message: "Inquiry deleted successfully" });
  }),
);

export default router;
