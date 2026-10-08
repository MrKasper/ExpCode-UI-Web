tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      colors: {
        bg:          'rgb(var(--c-bg) / <alpha-value>)',
        'bg-soft':   'rgb(var(--c-bg-soft) / <alpha-value>)',
        surface:     'rgb(var(--c-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--c-surface-2) / <alpha-value>)',
        line:        'rgb(var(--c-line) / <alpha-value>)',
        'line-2':    'rgb(var(--c-line-2) / <alpha-value>)',
        ink:         'rgb(var(--c-ink) / <alpha-value>)',
        'ink-2':     'rgb(var(--c-ink-2) / <alpha-value>)',
        muted:       'rgb(var(--c-muted) / <alpha-value>)',
        primary: { DEFAULT: 'rgb(var(--c-primary) / <alpha-value>)',
                   soft: 'rgb(var(--c-primary-soft) / <alpha-value>)',
                   ink:  'rgb(var(--c-primary-ink) / <alpha-value>)' },
        accent:  { DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
                   soft: 'rgb(var(--c-accent-soft) / <alpha-value>)' },
        warn:    { DEFAULT: 'rgb(var(--c-warn) / <alpha-value>)',
                   soft: 'rgb(var(--c-warn-soft) / <alpha-value>)' },
        danger:  { DEFAULT: 'rgb(var(--c-danger) / <alpha-value>)',
                   soft: 'rgb(var(--c-danger-soft) / <alpha-value>)' },
        info:    { DEFAULT: 'rgb(var(--c-info) / <alpha-value>)',
                   soft: 'rgb(var(--c-info-soft) / <alpha-value>)' },
      },
    },
  },
};