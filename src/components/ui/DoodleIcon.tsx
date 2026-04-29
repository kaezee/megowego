import React from 'react'
import { C } from '../../lib/tokens'

export type DoodleIconName = 'lightning' | 'pin' | 'flower' | 'star' | 'trophy' | 'wallet'

interface Props {
  name: DoodleIconName
  color: string
  size?: number
  style?: React.CSSProperties
}

export function DoodleIcon({ name, color, size = 28, style }: Props) {
  const sw = 2
  const swSm = 1.5

  const paths: Record<DoodleIconName, React.ReactNode> = {

    // ⚡ lightning bolt — Coming up
    lightning: (
      <path
        d="M14 2 L7 14 L13 14 L10 22 L17 10 L11 10 Z"
        fill={color}
        stroke={C.ink}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),

    // 📍 teardrop pin — Further out
    pin: (
      <>
        <path
          d="M12 2C8.5 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.5-7-7-7z"
          fill={color}
          stroke={C.ink}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9" r="2.5" fill={C.base} stroke={C.ink} strokeWidth={swSm} />
      </>
    ),

    // 🌸 four-petal flower — Suggested
    flower: (
      <>
        <ellipse cx="12" cy="6"  rx="3" ry="4.5" fill={color} stroke={C.ink} strokeWidth={swSm} />
        <ellipse cx="12" cy="18" rx="3" ry="4.5" fill={color} stroke={C.ink} strokeWidth={swSm} />
        <ellipse cx="6"  cy="12" rx="4.5" ry="3" fill={color} stroke={C.ink} strokeWidth={swSm} />
        <ellipse cx="18" cy="12" rx="4.5" ry="3" fill={color} stroke={C.ink} strokeWidth={swSm} />
        {/* yellow centre dot */}
        <circle cx="12" cy="12" r="3.8" fill={C.yellow} stroke={C.ink} strokeWidth={sw} />
      </>
    ),

    // ⭐ five-point star — Your stats
    star: (
      <polygon
        points="12,2 14.9,8.4 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 9.1,8.4"
        fill={color}
        stroke={C.ink}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),

    // 🏆 trophy cup — Achievements
    trophy: (
      <>
        {/* cup body */}
        <path
          d="M7 3h10v9a5 5 0 01-10 0V3z"
          fill={color}
          stroke={C.ink}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
        {/* left ear */}
        <path d="M7 6H4.5v2.5A2.5 2.5 0 007 11" fill="none" stroke={C.ink} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        {/* right ear */}
        <path d="M17 6h2.5v2.5A2.5 2.5 0 0117 11" fill="none" stroke={C.ink} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        {/* stem */}
        <line x1="12" y1="17.5" x2="12" y2="20.5" stroke={C.ink} strokeWidth={sw} strokeLinecap="round" />
        {/* base */}
        <line x1="8.5" y1="21" x2="15.5" y2="21" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
      </>
    ),

    // 👛 wallet — Debt overview
    wallet: (
      <>
        {/* wallet body */}
        <rect x="2" y="6" width="20" height="14" rx="3" fill={color} stroke={C.ink} strokeWidth={sw} />
        {/* coin pocket */}
        <rect x="13" y="9" width="9" height="8" rx="3" fill={C.base} stroke={C.ink} strokeWidth={swSm} />
        {/* coin slot dot */}
        <circle cx="17.5" cy="13" r="2" fill={color} stroke={C.ink} strokeWidth={swSm} />
        {/* card line */}
        <line x1="5" y1="12" x2="10" y2="12" stroke={C.ink} strokeWidth={swSm} strokeLinecap="round" />
        <line x1="5" y1="15" x2="9"  y2="15" stroke={C.ink} strokeWidth={swSm} strokeLinecap="round" />
      </>
    ),
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, ...style }}
    >
      {paths[name]}
    </svg>
  )
}
