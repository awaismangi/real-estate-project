import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-28 text-center">
        <p className="font-mono text-sm text-accent mb-3">Error 404</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
          This page doesn&apos;t exist
        </h1>
        <p className="text-sub mb-8 max-w-md mx-auto">
          The page you&apos;re looking for may have been moved or never
          existed. Let&apos;s get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex px-7 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-smooth"
        >
          Back to Home
        </Link>
      </div>
    </PageWrapper>
  );
}
