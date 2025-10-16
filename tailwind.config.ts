// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
      colors: {
        parchment: {
          light: '#f6ecd9',
          mid: '#efe3c6',
          dark: '#e5d6b4',
          ink: '#3b2f2a',
          accent: '#b07a48',
        },
      },
      backgroundImage: {
        'parchment-texture': `
          radial-gradient(1200px 400px at 10% 15%, rgba(224,190,150,0.18), transparent 20%),
          radial-gradient(1200px 400px at 90% 85%, rgba(206,170,122,0.12), transparent 20%),
          linear-gradient(180deg, #f6ecd9 0%, #efe3c6 40%, #e5d6b4 100%)
        `,
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

