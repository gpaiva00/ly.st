module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f9a2a2',
        black: '#252525',
        background: '#f2f2f2',
        gray: '#7F8487'
      },
      fontFamily: {
        'regular': ['Regular', 'sans-serif'],
        'extrabold': ['ExtraBold', 'sans-serif'],
        'bold': ['Bold', 'sans-serif'],
        'medium': ['Medium', 'sans-serif'],
        'light': ['Light', 'sans-serif'],
        'semi': ['SemiBold', 'sans-serif'],
        'thin': ['Thin', 'sans-serif'],
        'black': ['Black', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
};
