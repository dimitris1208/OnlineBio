/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f19",
        fg: "#E6E8EF",
        muted: "#96A0B5",
        primary: "#7C9AFF",
        card: "rgba(255,255,255,0.04)",
        stroke: "rgba(255,255,255,0.12)"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.25)"
      },
      borderRadius: {
        xl2: "1rem",
        xl3: "1.5rem"
      }
    },
  },
  plugins: [],
}
