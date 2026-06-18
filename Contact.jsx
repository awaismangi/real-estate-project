import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

const offices = [
  { city: "Islamabad", address: "Plot 12, Blue Area, Islamabad", phone: "+92 51 1234567" },
  { city: "Lahore", address: "94-B MM Alam Road, Gulberg III, Lahore", phone: "+92 42 1234567" },
  { city: "Karachi", address: "Shahrah-e-Faisal, Karachi", phone: "+92 21 1234567" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message can't be empty";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4500);
    }
  };

  return (
    <PageWrapper>
      <div className="bg-panel py-14 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
            Get in touch
          </h1>
          <p className="text-sub max-w-xl mx-auto">
            Questions about a listing, partnerships, or just feedback?
            We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        {/* Form */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
          <h2 className="font-display font-semibold text-xl text-ink mb-6">
            Send us a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-sub mb-1.5 block">
                  Full name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-base outline-none text-sm transition-smooth focus:border-accent ${
                    errors.name ? "border-danger" : "border-border"
                  }`}
                  placeholder="Ali Raza"
                />
                {errors.name && (
                  <p className="text-xs text-danger mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-sub mb-1.5 block">
                  Email address
                </label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-base outline-none text-sm transition-smooth focus:border-accent ${
                    errors.email ? "border-danger" : "border-border"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-danger mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-sub mb-1.5 block">
                Subject
              </label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-base focus:border-accent outline-none text-sm transition-smooth"
              >
                <option value="">Select a topic</option>
                <option value="listing">Question about a listing</option>
                <option value="agent">Become an agent</option>
                <option value="support">Technical support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-sub mb-1.5 block">
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`w-full px-3 py-2.5 rounded-lg border bg-base outline-none text-sm transition-smooth resize-none focus:border-accent ${
                  errors.message ? "border-danger" : "border-border"
                }`}
                placeholder="How can we help?"
              />
              {errors.message && (
                <p className="text-xs text-danger mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-smooth"
            >
              Send Message
            </button>
            {sent && (
              <p className="text-sm text-success animate-fadeIn">
                Thanks — your message has been sent. We&apos;ll reply within
                one business day.
              </p>
            )}
          </form>
        </div>

        {/* Office info */}
        <div className="space-y-4">
          {offices.map((o) => (
            <div
              key={o.city}
              className="bg-white border border-border rounded-2xl p-5 card-hover"
            >
              <h3 className="font-display font-semibold text-ink mb-2">
                {o.city} Office
              </h3>
              <p className="text-sub text-sm mb-1">{o.address}</p>
              <a
                href={`tel:${o.phone.replace(/\s/g, "")}`}
                className="text-accent text-sm font-medium hover:underline"
              >
                {o.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
