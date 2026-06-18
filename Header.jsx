import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Buy", to: "/listings?purpose=Sale" },
  { label: "Rent", to: "/listings?purpose=Rent" },
  { label: "Agents", to: "/agents" },
  { label: "Area Guides", to: "/area-guides" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAddProperty = () => {
    setOpen(false);
    navigate(currentUser ? "/admin" : "/signin", {
      state: { from: "/admin" },
    });
  };

  const handleSignOut = () => {
    signOut();
    setMenuOpen(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-smooth border-b ${
        scrolled ? "border-border shadow-soft" : "border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-display font-bold text-sm transition-smooth group-hover:scale-105">
              NH
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              Nex<span className="text-gradient">Home</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                    isActive
                      ? "bg-panel text-ink"
                      : "text-sub hover:text-ink hover:bg-panel"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-panel transition-smooth"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-display font-semibold text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {currentUser.name}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className={`text-sub transition-smooth ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-xl shadow-lift p-2 animate-fadeIn">
                    <div className="px-3 py-2 mb-1">
                      <p className="text-sm font-medium text-ink truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-sub truncate">
                        {currentUser.email}
                      </p>
                      {currentUser.role === "admin" && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[11px] font-medium">
                          Admin
                        </span>
                      )}
                    </div>
                    <hr className="border-border mb-1" />
                    {currentUser.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-sm text-ink hover:bg-panel transition-smooth"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-danger hover:bg-panel transition-smooth"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 text-sm font-medium text-ink hover:text-accent transition-smooth"
              >
                Sign in
              </Link>
            )}
            <button
              onClick={handleAddProperty}
              className="px-5 py-2.5 rounded-full bg-ink text-white text-sm font-medium hover:bg-accent transition-smooth shadow-soft"
            >
              Add Property
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-panel transition-smooth"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="relative w-5 h-4 block">
              <span
                className={`absolute left-0 top-0 w-5 h-0.5 bg-ink rounded transition-smooth ${
                  open ? "rotate-45 top-2" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 w-5 h-0.5 bg-ink rounded transition-smooth ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 w-5 h-0.5 bg-ink rounded transition-smooth ${
                  open ? "-rotate-45 top-2" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-smooth border-t border-border ${
          open ? "max-h-[32rem]" : "max-h-0 border-t-0"
        }`}
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-1 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-panel transition-smooth"
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-border my-2" />

          {currentUser ? (
            <>
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-ink">{currentUser.name}</p>
                <p className="text-xs text-sub">{currentUser.email}</p>
              </div>
              {currentUser.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-ink hover:bg-panel transition-smooth"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-left text-danger hover:bg-panel transition-smooth"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-left text-ink hover:bg-panel transition-smooth"
            >
              Sign in
            </Link>
          )}

          <button
            onClick={handleAddProperty}
            className="px-3 py-2.5 rounded-lg bg-ink text-white text-sm font-medium hover:bg-accent transition-smooth"
          >
            Add Property
          </button>
        </div>
      </div>
    </header>
  );
}