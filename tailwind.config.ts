import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme_text_silver: "#BEBEBE",
        theme_bg_silver: "#444444",
        nav_bg:"#313131",
        theme_green:"#024016",
        light_green:"#31F645"
      }
    },
    fontFamily: {
      minecraft: ['MINECRAFT_RUS_NEW', 'sans-serif'],
      isocpeui:['isocpeui', 'sans-serif'],
      isocpeur:['isocpeur', 'sans-serif'],
    },
  },
  plugins: [],
};
export default config;
