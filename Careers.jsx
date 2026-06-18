import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

const roles = [
  { title: "Frontend Engineer", dept: "Engineering", location: "Lahore (Hybrid)" },
  { title: "Real Estate Data Analyst", dept: "Data", location: "Islamabad" },
  { title: "Customer Success Associate", dept: "Support", location: "Karachi" },
  { title: "Field Verification Agent", dept: "Operations", location: "Multiple Cities" },
];

export default function Careers() {
  const [applied, setApplied] = useState(null);

  const handleApply = (title) => {
    setApplied(title);
    setTimeout(() => setApplied(null), 3500);
  };

  return (
    <PageWrapper>
      <div className="bg-panel py-14 border-b border-border text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
            Careers at NexHome
          </h1>
          <p className="text-sub">
            Help us build the most trusted property platform in Pakistan.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-4">
          {roles.map((r) => (
            <div
              key={r.title}
              className="bg-white border border-border rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 card-hover"
            >
              <div>
                <h3 className="font-display font-semibold text-ink">
                  {r.title}
                </h3>
                <p className="text-sub text-sm">
                  {r.dept} · {r.location}
                </p>
              </div>
              <button
                onClick={() => handleApply(r.title)}
                className="px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-smooth"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {applied && (
          <div className="mt-6 px-4 py-3 rounded-xl bg-success/10 text-success text-sm font-medium animate-fadeIn">
            Application received for {applied}. We&apos;ll be in touch.
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
