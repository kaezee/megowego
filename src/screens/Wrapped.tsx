import { useState } from 'react'
import { BottomSheet } from '../components/ui/BottomSheet'
import { Avatar } from '../components/ui/Avatar'
import { C, F, S } from '../lib/tokens'

interface Props { onBack: () => void }

const STATS = [
  { id: 'month',    label: 'most chaotic month',  value: 'March',    sub: '6 outings, 0 regrets',          color: C.orange },
  { id: 'reliable', label: 'most reliable one',   value: 'Diya',     sub: 'showed up to everything',        color: C.green  },
  { id: 'bailer',   label: 'biggest bailer',      value: 'Kabir',    sub: 'bailed 4 times. same excuses.',  color: C.pink   },
  { id: 'spent',    label: 'total spent',         value: '₹14,200',  sub: 'across 23 outings',              color: C.yellow },
  { id: 'outings',  label: 'outings organised',   value: '14',       sub: 'you love a plan',                color: C.blue   },
  { id: 'vibe',     label: 'signature vibe',      value: 'chaotic',  sub: 'tagged it 8 times',              color: C.purple },
]

const PEOPLE = [
  { name: 'Diya',  color: C.yellow },
  { name: 'Kabir', color: C.green  },
  { name: 'Mira',  color: C.blue   },
  { name: 'Rhea',  color: C.purple },
  { name: 'Vir',   color: C.orange },
]

export function Wrapped({ onBack }: Props) {
  const [selected, setSelected] = useState<typeof STATS[0] | null>(null)

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.purple, position: 'relative', overflow: 'hidden' }}>

      {/* Back */}
      <div style={{ padding: '48px 20px 0', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.base} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
          </svg>
        </button>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '24px 20px 60px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Hero */}
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.base, opacity: 0.6, letterSpacing: '0.1em', marginBottom: 8 }}>YOUR YEAR IN OUTINGS</div>
          <div style={{ fontFamily: F.mono, fontWeight: 600, fontSize: 56, color: C.base, lineHeight: 1 }}>2025</div>
          <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 28, color: C.base, marginTop: 8, lineHeight: 1.2 }}>you showed up.<br />mostly.</div>
        </div>

        {/* Crew */}
        <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '16px 16px' }}>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.base, opacity: 0.7, marginBottom: 12 }}>your crew</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {PEOPLE.map(p => (
              <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Avatar name={p.name[0]} color={p.color} size={40} />
                <div style={{ fontFamily: F.body, fontSize: 11, color: C.base, opacity: 0.8 }}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {STATS.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              style={{
                background: s.color, border: S.border, borderRadius: 14,
                boxShadow: '3px 3px 0 0 #0A0A0A',
                padding: '14px 14px', cursor: 'pointer', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 4,
                aspectRatio: s.id === 'spent' || s.id === 'outings' ? undefined : undefined,
              }}
            >
              <div style={{ fontFamily: F.body, fontSize: 11, fontWeight: 600, color: C.ink, opacity: 0.6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink, lineHeight: 1.1, marginTop: 4 }}>{s.value}</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: C.ink, opacity: 0.6, marginTop: 4 }}>{s.sub}</div>
            </button>
          ))}
        </div>

        {/* Share CTA */}
        <button style={{
          width: '100%', height: 52,
          background: C.base, border: S.border, borderRadius: 16,
          boxShadow: '3px 3px 0 0 rgba(250,250,240,0.3)',
          cursor: 'pointer', fontFamily: F.body, fontWeight: 600, fontSize: 16, color: C.ink,
        }}>
          share the chaos →
        </button>

      </div>

      {selected && (
        <BottomSheet onClose={() => setSelected(null)} title={selected.label}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: selected.color, border: S.border, borderRadius: 14, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 36, color: C.ink }}>{selected.value}</div>
              <div style={{ fontFamily: F.body, fontSize: 14, color: C.ink, opacity: 0.7, marginTop: 8 }}>{selected.sub}</div>
            </div>
            <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600, lineHeight: 1.6 }}>
              {selected.id === 'month' && 'March 2025 was wild. 6 outings in one month. Kabir bailed twice. Worth it.'}
              {selected.id === 'reliable' && 'Diya showed up to every single outing you organised. Give her a thank you.'}
              {selected.id === 'bailer' && "Kabir's excuses included: the moon, a dog that needed therapy, and low battery."}
              {selected.id === 'spent' && '₹14,200 across 23 outings. That\'s ₹617 per outing. Honestly, not bad.'}
              {selected.id === 'outings' && '14 outings organised. The group would be lost without you.'}
              {selected.id === 'vibe' && "Chaotic. That's your signature. Own it."}
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
