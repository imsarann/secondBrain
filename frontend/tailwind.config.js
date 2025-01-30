/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        gray: {
          100 : "#f9fbfc",
          200 : "#aeaeae",
          500 : "#8d8e92",
          600 : "#62646b"
        },
        purple :{
          600 : "#5046e4",
          500 : "#554ec1",
          200 : "#e1e6ff"
        }
    },
  },
  plugins: [],
}
}