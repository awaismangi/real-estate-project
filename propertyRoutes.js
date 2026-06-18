import express from "express";
import {
  getProperties,
  getPropertyById,
  getSimilarProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  toggleFeatured,
} from "../controllers/propertyController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.get("/:id/similar", getSimilarProperties);

// Admin-only routes (require login + admin role)
router.post("/", protect, adminOnly, upload.array("images", 8), createProperty);
router.put("/:id", protect, adminOnly, upload.array("images", 8), updateProperty);
router.delete("/:id", protect, adminOnly, deleteProperty);
router.patch("/:id/featured", protect, adminOnly, toggleFeatured);

export default router;
