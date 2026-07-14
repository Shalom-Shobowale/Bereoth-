// routes/upload.js
import express from "express";
import multer from "multer";
import { supabase } from "../config/supabase.js";
import { v4 as uuidv4 } from "uuid";
import { authenticateToken, requireAdminOrEditor } from "../middleware/auth.js";

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Image upload endpoints
 */
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory for Supabase

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload property image
 *     description: Upload an image file and receive a public URL
 *     tags:
 *       - Upload
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *        content:
            application/json:
              schema:
                $ref: '#/components/schemas/UploadResponse'
 *
 *       400:
 *         description: No file uploaded
 *
 *       500:
 *         description: Upload failed
 */
router.post(
  "/",
  authenticateToken,
  requireAdminOrEditor,
  upload.single("image"),
  async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileExt = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `properties/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from("property-images")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        return res
          .status(500)
          .json({ message: "Failed to upload image", error });
      }

      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("property-images")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Supabase getPublicUrl error:", urlError);
        return res
          .status(500)
          .json({ message: "Failed to get public URL", error: urlError });
      }

      return res.json({ imageUrl: publicUrlData.publicUrl });
    } catch (err) {
      console.error("Unexpected error during image upload:", err);
      return res
        .status(500)
        .json({ message: "Server error uploading image", error: err.message });
    }
  },
);

export default router;
