import "dotenv/config";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Property from "../models/Property.js";
import mongoose from "mongoose";

const sampleProperties = [
  {
    title: "Modern Hilltop Residence",
    purpose: "Sale",
    type: "House",
    city: "Islamabad",
    location: "DHA Defence, Islamabad",
    price: 45000000,
    beds: 5,
    baths: 6,
    area: "1 Kanal",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    agent: { name: "Sara Khan", phone: "+92 300 1234567", agency: "NexHome Realty" },
    description:
      "A light-filled contemporary home set on a quiet hilltop street, featuring an open-plan living area, a chef's kitchen, and a landscaped garden built for entertaining.",
    amenities: ["Parking", "Garden", "Security", "Backup Generator", "Gym", "Lift"],
  },
  {
    title: "Skyline 2-Bed Apartment",
    purpose: "Rent",
    type: "Apartment",
    city: "Lahore",
    location: "Gulberg III, Lahore",
    price: 120000,
    beds: 2,
    baths: 2,
    area: "1,250 sqft",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    agent: { name: "Bilal Ahmed", phone: "+92 301 9876543", agency: "Urban Spaces" },
    description:
      "Bright, recently renovated apartment on a high floor with skyline views, ducted air conditioning, and access to a rooftop terrace and gym.",
    amenities: ["Elevator", "Gym", "Rooftop Terrace", "Security", "Parking"],
  },
  {
    title: "Corner Residential Plot",
    purpose: "Sale",
    type: "Plot",
    city: "Islamabad",
    location: "Bahria Town, Islamabad",
    price: 18500000,
    beds: 0,
    baths: 0,
    area: "10 Marla",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    agent: { name: "Sara Khan", phone: "+92 300 1234567", agency: "NexHome Realty" },
    description:
      "A corner plot in a developed block with gas, electricity, and water connections ready, close to the main boulevard and parks.",
    amenities: ["Corner Plot", "Gas Connection", "Park Facing"],
  },
];

async function seed() {
  await connectDB();

  const adminName = process.env.ADMIN_NAME || "Admin";
  const adminEmail = (process.env.ADMIN_EMAIL || "admin").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log(`Admin account "${adminEmail}" already exists. Skipping creation.`);
  } else {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });
    console.log(`Default admin created -> email: "${adminEmail}", password: "${adminPassword}"`);
  }

  const propertyCount = await Property.countDocuments();
  if (propertyCount === 0) {
    const admin = await User.findOne({ email: adminEmail });
    await Property.insertMany(
      sampleProperties.map((p) => ({ ...p, createdBy: admin._id }))
    );
    console.log(`Seeded ${sampleProperties.length} sample properties.`);
  } else {
    console.log(`Properties collection already has ${propertyCount} documents. Skipping.`);
  }

  await mongoose.disconnect();
  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
