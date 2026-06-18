import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import SearchPanel from "../components/SearchPanel";
import PropertyCard from "../components/PropertyCard";
import { properties, cities } from "../data/properties";

const categories = [
  { label: "Houses", type: "House", icon: "house" },
  { label: "Apartments", type: "Apartment", icon: "apartment" },
  { label: "Plots", type: "Plot", icon: "plot" },
  { label: "Commercial", type: "Commercial", icon: "commercial" },
  { label: "Villas", type: "Villa", icon: "villa" },
];

const stats = [
  { label: "Active Listings", value: "24,500+" },
  { label: "Verified Agents", value: "1,200+" },
  { label: "Cities Covered", value: "18" },
  { label: "Monthly Visitors", value: "3.2M" },
];

export default function Home() {
  const featured = properties.filter((p) => p.featured);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-panel to-base pt-14 pb-28 sm:pt-20 sm:pb-36">
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-floaty"
        />
        <div
          aria-hidden
          className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-cyan/10 blur-3xl animate-floaty"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-border text-xs font-medium text-sub mb-6 animate-fadeUp">
            Trusted by buyers, renters &amp; agents across Pakistan
          </span>
          <h1
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-ink mb-5 animate-fadeUp"
            style={{ animationDelay: "0.08s" }}
          >
            Find your next place,{" "}
            <span className="text-gradient">faster than ever.</span>
          </h1>
          <p
            className="text-sub text-base sm:text-lg max-w-2xl mx-auto mb-10 animate-fadeUp"
            style={{ animationDelay: "0.16s" }}
          >
            Search thousands of verified homes, plots, and commercial spaces
            with a smarter, cleaner way to browse real estate.
          </p>
        </div>

        <div
          className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeUp"
          style={{ animationDelay: "0.24s" }}
        >
          <SearchPanel />
        </div>
      </section>

      {/* Stats strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-16 relative z-10">
        <div className="bg-white border border-border rounded-2xl shadow-soft grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-6 text-center">
              <p className="font-mono font-semibold text-2xl text-ink">
                {s.value}
              </p>
              <p className="text-xs text-sub mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Browse by category
            </h2>
            <p className="text-sub text-sm mt-1">
              Pick a property type to start your search
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link
              key={c.label}
              to={`/listings?type=${c.type}`}
              className="group bg-white border border-border rounded-2xl p-6 text-center card-hover"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-panel flex items-center justify-center text-accent transition-smooth group-hover:bg-accent group-hover:text-white">
                <CategoryIcon name={c.icon} />
              </div>
              <p className="font-medium text-sm text-ink">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Featured listings
            </h2>
            <p className="text-sub text-sm mt-1">
              Hand-picked properties getting the most attention this week
            </p>
          </div>
          <Link
            to="/listings"
            className="hidden sm:inline-flex items-center gap-1.5 text-accent font-medium text-sm hover:gap-2.5 transition-smooth"
          >
            View all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <Link
          to="/listings"
          className="sm:hidden mt-6 w-full inline-flex items-center justify-center gap-1.5 text-accent font-medium text-sm border border-border rounded-full py-3"
        >
          View all listings
        </Link>
      </section>

      {/* Cities */}
      <section className="bg-panel py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-8">
            Explore popular cities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {cities.map((city) => (
              <Link
                key={city}
                to={`/listings?city=${city}`}
                className="bg-white border border-border rounded-2xl p-6 card-hover flex items-center justify-between"
              >
                <span className="font-medium text-ink">{city}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 sm:px-16 text-center">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-cyan/20"
          />
          <h2 className="relative font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Have a property to sell or rent?
          </h2>
          <p className="relative text-white/70 mb-7 max-w-xl mx-auto">
            List it on NexHome and reach thousands of active buyers and
            tenants searching every day.
          </p>
          <Link
            to="/admin"
            className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-ink font-semibold hover:bg-accent hover:text-white transition-smooth"
          >
            Add Your Property
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}

function CategoryIcon({ name }) {
  const icons = {
    house: "M3 11.5 12 4l9 7.5M5 10v10h14V10M9 20v-6h6v6",
    apartment: "M4 21V5a1 1 0 0 1 1-1h6v17M11 21V9h8a1 1 0 0 1 1 1v11M7 8h0M7 12h0M7 16h0",
    plot: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
    commercial: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h0M15 11h0",
    villa: "M3 12 12 5l9 7M5 11v10h5v-6h4v6h5V11",
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={icons[name]} />
    </svg>
  );
}
