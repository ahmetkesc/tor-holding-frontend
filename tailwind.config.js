/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        animationFirst: "home 300ms ease-in-out",
        animationSecond: "home 400ms ease-in-out",
        animationThird: "home 500ms ease-in-out",
      },
      keyframes: {
        home: {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "50%": { opacity: 0, transform: "translateX(-10px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
      },
      colors: {
        tor: { color: "#1d59bc" },
      },
      borderColor: {
        tor: { color: "#1d59bc" },
      },
    },
    fontFamily: {
      comfortaa: ["Comfortaa", "cursive"],
      lato: ["Lato", "cursive"],
      roboto: ["Roboto", "cursive"],
      robotoMono: ["Roboto Mono", "cursive"],
    },
  },
  plugins: [],
};
