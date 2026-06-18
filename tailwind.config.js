/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FAFBFC",
        panel: "#F1F2F5",
        panel2: "#E9EBEF",
        border: "#E1E4E9",
        ink: "#14161B",
        sub: "#6B7280",
        accent: {
          DEFAULT: "#2F6FED",
          light: "#5B8DF7",
          dark: "#1F4FC4",
        },
        cyan: {
          DEFAULT: "#0EA5A8",
          light: "#3FC4C6",
        },
        success: "#16A34A",
        danger: "#DC2626",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20,22,27,0.04), 0 8px 24px -8px rgba(20,22,27,0.06)",
        lift: "0 4px 10px rgba(20,22,27,0.06), 0 16px 32px -12px rgba(20,22,27,0.10)",
        ring: "0 0 0 1px rgba(47,111,237,0.18), 0 0 24px rgba(47,111,237,0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        fadeIn: "fadeIn 0.5s ease both",
        shimmer: "shimmer 6s linear infinite",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
