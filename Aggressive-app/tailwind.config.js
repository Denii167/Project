/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        thinFont: "Kalam",
        sinisFont: "Creepster",
        menuFont: "Gloria Hallelujah",
        canetaFont: "Yatra One",
        gunsFont: "Orbitron",
        emendFont: "Marck Script",
        styleFont: "Special Elite",
        normalFont: "Montserrat",

        /*kalamFont: "Kalam" BOA ARRENDODADA ,
        markFont: "Marck Script" EMENDADA ,
        montFont: "Montserrat" NORMAL ,
        orbFont: "Orbitron" GUNS ,
        epoirFont: "Poiret One" FINA ,
        specFont: "Special Elite" STYLE ,
        yatraFont: "Yatra One", CANETA */
      },
    },
  },
  plugins: [],
};
