/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      small: { max: "1200px" },
    },
    extend: {
      gridTemplateRows: {
        grid: "repeat(10, 3rem)",
      },
      gridTemplateColumns: {
        grid: "repeat(10, 3rem)",
      },
      backgroundImage: {
        main: "linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('../src/assets/shipIcons/background.jpg')",
        startButton: "linear-gradient(270deg, #3053FF, #75ACFF)",
        startBorder: "#3053FF",
        results:
          "linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('../src/assets/shipIcons/results.jpg')",
      },
    },
  },
  plugins: [],
};

// startButton: "linear-gradient(deg, #3053FF, #75ACFF)",
// "radial-gradient( #5873F9, #3053FF,#3053FF) "
