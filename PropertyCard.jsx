import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPKR } from "../data/properties";

export default function PropertyCard({ property }) {
  const [saved, setSaved] = useState(false);

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((v) => !v);
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block bg-white border border-border rounded-2xl overflow-hidden card-hover"
    >
      <div className="relative h-52 overflow-hidden bg-panel">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-smooth duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
              property.purpose === "Sale"
                ? "bg-accent/90 text-white"
                : "bg-cyan/90 text-white"
            }`}
          >
            For {property.purpose}
          </span>
          {property.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-ink">
              Featured
            </span>
          )}
        </div>
        <button
          onClick={toggleSave}
          aria-label={saved ? "Remove from saved" : "Save property"}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-smooth hover:scale-110"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill={saved ? "#2F6FED" : "none"}
            stroke={saved ? "#2F6FED" : "#14161B"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <span className="font-mono font-semibold text-accent text-base">
            {formatPKR(property.price)}
            {property.purpose === "Rent" && (
              <span className="text-sub text-xs font-body"> /month</span>
            )}
          </span>
        </div>
        <h3 className="font-display font-semibold text-ink text-base mb-1 truncate">
          {property.title}
        </h3>
        <p className="text-sub text-sm mb-3 truncate">{property.location}</p>

        <div className="flex items-center gap-4 text-sm text-sub border-t border-border pt-3">
          {property.beds > 0 && (
            <span className="flex items-center gap-1.5">
              <IconBed /> {property.beds}
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1.5">
              <IconBath /> {property.baths}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <IconArea /> {property.area}
          </span>
        </div>
      </div>
    </Link>
  );
}

function IconBed() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 18h18M3 18v2M21 18v2M7 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
function IconBath() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12h16a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2a1 1 0 0 1 1-1zM7 12V6a2 2 0 0 1 3-1.73M9 4l1 1" />
    </svg>
  );
}
function IconArea() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3h7v7H3zM14 14h7v7h-7zM3 21h2M21 3v2" />
    </svg>
  );
}
