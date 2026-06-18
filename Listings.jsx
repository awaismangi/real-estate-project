import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import PropertyCard from "../components/PropertyCard";
import { properties, cities, propertyTypes } from "../data/properties";

const PAGE_SIZE = 6;

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [purpose, setPurpose] = useState(searchParams.get("purpose") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setPurpose(searchParams.get("purpose") || "");
    setCity(searchParams.get("city") || "");
    setType(searchParams.get("type") || "");
    setKeyword(searchParams.get("q") || "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...properties];
    if (purpose) list = list.filter((p) => p.purpose === purpose);
    if (city) list = list.filter((p) => p.city === city);
    if (type) list = list.filter((p) => p.type === type);
    if (beds) list = list.filter((p) => p.beds >= Number(beds));
    if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(k) ||
          p.location.toLowerCase().includes(k)
      );
    }

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest")
      list.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

    return list;
  }, [purpose, city, type, beds, maxPrice, keyword, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const applyFilters = (e) => {
    e.preventDefault();
    setPage(1);
    const params = {};
    if (purpose) params.purpose = purpose;
    if (city) params.city = city;
    if (type) params.type = type;
    if (keyword) params.q = keyword;
    setSearchParams(params);
    setFiltersOpen(false);
  };

  const resetFilters = () => {
    setPurpose("");
    setCity("");
    setType("");
    setKeyword("");
    setMaxPrice("");
    setBeds("");
    setSearchParams({});
    setPage(1);
  };

  return (
    <PageWrapper>
      <div className="bg-panel py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-1">
            {purpose ? `Properties for ${purpose}` : "All Properties"}
          </h1>
          <p className="text-sub text-sm">
            {filtered.length} result{filtered.length !== 1 && "s"} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="lg:hidden flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-white font-medium text-sm"
        >
          Filters
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className={`transition-smooth ${filtersOpen ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Filters sidebar */}
        <aside
          className={`lg:block ${
            filtersOpen ? "block" : "hidden"
          } bg-white border border-border rounded-2xl p-5 h-fit lg:sticky lg:top-24`}
        >
          <form onSubmit={applyFilters} className="space-y-5">
            <div>
              <h3 className="font-display font-semibold text-sm text-ink mb-3">
                Purpose
              </h3>
              <div className="flex gap-2">
                {["", "Sale", "Rent"].map((p) => (
                  <button
                    key={p || "all"}
                    type="button"
                    onClick={() => setPurpose(p)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                      purpose === p
                        ? "bg-ink text-white"
                        : "bg-panel text-sub hover:text-ink"
                    }`}
                  >
                    {p === "" ? "All" : p === "Sale" ? "Buy" : "Rent"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-sub mb-1.5 block">
                Keyword
              </label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search title or area"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-sub mb-1.5 block">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
              >
                <option value="">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-sub mb-1.5 block">
                Property Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
              >
                <option value="">All Types</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-sub mb-1.5 block">
                Max Price (PKR)
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Any"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-sub mb-1.5 block">
                Min Bedrooms
              </label>
              <div className="flex gap-2">
                {["", "1", "2", "3", "4", "5"].map((b) => (
                  <button
                    key={b || "any"}
                    type="button"
                    onClick={() => setBeds(b)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-smooth ${
                      beds === b
                        ? "bg-accent text-white"
                        : "bg-panel text-sub hover:text-ink"
                    }`}
                  >
                    {b === "" ? "Any" : b}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-smooth"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2.5 rounded-full border border-border text-sm font-medium text-sub hover:text-ink hover:border-ink transition-smooth"
              >
                Reset
              </button>
            </div>
          </form>
        </aside>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-2 bg-white border border-border rounded-full p-1">
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-smooth ${
                  view === "grid" ? "bg-panel text-ink" : "text-sub"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-smooth ${
                  view === "list" ? "bg-panel text-ink" : "text-sub"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-full border border-border bg-white text-sm font-medium focus:border-accent outline-none transition-smooth"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {pageItems.length === 0 ? (
            <div className="text-center py-20 bg-white border border-border rounded-2xl">
              <p className="font-display text-lg font-semibold text-ink mb-2">
                No properties match these filters
              </p>
              <p className="text-sub text-sm mb-5">
                Try widening your search or resetting filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-smooth"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {pageItems.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center disabled:opacity-40 hover:border-accent transition-smooth"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-smooth ${
                    page === n
                      ? "bg-ink text-white"
                      : "border border-border text-sub hover:text-ink"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center disabled:opacity-40 hover:border-accent transition-smooth"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
