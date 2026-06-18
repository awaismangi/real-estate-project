import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { properties as initialProperties, formatPKR, cities, propertyTypes } from "../data/properties";

const emptyForm = {
  title: "",
  purpose: "Sale",
  type: "House",
  city: "Islamabad",
  location: "",
  price: "",
  beds: "",
  baths: "",
  area: "",
  image: "",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const [listings, setListings] = useState(initialProperties);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.price) {
      showToast("Please fill in title, location, and price.");
      return;
    }

    if (editingId) {
      setListings((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                ...form,
                price: Number(form.price),
                beds: Number(form.beds) || 0,
                baths: Number(form.baths) || 0,
              }
            : p
        )
      );
      showToast("Listing updated successfully.");
    } else {
      const newListing = {
        id: `p${Date.now()}`,
        ...form,
        price: Number(form.price),
        beds: Number(form.beds) || 0,
        baths: Number(form.baths) || 0,
        image:
          form.image ||
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          form.image ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
        ],
        featured: false,
        agent: { name: "You", phone: "+92 300 0000000", agency: "NexHome" },
        description: "No description provided yet.",
        amenities: [],
        postedAt: new Date().toISOString().slice(0, 10),
      };
      setListings((prev) => [newListing, ...prev]);
      showToast("Listing added successfully.");
    }

    setForm(emptyForm);
    setEditingId(null);
    setTab("manage");
  };

  const handleEdit = (p) => {
    setForm({
      title: p.title,
      purpose: p.purpose,
      type: p.type,
      city: p.city,
      location: p.location,
      price: p.price,
      beds: p.beds,
      baths: p.baths,
      area: p.area,
      image: p.image,
    });
    setEditingId(p.id);
    setTab("add");
  };

  const handleDelete = (id) => {
    setListings((prev) => prev.filter((p) => p.id !== id));
    showToast("Listing deleted.");
  };

  const toggleFeatured = (id) => {
    setListings((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const stats = {
    total: listings.length,
    sale: listings.filter((p) => p.purpose === "Sale").length,
    rent: listings.filter((p) => p.purpose === "Rent").length,
    featured: listings.filter((p) => p.featured).length,
  };

  return (
    <PageWrapper>
      <div className="bg-panel py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-1">
            Admin Dashboard
          </h1>
          <p className="text-sub text-sm">
            Manage property listings, view stats, and update content.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "manage", label: "Manage Listings" },
            { id: "add", label: editingId ? "Edit Listing" : "Add Listing" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                if (t.id !== "add") {
                  setEditingId(null);
                  setForm(emptyForm);
                }
              }}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
                tab === t.id
                  ? "border-accent text-ink"
                  : "border-transparent text-sub hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {toast && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-success/10 text-success text-sm font-medium animate-fadeIn">
            {toast}
          </div>
        )}

        {/* Overview */}
        {tab === "overview" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Listings" value={stats.total} />
            <StatCard label="For Sale" value={stats.sale} />
            <StatCard label="For Rent" value={stats.rent} />
            <StatCard label="Featured" value={stats.featured} />
          </div>
        )}

        {/* Manage */}
        {tab === "manage" && (
          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-panel text-left text-sub text-xs uppercase tracking-wide">
                    <th className="px-5 py-3 font-medium">Property</th>
                    <th className="px-5 py-3 font-medium">City</th>
                    <th className="px-5 py-3 font-medium">Price</th>
                    <th className="px-5 py-3 font-medium">Purpose</th>
                    <th className="px-5 py-3 font-medium">Featured</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-border hover:bg-panel/50 transition-smooth"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt=""
                            className="w-12 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium text-ink truncate max-w-[160px]">
                            {p.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sub">{p.city}</td>
                      <td className="px-5 py-3 font-mono text-ink">
                        {formatPKR(p.price)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            p.purpose === "Sale"
                              ? "bg-accent/10 text-accent"
                              : "bg-cyan/10 text-cyan"
                          }`}
                        >
                          {p.purpose}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => toggleFeatured(p.id)}
                          className={`w-10 h-5.5 rounded-full transition-smooth relative ${
                            p.featured ? "bg-accent" : "bg-panel2"
                          }`}
                          style={{ height: "22px" }}
                          aria-label="Toggle featured"
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full transition-smooth ${
                              p.featured ? "translate-x-4" : ""
                            }`}
                            style={{ width: "18px", height: "18px" }}
                          />
                        </button>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-accent text-sm font-medium hover:underline mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-danger text-sm font-medium hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {listings.length === 0 && (
                <p className="text-center text-sub py-10">
                  No listings yet. Add your first property.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Add / Edit form */}
        {tab === "add" && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-border rounded-2xl p-6 sm:p-8 max-w-3xl"
          >
            <h2 className="font-display font-semibold text-xl text-ink mb-6">
              {editingId ? "Edit Listing" : "Add New Listing"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Title" required>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input"
                  placeholder="Modern Hilltop Residence"
                />
              </Field>
              <Field label="Location" required>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="input"
                  placeholder="DHA Defence, Islamabad"
                />
              </Field>
              <Field label="Purpose">
                <select
                  value={form.purpose}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  className="input"
                >
                  <option>Sale</option>
                  <option>Rent</option>
                </select>
              </Field>
              <Field label="Type">
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="input"
                >
                  {propertyTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="City">
                <select
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="input"
                >
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Price (PKR)" required>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="input"
                  placeholder="25000000"
                />
              </Field>
              <Field label="Bedrooms">
                <input
                  type="number"
                  value={form.beds}
                  onChange={(e) => setForm({ ...form, beds: e.target.value })}
                  className="input"
                  placeholder="3"
                />
              </Field>
              <Field label="Bathrooms">
                <input
                  type="number"
                  value={form.baths}
                  onChange={(e) => setForm({ ...form, baths: e.target.value })}
                  className="input"
                  placeholder="2"
                />
              </Field>
              <Field label="Area">
                <input
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className="input"
                  placeholder="10 Marla"
                />
              </Field>
              <Field label="Image URL">
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="input"
                  placeholder="https://…"
                />
              </Field>
            </div>

            <div className="flex gap-3 mt-7">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-smooth"
              >
                {editingId ? "Save Changes" : "Add Listing"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                  setTab("manage");
                }}
                className="px-6 py-3 rounded-full border border-border text-sub font-medium hover:text-ink hover:border-ink transition-smooth"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid var(--border);
          background: var(--base);
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .input:focus {
          border-color: var(--accent);
        }
      `}</style>
    </PageWrapper>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5">
      <p className="font-mono font-bold text-3xl text-ink">{value}</p>
      <p className="text-sub text-sm mt-1">{label}</p>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-xs font-medium text-sub mb-1.5 block">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
    </div>
  );
}
