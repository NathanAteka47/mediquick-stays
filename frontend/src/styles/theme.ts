export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main primary
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1', // Main accent
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    // Neutral colors
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    // Semantic colors
    success: {
      50: '#f0fdf4',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    // Legacy compatibility
    accent: "#6366f1",
    muted: "#f3f4f6",
    lightText: "#f9fafb",
    darkBg: "#111827",
  },
  fonts: {
    body: "'Inter', 'Work Sans', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    heading: "'Plus Jakarta Sans', 'Red Hat Display', 'DM Sans', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  // Updated font sizes for professional appearance
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  // Updated spacing for more compact design
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    base: '1rem',     // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    container: {
      padding: '1rem',
      maxWidth: '1200px',
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  // Updated shadows for more subtle, professional appearance
  shadows: {
    xs: '0 1px 1px 0 rgb(0 0 0 / 0.02)',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 1px -1px rgb(0 0 0 / 0.03)',
    md: '0 3px 5px -1px rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.03)',
    lg: '0 8px 12px -3px rgb(0 0 0 / 0.05), 0 3px 5px -2px rgb(0 0 0 / 0.03)',
    xl: '0 12px 18px -5px rgb(0 0 0 / 0.06), 0 5px 8px -3px rgb(0 0 0 / 0.04)',
    '2xl': '0 20px 25px -8px rgb(0 0 0 / 0.08), 0 8px 10px -4px rgb(0 0 0 / 0.05)',
  },
  // Updated border radius for consistency
  borderRadius: {
    xs: '0.25rem',   // 4px
    sm: '0.375rem',  // 6px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px',
  },
  // Updated animation for smoother interactions
  animation: {
    'fade-in': 'fadeIn 0.3s ease-out',
    'slide-up': 'slideUp 0.2s ease-out',
    'bounce-subtle': 'bounceSubtle 2s infinite',
    'scale-in': 'scaleIn 0.15s ease-out',
  },
  // New: Typography scale for consistent text hierarchy
  typography: {
    h1: {
      fontSize: '1.875rem', // 30px
      fontWeight: '700',
      lineHeight: '1.2',
    },
    h2: {
      fontSize: '1.5rem',   // 24px
      fontWeight: '600',
      lineHeight: '1.3',
    },
    h3: {
      fontSize: '1.25rem',  // 20px
      fontWeight: '600',
      lineHeight: '1.4',
    },
    body: {
      fontSize: '0.875rem', // 14px
      fontWeight: '400',
      lineHeight: '1.5',
    },
    small: {
      fontSize: '0.75rem',  // 12px
      fontWeight: '400',
      lineHeight: '1.4',
    },
  },
  // New: Component-specific styles
  components: {
    button: {
      sm: {
        padding: '0.5rem 1rem',
        fontSize: '0.75rem',
      },
      md: {
        padding: '0.625rem 1.25rem',
        fontSize: '0.875rem',
      },
      lg: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
      },
    },
    input: {
      sm: {
        padding: '0.375rem 0.75rem',
        fontSize: '0.75rem',
      },
      md: {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
      },
      lg: {
        padding: '0.625rem 1.25rem',
        fontSize: '1rem',
      },
    },
    card: {
      padding: '1.25rem',
      borderRadius: '0.75rem',
    },
  }
} as const;

export type Theme = typeof theme;