import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetails from "./pages/PropertyDetails";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Agents from "./pages/Agents";
import AreaGuides from "./pages/AreaGuides";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-base">
      <ScrollToTop />
      <Navbar />
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/area-guides" element={<AreaGuides />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
