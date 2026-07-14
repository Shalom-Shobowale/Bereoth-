import express from "express";
import { supabase } from "../config/supabase.js";
import { authenticateToken, requireAdminOrEditor } from "../middleware/auth.js";
import { validateProperty, validateRequest } from "../middleware/validation.js";
import { asyncHandler } from "../middleware/errorHandler.js";

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management endpoints
 */
const router = express.Router();

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     description: Retrieve properties with pagination, search and filters
 *     tags:
 *       - Properties
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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: apartment
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: Available
 *
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *           example: Lagos
 *
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           example: 100000
 *
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           example: 500000
 *
 *     responses:
 *       200:
 *         description: List of properties returned successfully
 *
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status;
    const location = req.query.location;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    const offset = (page - 1) * limit;

    let query = supabase.from("properties").select("*", { count: "exact" });

    // Apply filters
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`,
      );
    }

    if (status) {
      query = query.eq("status", status);
    }

    if (location) {
      query = query.ilike("location", `%${location}%`);
    }

    if (minPrice) {
      query = query.gte("price", minPrice);
    }

    if (maxPrice) {
      query = query.lte("price", maxPrice);
    }

    const {
      data: properties,
      error,
      count,
    } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching properties:", error);
      return res.status(500).json({ message: "Error fetching properties" });
    }

    res.json({
      properties,
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
 * /properties/{id}:
 *   get:
 *     summary: Get single property
 *     tags:
 *       - Properties
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: property-id
 *
 *     responses:
 *       200:
 *         description: Property returned successfully
 *
 *       404:
 *         description: Property not found
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { data: property, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error || !property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ property });
  }),
);

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a property
 *     tags:
 *       - Properties
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *
 *     responses:
 *       201:
 *         description: Property created successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  authenticateToken,
  requireAdminOrEditor,
  asyncHandler(async (req, res) => {
    console.log("✅ Authenticated user:", req.user);

    const {
      title,
      price,
      location,
      description,
      features,
      amenities,
      images,
      status,
      type,
      size,
      coordinates,
    } = req.body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const { data: property, error } = await supabase
      .from("properties")
      .insert({
        title,
        price: parseFloat(price),
        location,
        description,
        features: features || [],
        images: images,
        status: status || "Available",
        user_id: req.user.id,
        amenities: amenities || [],
        type,
        size,
        coordinates,
        // user_id: req.user.id,
        slug,
        created_by: req.user.id, // ✅ matches auth.uid()
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating property:", error);
      return res.status(500).json({ message: "Error creating property" });
    }

    res.status(201).json({
      message: "Property created successfully",
      property,
    });
  }),
);

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update a property
 *     tags:
 *       - Properties
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
 *         example: property-id
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *
 *     responses:
 *       200:
 *         description: Property updated successfully
 *
 *       404:
 *         description: Property not found
 *
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  authenticateToken,
  requireAdminOrEditor,
  validateProperty,
  validateRequest,
  asyncHandler(async (req, res) => {
    const {
      title,
      price,
      location,
      description,
      features,
      amenities,
      images,
      status,
      type,
      size,
      coordinates,
    } = req.body;

    // Generate new slug if title changed
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const { data: property, error } = await supabase
      .from("properties")
      .update({
        title,
        price: parseFloat(price),
        location,
        description,
        features: features || [],
        amenities: amenities || [],
        images: images || [],
        status,
        type,
        size,
        coordinates,
        slug,
        updated_at: new Date().toISOString(),
      })
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating property:", error);
      return res.status(500).json({ message: "Error updating property" });
    }

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      message: "Property updated successfully",
      property,
    });
  }),
);

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags:
 *       - Properties
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
 *         example: property-id
 *
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *
 *       404:
 *         description: Property not found
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
      .from("properties")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      console.error("Error deleting property:", error);
      return res.status(500).json({ message: "Error deleting property" });
    }

    res.json({ message: "Property deleted successfully" });
  }),
);

export default router;
