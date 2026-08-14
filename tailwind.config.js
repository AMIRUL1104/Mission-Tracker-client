/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Mission Tracker color palette
        'bg': '#0d0f14',
        'surface': '#141720',
        'card': '#1a1e2a',
        'border-primary': '#252a38',
        'accent': '#5b6af0',
        'accent-2': '#3dd68c',
        'warn': '#f0a050',
        'danger': '#e05555',
        'purple': '#a370f0',
        'muted': '#4a5270',
        'text-primary': '#d8ddf0',
        'dim': '#8892b0',
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'sans-serif'],
        'mono': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundColor: {
        'bg': '#0d0f14',
        'surface': '#141720',
        'card': '#1a1e2a',
      },
      textColor: {
        'primary': '#d8ddf0',
        'dim': '#8892b0',
      },
      borderColor: {
        'primary': '#252a38',
      },
    },
  },
  plugins: [],
};
