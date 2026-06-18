import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const guides = [
  {
    city: "Islamabad",
    blurb: "Pakistan's capital, known for its green spaces, planned sectors, and proximity to Margalla Hills.",
    image: "https://images.unsplash.com/photo-1567608285969-48e4cdd2cd14?q=80&w=1200&auto=format&fit=crop",
  },
  {
    city: "Lahore",
    blurb: "A cultural hub with historic neighborhoods alongside fast-growing housing societies like DHA and Bahria Town.",
    image: "https://images.unsplash.com/photo-1602493181378-92cf9d28e1e6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    city: "Karachi",
    blurb: "Pakistan's largest city and economic hub, with coastal living options in Clifton and DHA.",
    image: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    city: "Rawalpindi",
    blurb: "A twin-city to Islamabad offering more affordable housing with strong connectivity.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function AreaGuides() {
  return (
    <PageWrapper>
      <div className="bg-panel py-14 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
            Area guides
          </h1>
          <p className="text-sub max-w-xl mx-auto">
            Get to know the cities and neighborhoods before you buy or rent.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-2 gap-6">
        {guides.map((g) => (
          <div
            key={g.city}
            className="bg-white border border-border rounded-2xl overflow-hidden card-hover"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={g.image}
                alt={g.city}
                className="w-full h-full object-cover transition-smooth duration-700 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="font-display font-semibold text-xl text-ink mb-2">
                {g.city}
              </h2>
              <p className="text-sub text-sm mb-4">{g.blurb}</p>
              <Link
                to={`/listings?city=${g.city}`}
                className="inline-flex items-center gap-1.5 text-accent font-medium text-sm hover:gap-2.5 transition-smooth"
              >
                View properties in {g.city}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
