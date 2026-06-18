import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full bg-ink text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        <div className="flex items-center gap-5 font-body text-white/70">
          <span className="hidden sm:inline">
            Pakistan&apos;s smartest way to find property
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="text-white/70 hover:text-white transition-smooth"
          >
            Help &amp; Support
          </Link>
          <span className="hidden sm:inline text-white/30">|</span>
          <Link
            to="/contact"
            className="hidden sm:inline text-white/70 hover:text-white transition-smooth"
          >
            Become an Agent
          </Link>
          <span className="text-white/30">|</span>
          <button className="text-white/70 hover:text-white transition-smooth">
            EN
          </button>
        </div>
      </div>
    </div>
  );
}
