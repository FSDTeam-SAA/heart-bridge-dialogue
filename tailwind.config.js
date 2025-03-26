/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "14px",
          lg: "20px",
        },
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1170px",
        },
      },
      colors: {
        primary: {
          DEFAULT: "#f43f5e",
          
        },
        secondary: {
          DEFAULT: "#c02351",
        },
        
      },
    },
  },
  plugins: [],
}



