import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const values = [
  {
    title: "Transparency first",
    text: "Every listing shows verified pricing and clear contact details, no hidden steps.",
  },
  {
    title: "Built for speed",
    text: "Search, filter, and compare properties in seconds, not browser tabs.",
  },
  {
    title: "Agent-friendly",
    text: "Tools that make it simple for agents to list, edit, and manage properties.",
  },
];

const team = [
  { name: "Areeba Noor", role: "Co-Founder & CEO" },
  { name: "Hamza Tariq", role: "Co-Founder & CTO" },
  { name: "Sana Iqbal", role: "Head of Operations" },
  { name: "Omar Farooq", role: "Head of Design" },
];

export default function About() {
  return (
    <PageWrapper>
      <div className="bg-panel py-16 border-b border-border text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            Real estate, simplified.
          </h1>
          <p className="text-sub">
            NexHome was built to make property search in Pakistan feel modern,
            fast, and honest — for buyers, renters, and agents alike.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white border border-border rounded-2xl p-6 card-hover"
            >
              <h3 className="font-display font-semibold text-ink mb-2">
                {v.title}
              </h3>
              <p className="text-sub text-sm">{v.text}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-ink mb-8 text-center">
          Meet the team
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
          {team.map((m) => (
            <div key={m.name} className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-display font-semibold text-lg">
                {m.name.charAt(0)}
              </div>
              <p className="font-medium text-ink text-sm">{m.name}</p>
              <p className="text-sub text-xs">{m.role}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-ink px-8 py-12 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Want to join the team?
          </h2>
          <p className="text-white/70 mb-6">
            We&apos;re always looking for people who care about good design and
            good real estate experiences.
          </p>
          <Link
            to="/careers"
            className="inline-flex px-7 py-3 rounded-full bg-white text-ink font-semibold hover:bg-accent hover:text-white transition-smooth"
          >
            View Open Roles
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
