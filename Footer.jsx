import { Link } from "react-router-dom";
import { useState } from "react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "Careers", to: "/careers" },
      { label: "Help & Support", to: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Buy a Home", to: "/listings?purpose=Sale" },
      { label: "Rent a Home", to: "/listings?purpose=Rent" },
      { label: "Find Agents", to: "/agents" },
      { label: "Area Guides", to: "/area-guides" },
    ],
  },
  {
    title: "Popular Cities",
    links: [
      { label: "Islamabad", to: "/listings?city=Islamabad" },
      { label: "Lahore", to: "/listings?city=Lahore" },
      { label: "Karachi", to: "/listings?city=Karachi" },
      { label: "Rawalpindi", to: "/listings?city=Rawalpindi" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="bg-ink text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-display font-bold text-sm">
                NH
              </span>
              <span className="font-display text-xl font-bold text-white">
                NexHome
              </span>
            </Link>
            <p className="text-sm text-white/60 mb-5 max-w-sm">
              A modern way to search, list, and manage property across
              Pakistan. Built for buyers, renters, and agents alike.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:border-accent-light outline-none transition-smooth"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-light transition-smooth shrink-0"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-sm text-cyan-light mt-2 animate-fadeIn">
                You&apos;re subscribed. Welcome aboard.
              </p>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-display font-semibold text-sm mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-white/60 hover:text-white transition-smooth"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-white/10 my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} NexHome. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {["facebook", "instagram", "twitter", "linkedin"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-smooth"
              >
                <SocialIcon name={s} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  const paths = {
    facebook:
      "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1 0 2.1.2 2.1.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z",
    instagram:
      "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.5.5.7.3 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.3.7.4 1.4.5 2.5.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.5-.3.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.7.3-1.4.4-2.5.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.5-.5-.7-.3-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.3-.7-.4-1.4-.5-2.5C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.5.3-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.7-.3 1.4-.4 2.5-.5C8.9 2 9.3 2 12 2zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.4-1 .7-.3.3-.5.6-.7 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.4.7.7 1 .3.3.6.5 1 .7.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.4 1-.7.3-.3.5-.6.7-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.4-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1zm0 4.6a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2zm0 1.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zm4.6-3.2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z",
    twitter:
      "M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a3.7 3.7 0 0 0-6.4 3.4A10.6 10.6 0 0 1 4.8 5a3.7 3.7 0 0 0 1.2 5 3.6 3.6 0 0 1-1.7-.5 3.7 3.7 0 0 0 3 3.6 3.7 3.7 0 0 1-1.7.1 3.7 3.7 0 0 0 3.5 2.6A7.5 7.5 0 0 1 3 17.5a10.5 10.5 0 0 0 5.7 1.7c6.8 0 10.6-5.8 10.4-11a7.5 7.5 0 0 0 1.9-2.3z",
    linkedin:
      "M6.9 8.4H3.5V20h3.4V8.4zM5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM20.5 20h-3.4v-6.3c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1.9V20h-3.4s.1-10.4 0-11.6h3.4v1.6c.5-.7 1.3-1.7 3.2-1.7 2.3 0 4 1.5 4 4.7V20z",
  };
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <path d={paths[name]} />
    </svg>
  );
}
