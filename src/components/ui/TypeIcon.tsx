// Flat SVG icons for outing types — clapperboard / fork-knife / football / hand-wave / spark

interface Props { type: string; size?: number; color?: string }

export function TypeIcon({ type, size = 16, color = '#0A0A0A' }: Props) {
  const s = size
  switch (type) {
    case 'movies':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <rect x="3" y="8" width="18" height="13" rx="2" fill={color}/>
          <rect x="3" y="5" width="18" height="4" rx="1" fill={color}/>
          <line x1="3" y1="9" x2="21" y2="9" stroke="white" strokeWidth="1.5"/>
          <path d="M7.5 5.5L6 9M12.5 5.5L11 9M17.5 5.5L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'food':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M8 2v6c0 1.7 1.3 3 3 3v11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 2v5M10 2v5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 2c2.5 1.5 4 4 4 7 0 2-2 3-4 3V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'sport':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="9" fill={color}/>
          <path d="M12 3.5C12 3.5 14 6 14 9.5S12 13 12 13s-2-2-2-5.5S12 3.5 12 3.5z" fill="white" opacity="0.45"/>
          <path d="M3.5 12C3.5 12 6 10 9.5 10s4 2 4 2-1.5 2-4 2S3.5 12 3.5 12z" fill="white" opacity="0.45"/>
          <path d="M20.5 12C20.5 12 18 14 14.5 14s-4-2-4-2 1.5-2 4-2 5.5 2 5.5 2z" fill="white" opacity="0.45"/>
          <path d="M12 20.5C12 20.5 10 18 10 14.5s2-4 2-4 2 1.5 2 4-2 6-2 6z" fill="white" opacity="0.45"/>
        </svg>
      )
    case 'hangout':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M6 10.5V6a1.5 1.5 0 0 1 3 0v4.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 5V4.5a1.5 1.5 0 0 1 3 0V10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 5.5V5a1.5 1.5 0 0 1 3 0v5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 10.5c0 0-1.5 1-1.5 3.5C4.5 17 7.5 20 10 21c2 .7 5 0 6.5-3 .8-1.5.8-3 .8-3V9a1.5 1.5 0 0 0-3 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    default: // 'other'
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M5.6 18.4l2.5-2.5M15.9 8.1l2.5-2.5" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2.5" fill={color}/>
        </svg>
      )
  }
}
