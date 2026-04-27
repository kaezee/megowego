// Mego Wego design tokens — always use these, never raw values

export const C = {
  base:     '#FAFAF0',
  ink:      '#0A0A0A',
  inkAlt:   '#1A1916',
  white:    '#FFFFFF',

  grey100:  '#F0EEE8',
  grey200:  '#E0DDD6',
  grey400:  '#A8A49C',
  grey600:  '#6B6760',

  pink:     '#FF5C9A',
  yellow:   '#FFD93D',
  green:    '#4DDB7A',
  blue:     '#3D7FFF',
  orange:   '#FF7043',
  purple:   '#7C4DFF',

  error:    '#FF3B5C',
} as const;

export const F = {
  display: "'Fredoka', system-ui, sans-serif",
  body:    "'Plus Jakarta Sans', system-ui, sans-serif",
  mono:    "'Space Mono', ui-monospace, monospace",
} as const;

export const S = {
  shadow:   '4px 4px 0 0 #0A0A0A',
  shadowSm: '2px 2px 0 0 #0A0A0A',
  shadowLg: '6px 6px 0 0 #0A0A0A',
  border:   '2px solid #0A0A0A',
  borderSoft: '2px solid #E0DDD6',
} as const;

// Returns white text on dark accents, black on light ones
export const fgFor = (bg: string): string =>
  ([C.purple, C.blue, C.ink, C.inkAlt] as string[]).includes(bg) ? C.base : C.ink;
