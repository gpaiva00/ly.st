module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f27171',
        black: '#252525',
        background: '#f2f2f2',
        gray: '#7F8487',
        lightGray: '#c4c4c4',
        danger: '#de3333',
      },
      fontFamily: {
        'regular': ['Regular', 'sans-serif'],
        'bold': ['Bold', 'sans-serif'],
        'medium': ['Medium', 'sans-serif'],
        'light': ['Light', 'sans-serif'],
        'thin': ['Thin', 'sans-serif'],
        'black': ['Black', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
};
