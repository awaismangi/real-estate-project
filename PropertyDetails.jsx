import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import PropertyCard from "../components/PropertyCard";
import { getPropertyById, properties, formatPKR } from "../data/properties";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = getPropertyById(id);
  const [activeImg, setActiveImg] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  if (!property) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-ink mb-3">
            Property not found
          </h1>
          <p className="text-sub mb-6">
            This listing may have been removed or the link is incorrect.
          </p>
          <button
            onClick={() => navigate("/listings")}
            className="px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-smooth"
          >
            Browse Listings
          </button>
        </div>
      </PageWrapper>
    );
  }

  const similar = properties
    .filter((p) => p.id !== property.id && p.city === property.city)
    .slice(0, 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setForm({ name: "", phone: "", message: "" });
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-sub mb-6">
          <Link to="/" className="hover:text-ink transition-smooth">
            Home
          </Link>
          <span>/</span>
          <Link to="/listings" className="hover:text-ink transition-smooth">
            Listings
          </Link>
          <span>/</span>
          <span className="text-ink truncate">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: gallery + details */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden bg-panel h-80 sm:h-[26rem] mb-3">
              <img
                src={property.gallery[activeImg]}
                alt={property.title}
                className="w-full h-full object-cover transition-smooth duration-500"
              />
            </div>
            {property.gallery.length > 1 && (
              <div className="flex gap-3 mb-8">
                {property.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-smooth ${
                      activeImg === i ? "border-accent" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    property.purpose === "Sale"
                      ? "bg-accent/10 text-accent"
                      : "bg-cyan/10 text-cyan"
                  }`}
                >
                  For {property.purpose}
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-1">
                  {property.title}
                </h1>
                <p className="text-sub text-sm">{property.location}</p>
              </div>
              <p className="font-mono text-2xl font-bold text-accent">
                {formatPKR(property.price)}
                {property.purpose === "Rent" && (
                  <span className="text-sub text-sm font-body"> /month</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 bg-white border border-border rounded-2xl p-5 mb-8">
              <Stat label="Bedrooms" value={property.beds || "—"} />
              <Stat label="Bathrooms" value={property.baths || "—"} />
              <Stat label="Area" value={property.area} />
            </div>

            <div className="mb-8">
              <h2 className="font-display font-semibold text-lg text-ink mb-3">
                Description
              </h2>
              <p className="text-sub leading-relaxed">{property.description}</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-lg text-ink mb-3">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1.5 rounded-full bg-panel text-sm text-ink"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: agent + contact form */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-border rounded-2xl p-5 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-display font-semibold">
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-ink text-sm">
                    {property.agent.name}
                  </p>
                  <p className="text-sub text-xs">{property.agent.agency}</p>
                </div>
              </div>
              <a
                href={`tel:${property.agent.phone.replace(/\s/g, "")}`}
                className="w-full mb-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-ink text-white text-sm font-medium hover:bg-accent transition-smooth"
              >
                Call {property.agent.phone}
              </a>
            </div>

            <div className="bg-white border border-border rounded-2xl p-5">
              <h3 className="font-display font-semibold text-ink mb-1">
                Interested in this property?
              </h3>
              <p className="text-sub text-sm mb-4">
                Send a message and the agent will get back to you shortly.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
                />
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  placeholder={`I'm interested in ${property.title}`}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth resize-none"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-smooth"
                >
                  Send Message
                </button>
                {formSent && (
                  <p className="text-sm text-success text-center animate-fadeIn">
                    Message sent. The agent will contact you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Similar listings */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-ink mb-6">
              Similar properties in {property.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center">
      <p className="font-mono font-semibold text-lg text-ink">{value}</p>
      <p className="text-xs text-sub mt-0.5">{label}</p>
    </div>
  );
}
