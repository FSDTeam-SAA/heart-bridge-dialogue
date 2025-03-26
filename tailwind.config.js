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
          DEFAULT: "#224260",
          
        },
        secondary: {
          DEFAULT: "#01080E",
        },
        
      },
    },
  },
  plugins: [],
}



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       container: {
//         center: true,
//         padding: {
//           DEFAULT: "14px",
//           lg: "20px",
//         },
//         screens: {
//           sm: "100%",
//           md: "100%",
//           lg: "1170px",
//         },
//       },
//       colors: {
//         primary: {
//           DEFAULT: "#224260",
//         },
//         secondary: {
//           DEFAULT: "#01080E",
//           50: "#055891",
//           100: "#145891",
//           200: "#595757",
//         },
//       },
//     },
//   },
//   plugins: [],
// }





