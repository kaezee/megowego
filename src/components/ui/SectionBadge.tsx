import { C } from '../../lib/tokens'

type IconKey = '⚡' | '🗺️' | '🌸' | '🎯' | '🏆' | '🪙'

interface Props {
  icon: IconKey | string
  color?: string
  size?: number
}

// Lightning — wide, squat bolt
function LightningPath({ color }: { color: string }) {
  return (
    <path
      d="M16 2 L4 14 L12 14 L8 22 L20 10 L12 10 Z"
      fill={color}
      stroke={C.ink}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

// Map pin — wide teardrop
function PinPath({ color }: { color: string }) {
  return (
    <>
      <path
        d="M12 2C7.5 2 3.5 5.5 3.5 10c0 6 8.5 14 8.5 14s8.5-8 8.5-14C20.5 5.5 16.5 2 12 2z"
        fill={color}
        stroke={C.ink}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" fill={C.base} stroke={C.ink} strokeWidth={1.5} />
    </>
  )
}

// Flower — wide oval petals
function FlowerPath({ color }: { color: string }) {
  return (
    <>
      <ellipse cx="12" cy="5.5" rx="3.5" ry="5"   fill={color} stroke={C.ink} strokeWidth={1.5} />
      <ellipse cx="12" cy="18.5" rx="3.5" ry="5"  fill={color} stroke={C.ink} strokeWidth={1.5} />
      <ellipse cx="5.5" cy="12" rx="5" ry="3.5"   fill={color} stroke={C.ink} strokeWidth={1.5} />
      <ellipse cx="18.5" cy="12" rx="5" ry="3.5"  fill={color} stroke={C.ink} strokeWidth={1.5} />
      <circle cx="12" cy="12" r="4" fill={C.yellow} stroke={C.ink} strokeWidth={1.5} />
    </>
  )
}

// Star — fat arms (small inner radius = wide arms)
function StarPath({ color }: { color: string }) {
  return (
    <polygon
      points="12,2 14.4,8.8 21.5,8.9 15.8,13.2 17.9,20.1 12,16 6.1,20.1 8.2,13.2 2.5,8.9 9.6,8.8"
      fill={color}
      stroke={C.ink}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

// Trophy — wide cup
function TrophyPath({ color }: { color: string }) {
  return (
    <>
      <path
        d="M5 3h14v9a7 7 0 01-14 0V3z"
        fill={color}
        stroke={C.ink}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path d="M5 6H2.5v3A2.5 2.5 0 005 11.5"  fill="none" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6h2.5v3A2.5 2.5 0 0119 11.5" fill="none" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="18" x2="12" y2="21" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" />
      <line x1="8"  y1="21" x2="16" y2="21" stroke={C.ink} strokeWidth={2}   strokeLinecap="round" />
    </>
  )
}

// Wallet — wide rectangle body
function WalletPath({ color }: { color: string }) {
  return (
    <>
      <rect x="1.5" y="6" width="21" height="14" rx="3" fill={color} stroke={C.ink} strokeWidth={1.5} />
      <rect x="13"  y="9" width="10" height="8"  rx="3" fill={C.base} stroke={C.ink} strokeWidth={1.5} />
      <circle cx="18" cy="13" r="2.2" fill={color} stroke={C.ink} strokeWidth={1.5} />
      <line x1="4.5" y1="12" x2="10" y2="12" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" />
      <line x1="4.5" y1="15" x2="9"  y2="15" stroke={C.ink} strokeWidth={1.5} strokeLinecap="round" />
    </>
  )
}

export function SectionBadge({ icon, color = C.yellow, size = 32 }: Props) {
  const renderIcon = () => {
    switch (icon) {
      case '⚡':  return <LightningPath color={color} />
      case '🗺️': return <PinPath color={color} />
      case '🌸':  return <FlowerPath color={color} />
      case '🎯':  return <StarPath color={color} />
      case '🏆':  return <TrophyPath color={color} />
      case '🪙':  return <WalletPath color={color} />
      default:    return <LightningPath color={color} />
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {renderIcon()}
    </svg>
  )
}
