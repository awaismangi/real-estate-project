import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    agency: { type: String, default: "" },
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    purpose: {
      type: String,
      enum: ["Sale", "Rent"],
      required: true,
      default: "Sale",
    },
    type: {
      type: String,
      enum: ["House", "Apartment", "Plot", "Commercial", "Villa"],
      required: true,
      default: "House",
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    beds: { type: Number, default: 0, min: 0 },
    baths: { type: Number, default: 0, min: 0 },
    area: { type: String, default: "" },
    image: { type: String, default: "" }, // primary/cover image (URL or /uploads path)
    gallery: { type: [String], default: [] }, // additional image paths
    featured: { type: Boolean, default: false },
    agent: { type: agentSchema, default: () => ({}) },
    description: { type: String, default: "" },
    amenities: { type: [String], default: [] },
    postedAt: { type: Date, default: Date.now },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Text index to support keyword search across title/location/city
propertySchema.index({ title: "text", location: "text", city: "text" });

const Property = mongoose.model("Property", propertySchema);
export default Property;
