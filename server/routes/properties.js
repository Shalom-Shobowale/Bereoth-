import express from "express";
import { supabase } from "../config/supabase.js";
import { authenticateToken, requireAdminOrEditor } from "../middleware/auth.js";
import { validateProperty, validateRequest } from "../middleware/validation.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router();

// Get all properties (public route with pagination and filtering)
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
        `title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`
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
  })
);

// Get single property
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
  })
);

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
  })
);

// Update property (admin/editor only)
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
  })
);

// Delete property (admin/editor only)
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
  })
);

export default router;
