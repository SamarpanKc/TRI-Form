import tailwindcssAnimatePlugin, { animate } from "tailwindcss-animate";

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Define your custom font family directly
      },
      colors: {
        'bluee': "#001B45", // Add your custom color here
      },
    },
  },
  plugins: [tailwindcssAnimatePlugin, animate],
};
