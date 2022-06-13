module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navBar_BG: "#161B22",
        navBar_secondary: "#0D1117",
        navBar_Text: "#F0F6FC",
        navbar_hover_highlight: "#2085FF",
        sideBar_dark_primary: "#0D1117",
        sideBar_dark_secondary: "#010409",
        sideBar_dark_hover: "#21262C",
        sideBar_light_hover: "#F0F2F4",
        sideBar_light_primary: "#F0F6FC",
        sideBar_light_secondary: "#F6F8FA",
        dark_Text: "#F0F6FC",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
