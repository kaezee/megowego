import { C } from '../../lib/tokens'

export type BlobShape = 'bean' | 'oval' | 'round' | 'wide' | 'puffy'
export type BlobExpression = 'happy' | 'sad' | 'cool' | 'excited' | 'meh'

interface BlobProps {
  color?: string
  shape?: BlobShape
  expression?: BlobExpression
  size?: number
  flip?: boolean
  style?: React.CSSProperties
}

// All paths fit in a 80×80 viewBox, bodies occupy ~70–80% of that
const BODY: Record<BlobShape, string> = {
  // Kidney-bean — slightly leaning, asymmetric
  bean:  'M42,6 C59,4 73,16 73,34 C73,52 61,66 44,72 C27,78 11,68 8,50 C5,32 14,14 30,8 C35,6 39,8 42,6 Z',
  // Classic tall oval
  oval:  'M40,6 C58,6 72,21 72,42 C72,63 58,76 40,76 C22,76 8,63 8,42 C8,21 22,6 40,6 Z',
  // Rounded-square / blockier — sun-like feel
  round: 'M26,7 C33,3 47,3 54,7 C64,7 73,16 73,26 C77,33 77,47 73,54 C73,64 64,73 54,73 C47,77 33,77 26,73 C16,73 7,64 7,54 C3,47 3,33 7,26 C7,16 16,7 26,7 Z',
  // Wide and squat, irregular left-right
  wide:  'M40,10 C56,5 75,17 77,35 C79,52 66,68 50,73 C37,77 21,73 13,61 C5,49 7,32 15,20 C22,10 30,15 40,10 Z',
  // Puffy / wavy — extra bumpy silhouette
  puffy: 'M38,8 C46,2 60,6 66,16 C74,20 81,32 77,45 C81,57 72,69 60,73 C52,79 40,81 30,77 C18,79 7,69 5,57 C1,45 7,30 17,20 C24,10 30,14 38,8 Z',
}

function Eyes() {
  return (
    <>
      <circle cx={27} cy={34} r={6.5} fill="white" stroke={C.ink} strokeWidth={1.5} />
      <circle cx={27.5} cy={35.5} r={2.5} fill={C.ink} />
      <circle cx={53} cy={34} r={6.5} fill="white" stroke={C.ink} strokeWidth={1.5} />
      <circle cx={53.5} cy={35.5} r={2.5} fill={C.ink} />
    </>
  )
}

function Sunglasses() {
  return (
    <>
      <rect x={16} y={26} width={22} height={16} rx={8} fill={C.ink} />
      <rect x={42} y={26} width={22} height={16} rx={8} fill={C.ink} />
      <line x1={38} y1={34} x2={42} y2={34} stroke={C.ink} strokeWidth={2.5} />
      <circle cx={23} cy={30} r={3.5} fill="white" opacity={0.2} />
      <circle cx={49} cy={30} r={3.5} fill="white" opacity={0.2} />
    </>
  )
}

function Mouth({ expression }: { expression: BlobExpression }) {
  switch (expression) {
    case 'happy':
      return <path d="M28,52 Q40,65 52,52" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
    case 'sad':
      return <path d="M28,60 Q40,48 52,60" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
    case 'meh':
      return <line x1={28} y1={55} x2={52} y2={55} stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
    case 'excited':
      return <ellipse cx={40} cy={57} rx={10} ry={7} fill={C.ink} />
    case 'cool':
      return <path d="M30,56 Q40,66 50,56" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
    default:
      return null
  }
}

export function Blob({
  color = C.yellow,
  shape = 'oval',
  expression = 'happy',
  size = 80,
  flip = false,
  style,
}: BlobProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      style={{ flexShrink: 0, transform: flip ? 'scaleX(-1)' : undefined, ...style }}
    >
      <path d={BODY[shape]} fill={color} stroke={C.ink} strokeWidth={2} />
      {expression === 'cool' ? <Sunglasses /> : <Eyes />}
      <Mouth expression={expression} />
    </svg>
  )
}
