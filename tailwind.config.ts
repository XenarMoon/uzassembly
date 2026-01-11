import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // OFFICIAL ASSEMBLY BRAND COLORS
        // Source: Brend Qo'llanmasi (Brand Guidelines Document)
        // ═══════════════════════════════════════════════════════════════

        // PRIMARY COLORS (Asosiy ranglar)
        assembly: {
          primary: '#005E85',      // Main petrol/teal blue - PRIMARY BRAND COLOR
          secondary: '#3E9EEE',    // Bright sky blue - Secondary accent
          gray: '#9D9E9E',         // Medium gray - Supporting
          light: '#EEEEEE',        // Light gray - Backgrounds
          orange: '#F27A21',       // Orange accent - Used in highlights/CTAs
          'dark-blue': '#1A4B6E',  // Darker shade of primary
          charcoal: '#3C3C3C',     // Dark backgrounds
          slate: '#5A5A5A',        // Card backgrounds
          dark: '#2D2D2D',         // Deepest dark
        },

        // PRIMARY BLUE SPECTRUM - #005E85 is the MAIN background color
        primary: {
          50: '#E6F3F8',
          100: '#CCE7F1',
          200: '#99CFE3',
          300: '#66B7D5',
          400: '#339FC7',
          500: '#005E85',   // Base - PRIMARY BRAND COLOR (main backgrounds)
          600: '#004D6D',
          700: '#003D57',   // Darker shade for gradients
          800: '#002C40',
          900: '#001C2A',   // Darkest (use sparingly)
        },

        // SKY BLUE SPECTRUM (Secondary)
        sky: {
          50: '#EBF6FE',
          100: '#D7EDFD',
          200: '#AFDAFB',
          300: '#87C8F9',
          400: '#5FB5F7',
          500: '#3E9EEE',   // Base - SECONDARY BRAND COLOR
          600: '#327EBE',
          700: '#265F8F',
          800: '#193F5F',
          900: '#0D2030',
        },

        // ORANGE SPECTRUM (Accent)
        orange: {
          50: '#FEF3E8',
          100: '#FDE7D1',
          200: '#FBCFA3',
          300: '#F9B775',
          400: '#F79F47',
          500: '#F27A21',   // Base - ACCENT COLOR
          600: '#C2621A',
          700: '#914914',
          800: '#61310D',
          900: '#301807',
        },

        // SEMANTIC COLORS
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3E9EEE',

        // NEUTRAL PALETTE
        slate: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9D9E9E',
          600: '#757575',
          700: '#5A5A5A',
          800: '#3C3C3C',
          900: '#2D2D2D',
        },
      },
      fontFamily: {
        // Official Assembly Typography
        display: ['var(--font-bebas)', 'Oswald', 'Anton', 'sans-serif'], // Bebas Neue for headlines
        heading: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],      // DM Sans for headings
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],         // DM Sans for body
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.02em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        none: '1',
        tight: '1.1',
        snug: '1.25',
        normal: '1.5',
        relaxed: '1.625',
        loose: '1.75',
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
        '7xl': '4.5rem',     // 72px
        '8xl': '6rem',       // 96px
        '9xl': '8rem',       // 128px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient': 'gradient 15s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 94, 133, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 94, 133, 0.6)' },
        },
        pulseGlowSky: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(62, 158, 238, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(62, 158, 238, 0.6)' },
        },
        pulseGlowOrange: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(242, 122, 33, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(242, 122, 33, 0.6)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        // Official Assembly Gradients
        'primary-gradient': 'linear-gradient(135deg, #3E9EEE 0%, #005E85 100%)',
        'dark-gradient': 'linear-gradient(180deg, #2D2D2D 0%, #3C3C3C 100%)',
        'orange-gradient': 'linear-gradient(135deg, #F27A21 0%, #C2621A 100%)',
        'sky-gradient': 'linear-gradient(135deg, #5FB5F7 0%, #3E9EEE 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'hero-gradient': 'linear-gradient(135deg, #001A25 0%, #005E85 50%, #1A4B6E 100%)',
      },
      boxShadow: {
        // Official Assembly Glows
        'glow-primary': '0 0 60px rgba(0, 94, 133, 0.4)',
        'glow-sky': '0 0 60px rgba(62, 158, 238, 0.4)',
        'glow-orange': '0 0 40px rgba(242, 122, 33, 0.3)',
        'glow-white': '0 0 60px rgba(255, 255, 255, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
