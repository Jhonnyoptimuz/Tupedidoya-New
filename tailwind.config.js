/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(48, 95%, 58%)", // Tu amarillo
        foreground: "hsl(0, 0%, 0%)",     // Tu negro
      },
    },
  },
  plugins: [],
}
