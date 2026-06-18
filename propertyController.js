import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import Property from "../models/Property.js";

function fileToPublicPath(file) {
  return `/uploads/properties/${file.filename}`;
}

// @desc    Get all properties with optional filters, search, sort, pagination
// @route   GET /api/properties
// @access  Public
// Supported query params: purpose, city, type, beds (min), maxPrice, q (keyword),
// sortBy (newest | price-asc | price-desc), page, limit, featured
export const getProperties = asyncHandler(async (req, res) => {
  const {
    purpose,
    city,
    type,
    beds,
    maxPrice,
    q,
    sortBy = "newest",
    page = 1,
    limit = 12,
    featured,
  } = req.query;

  const filter = {};
  if (purpose) filter.purpose = purpose;
  if (city) filter.city = city;
  if (type) filter.type = type;
  if (featured) filter.featured = featured === "true";
  if (beds) filter.beds = { $gte: Number(beds) };
  if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { city: { $regex: q, $options: "i" } },
    ];
  }

  const sortMap = {
    newest: { postedAt: -1 },
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
  };
  const sort = sortMap[sortBy] || sortMap.newest;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));
  const skip = (pageNum - 1) * limitNum;

  const [properties, total] = await Promise.all([
    Property.find(filter).sort(sort).skip(skip).limit(limitNum),
    Property.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: properties.length,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 1,
    properties,
  });
});

// @desc    Get a single property by id
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  res.json({ success: true, property });
});

// @desc    Get properties similar to a given one (same city, excluding itself)
// @route   GET /api/properties/:id/similar
// @access  Public
export const getSimilarProperties = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  const similar = await Property.find({
    _id: { $ne: property._id },
    city: property.city,
  }).limit(3);

  res.json({ success: true, properties: similar });
});

// @desc    Create a new property (with optional image uploads)
// @route   POST /api/properties
// @access  Private/Admin
export const createProperty = asyncHandler(async (req, res) => {
  const body = { ...req.body };

  // amenities may arrive as a JSON string or comma-separated string from multipart/form-data
  if (typeof body.amenities === "string") {
    try {
      body.amenities = JSON.parse(body.amenities);
    } catch {
      body.amenities = body.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);
    }
  }

  // agent may arrive as a JSON string from multipart/form-data
  if (typeof body.agent === "string") {
    try {
      body.agent = JSON.parse(body.agent);
    } catch {
      body.agent = {};
    }
  }

  const uploadedFiles = req.files?.map(fileToPublicPath) || [];

  if (uploadedFiles.length > 0) {
    body.gallery = [...(body.gallery || []), ...uploadedFiles];
    body.image = body.image || uploadedFiles[0];
  }

  const property = await Property.create({
    ...body,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, property });
});

// @desc    Update an existing property (with optional new image uploads)
// @route   PUT /api/properties/:id
// @access  Private/Admin
export const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  const body = { ...req.body };

  if (typeof body.amenities === "string") {
    try {
      body.amenities = JSON.parse(body.amenities);
    } catch {
      body.amenities = body.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);
    }
  }

  if (typeof body.agent === "string") {
    try {
      body.agent = JSON.parse(body.agent);
    } catch {
      delete body.agent;
    }
  }

  const uploadedFiles = req.files?.map(fileToPublicPath) || [];
  if (uploadedFiles.length > 0) {
    body.gallery = [...(property.gallery || []), ...uploadedFiles];
    if (!body.image) body.image = uploadedFiles[0];
  }

  Object.assign(property, body);
  const updated = await property.save();

  res.json({ success: true, property: updated });
});

// @desc    Delete a property (and its uploaded image files from disk)
// @route   DELETE /api/properties/:id
// @access  Private/Admin
export const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  // Clean up locally-uploaded files (skip external URLs like Unsplash links)
  const allImages = [property.image, ...(property.gallery || [])].filter(Boolean);
  allImages.forEach((imgPath) => {
    if (imgPath.startsWith("/uploads/")) {
      const fullPath = path.join(process.cwd(), imgPath);
      fs.unlink(fullPath, () => {}); // best-effort, ignore errors
    }
  });

  await property.deleteOne();

  res.json({ success: true, message: "Property deleted successfully" });
});

// @desc    Toggle the "featured" flag on a property
// @route   PATCH /api/properties/:id/featured
// @access  Private/Admin
export const toggleFeatured = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  property.featured = !property.featured;
  await property.save();

  res.json({ success: true, property });
});
