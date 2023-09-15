/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter:['Inter','sans-serif']
      },
      colors:{
        purple:'#8284FA',
        purpleDark:'#5E60CE',
        blue:'#4EA8DE',
        blueDark:"#1E6F9F",
        gray700:'#0D0D0D',
        gray600:'#1A1A1A',
        gray500:'#262626',
        gray400:'#333333',
        gray300:'#808080',
        gray200:'#D9D9D9',
        gray100:'#F2F2F2',
        danger:'#E25858'
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        'extra-bold': '800',
        black: '900',
      }
    },
    
  },
  plugins: [],
}