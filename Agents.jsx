import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { properties, cities } from "../data/properties";

function buildAgents() {
  const map = new Map();
  properties.forEach((p) => {
    if (!map.has(p.agent.name)) {
      map.set(p.agent.name, {
        ...p.agent,
        city: p.city,
        listings: 1,
      });
    } else {
      map.get(p.agent.name).listings += 1;
    }
  });
  return Array.from(map.values());
}

export default function Agents() {
  const agents = buildAgents();
  const [city, setCity] = useState("");

  const filtered = city ? agents.filter((a) => a.city === city) : agents;

  return (
    <PageWrapper>
      <div className="bg-panel py-14 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
            Find a verified agent
          </h1>
          <p className="text-sub max-w-xl mx-auto">
            Connect with experienced real estate agents across Pakistan&apos;s
            major cities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8 overflow-x-auto">
          <button
            onClick={() => setCity("")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-smooth ${
              city === "" ? "bg-ink text-white" : "bg-panel text-sub hover:text-ink"
            }`}
          >
            All Cities
          </button>
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-smooth ${
                city === c ? "bg-ink text-white" : "bg-panel text-sub hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <div
              key={a.name}
              className="bg-white border border-border rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-display font-semibold text-lg">
                  {a.name.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-semibold text-ink">
                    {a.name}
                  </p>
                  <p className="text-sub text-xs">{a.agency}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-sub mb-4">
                <span>{a.city}</span>
                <span>{a.listings} active listing{a.listings > 1 && "s"}</span>
              </div>
              <a
                href={`tel:${a.phone.replace(/\s/g, "")}`}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-panel text-ink text-sm font-medium hover:bg-accent hover:text-white transition-smooth"
              >
                {a.phone}
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sub py-16">
            No agents found in this city yet.
          </p>
        )}
      </div>
    </PageWrapper>
  );
}
