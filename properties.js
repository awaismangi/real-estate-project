// Mock property data. Replace with API calls when a backend is connected.

export const cities = ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Faisalabad"];

export const propertyTypes = ["House", "Apartment", "Plot", "Commercial", "Villa"];

export const properties = [
  {
    id: "p1",
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
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    agent: { name: "Sara Khan", phone: "+92 300 1234567", agency: "NexHome Realty" },
    description:
      "A light-filled contemporary home set on a quiet hilltop street, featuring an open-plan living area, a chef's kitchen, and a landscaped garden built for entertaining.",
    amenities: ["Parking", "Garden", "Security", "Backup Generator", "Gym", "Lift"],
    postedAt: "2026-06-02",
  },
  {
    id: "p2",
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
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    agent: { name: "Bilal Ahmed", phone: "+92 301 9876543", agency: "Urban Spaces" },
    description:
      "Bright, recently renovated apartment on a high floor with skyline views, ducted air conditioning, and access to a rooftop terrace and gym.",
    amenities: ["Elevator", "Gym", "Rooftop Terrace", "Security", "Parking"],
    postedAt: "2026-06-10",
  },
  {
    id: "p3",
    title: "Commercial Plaza Suite",
    purpose: "Sale",
    type: "Commercial",
    city: "Karachi",
    location: "Shahrah-e-Faisal, Karachi",
    price: 78000000,
    beds: 0,
    baths: 2,
    area: "3,000 sqft",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    agent: { name: "Hina Raza", phone: "+92 333 4567890", agency: "Coastal Properties" },
    description:
      "Ground-plus-one commercial suite on a major arterial road with high foot traffic, suited for retail, offices, or a flagship showroom.",
    amenities: ["Parking", "Generator", "Security", "Signage Frontage"],
    postedAt: "2026-05-28",
  },
  {
    id: "p4",
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
    postedAt: "2026-06-01",
  },
  {
    id: "p5",
    title: "Garden Villa with Pool",
    purpose: "Sale",
    type: "Villa",
    city: "Lahore",
    location: "DHA Phase 6, Lahore",
    price: 95000000,
    beds: 6,
    baths: 7,
    area: "2 Kanal",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    agent: { name: "Bilal Ahmed", phone: "+92 301 9876543", agency: "Urban Spaces" },
    description:
      "An expansive villa with a private pool, home theatre, and staff quarters, set within a gated community with round-the-clock security.",
    amenities: ["Pool", "Home Theatre", "Servant Quarters", "Security", "Garden"],
    postedAt: "2026-05-20",
  },
  {
    id: "p6",
    title: "Compact Studio Apartment",
    purpose: "Rent",
    type: "Apartment",
    city: "Rawalpindi",
    location: "Bahria Town, Rawalpindi",
    price: 55000,
    beds: 1,
    baths: 1,
    area: "650 sqft",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    agent: { name: "Hina Raza", phone: "+92 333 4567890", agency: "Coastal Properties" },
    description:
      "A cosy, efficiently laid out studio ideal for a single tenant or student, located minutes from major commercial markets.",
    amenities: ["Furnished", "Security", "Parking"],
    postedAt: "2026-06-12",
  },
  {
    id: "p7",
    title: "Family House with Lawn",
    purpose: "Sale",
    type: "House",
    city: "Faisalabad",
    location: "Susan Road, Faisalabad",
    price: 32000000,
    beds: 4,
    baths: 4,
    area: "8 Marla",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: false,
    agent: { name: "Sara Khan", phone: "+92 300 1234567", agency: "NexHome Realty" },
    description:
      "Single-storey family home with a generous front lawn, attached bathrooms in every bedroom, and a covered car porch for two vehicles.",
    amenities: ["Lawn", "Car Porch", "Storage Room"],
    postedAt: "2026-05-30",
  },
  {
    id: "p8",
    title: "Riverside Penthouse",
    purpose: "Rent",
    type: "Apartment",
    city: "Karachi",
    location: "Clifton, Karachi",
    price: 280000,
    beds: 3,
    baths: 3,
    area: "2,400 sqft",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=1200&auto=format&fit=crop",
    ],
    featured: true,
    agent: { name: "Hina Raza", phone: "+92 333 4567890", agency: "Coastal Properties" },
    description:
      "A top-floor penthouse with panoramic sea-facing balconies, a private elevator entrance, and premium fittings throughout.",
    amenities: ["Sea View", "Private Elevator", "Gym", "Pool", "Security"],
    postedAt: "2026-06-14",
  },
];

export function formatPKR(amount) {
  if (amount >= 10000000) return `PKR ${(amount / 10000000).toFixed(2)} Crore`;
  if (amount >= 100000) return `PKR ${(amount / 100000).toFixed(1)} Lakh`;
  return `PKR ${amount.toLocaleString()}`;
}

export function getPropertyById(id) {
  return properties.find((p) => p.id === id);
}
