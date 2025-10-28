/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage:{
        "dark-bgImage":"var(--dark-bgimage)",
        "light-bgImage":"var(--light-bgimage))"
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "font-color": "var(--font-color)",
        error: "var(--error)",
        "cardbg":"var(--cardbg)",
       
        
      },
      screens: {
        sm: "529px",
      },
    },
  },
  plugins: [],
};
