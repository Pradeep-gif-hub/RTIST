/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rtist: {
          bg: '#08090C',
          surface: '#0F1117',
          elevated: '#161922',
          card: '#12141C',
          border: '#232838',
          borderMuted: '#1A1E2B',
          accent: '#FF5500',
          accentHover: '#FF6B1A',
          accentGlow: 'rgba(255, 85, 0, 0.25)',
          amber: '#FF9900',
          cyan: '#00E5FF',
          green: '#00FF66',
          muted: '#8A92A6',
          text: '#F0F2F8',
          textMuted: '#6E778E',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'blueprint-grid': "radial-gradient(rgba(255, 85, 0, 0.08) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        'tech-grid': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        'pcb-pattern': "radial-gradient(circle, rgba(0, 229, 255, 0.05) 10%, transparent 10%)",
      },
      boxShadow: {
        'accent-glow': '0 0 25px -5px rgba(255, 85, 0, 0.3)',
        'cyan-glow': '0 0 25px -5px rgba(0, 229, 255, 0.3)',
        'inner-tech': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}
