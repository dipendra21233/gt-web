import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        disableBgOrange: '#ffbe9d',
        darkGray: '#252525',
        bgPrimary: '#F7F5F2',
        bgGrey: '#85878a',
        primary_cream: '#F9F4ED',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        grey1: '#85878a',
        primaryGreen: '#023E1A',
      },
      padding: {
        '10': '10px',
        '15': '15px',
        '11': '11px',
        '20': '20px',
        '30': '30px',
        '50': '50px',
        '64px': '64px',
        '80': '80px',
        '44': '44px',
        '28': '28px',
      },
      spacing: {
        '30': '30px',
        '24': '24px',
        '10': '10px',
        '14': '14px',
        '20': '20px',
        '4px': '4px',
        '100': '100px',
        '6': '6px',
        '8': '8px',
        '62': '62px',
        '30%': '30%',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        loadVertical: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
      },
      margin: {
        '80': '80px',
        '40': '40px',
        '45': '45px',
        '30': '30px',
        '10': '10px',
        '20': '20px',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        progress: 'loadVertical 9s forwards',
      },
      gap: {
        '14': '14px',
        '20': '20px',
      },
      height: {
        '34': '34px',
      },
      width: {
        '390': 'auto',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '32': '32px',
        '36': '36px',
        '40': '40px',
        '48': '48px',
        '56': '56px',
        '64': '64px',
        '80': '80px',
        '96': '96px',
        '100': '100px',
        '128': '128px',
        '144': '144px',
        '160': '160px',
      },
    },
  },
  plugins: [animatePlugin],
}

export default config
