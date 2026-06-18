import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities, propertyTypes } from "../data/properties";

export default function SearchPanel({ compact = false }) {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("Sale");
  const [city, setCity] = useState("Islamabad");
  const [type, setType] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("purpose", purpose);
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (keyword) params.set("q", keyword);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div
      className={`glow-ring rounded-2xl bg-white/95 backdrop-blur-md shadow-lift ${
        compact ? "p-4" : "p-5 sm:p-6"
      }`}
    >
      {/* Purpose tabs */}
      <div className="flex gap-2 mb-4">
        {["Sale", "Rent"].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPurpose(p)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-smooth ${
              purpose === p
                ? "bg-ink text-white"
                : "bg-panel text-sub hover:text-ink"
            }`}
          >
            {p === "Sale" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
      >
        <div className="lg:col-span-2 flex flex-col">
          <label className="text-xs text-sub mb-1 font-medium">
            Keyword / Location
          </label>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. DHA Defence, Gulberg…"
            className="px-4 py-2.5 rounded-xl border border-border bg-base focus:border-accent outline-none transition-smooth text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-sub mb-1 font-medium">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-base focus:border-accent outline-none transition-smooth text-sm"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-sub mb-1 font-medium">
            Property Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-base focus:border-accent outline-none transition-smooth text-sm"
          >
            <option value="">All Types</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-sub mb-1 font-medium opacity-0 sm:opacity-100">
            Search
          </label>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent to-cyan text-white text-sm font-semibold hover:opacity-90 transition-smooth shadow-soft flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
