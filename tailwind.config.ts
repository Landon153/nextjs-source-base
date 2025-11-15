import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

import animate from './lib/tailwindcss/plugins/animate';
import base from './lib/tailwindcss/plugins/base';
import perspective from './lib/tailwindcss/plugins/perspective';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  plugins: [animate, perspective, base],
  theme: {
    extend: {
      animation: {
        'collapsible-open': 'collapsible-open 200ms ease',
        'collapsible-closed': 'collapsible-closed 200ms ease',
        'caret-blink': 'caret-blink 1000ms ease infinite',
      },
      borderColor: {
        DEFAULT: 'hsl(var(--border) / <alpha-value>)',
      },
      borderRadius: {
        sm: 'calc(var(--radius, 0.25rem) - 0.125rem)', // 2px
        DEFAULT: 'var(--radius, 0.25rem)', // 4px
        md: 'calc(var(--radius, 0.25rem) + 0.125rem)', // 6px
        lg: 'calc(var(--radius, 0.25rem) + 0.25rem)', // 8px
        xl: 'calc(var(--radius, 0.25rem) + 0.5rem)', // 12px
        '2xl': 'calc(var(--radius, 0.25rem) + 0.75rem)', // 16px
        '3xl': 'calc(var(--radius, 0.25rem) + 1.25rem)', // 24px
      },
      boxShadow: {
        system: '0px 0px 32px 0px rgba(136, 152, 170, 0.15)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        background: 'hsl(var(--background) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        info: {
          DEFAULT: 'hsl(var(--info) / <alpha-value>)',
          foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
        },
        input: 'hsl(var(--input) / <alpha-value>)',
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        ring: 'hsl(var(--ring) / <alpha-value>)',
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: `var(--font-sans, ${fontFamily.sans.join(', ')})`,
      },
      keyframes: {
        'collapsible-open': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-collapsible-content-height)',
          },
        },
        'collapsible-closed': {
          from: {
            height: 'var(--radix-collapsible-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'caret-blink': {
          '0%,70%,100%': {
            opacity: '1',
          },
          '20%,50%': {
            opacity: '0',
          },
        },
      },
      maxWidth: {
        150: '37.5rem', // 600px
      },
      outlineColor: {
        DEFAULT: 'hsl(var(--ring) / <alpha-value>)',
      },
      ringColor: {
        DEFAULT: 'hsl(var(--ring) / <alpha-value>)',
      },
      ringOffsetColor: {
        DEFAULT: 'hsl(var(--background) / <alpha-value>)',
      },
      spacing: {
        0.75: '0.1875rem', // 3px
        1.25: '0.3125rem', // 5px
        1.75: '0.4375rem', // 7px
        2.25: '0.5625rem', // 9px
        2.75: '0.6875rem', // 11px
        3.25: '0.8125rem', // 13px
        4.5: '1.125rem', // 18px
        7.5: '1.875rem', // 30px
        8.25: '2.0625rem', // 33px
        11: '2.75rem', // 44px
        11.25: '2.8125rem', // 45px
        11.5: '2.875rem', // 46px
        13: '3.25rem', // 52px
        13.75: '3.4375rem', // 55px
        15: '3.75rem', // 60px
        15.5: '3.875rem', // 62px
        18: '4.5rem', // 72px
        24.5: '6.125rem', // 98px
        50: '12.5rem', // 200px
        87.5: '21.875rem', // 350px
        105: '26.25rem', // 420px
        108.5: '27.125rem', // 434px
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
};

export default config;
