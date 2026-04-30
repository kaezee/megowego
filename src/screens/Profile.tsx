import { Card, HeaderCard } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { SectionBadge } from '../components/ui/SectionBadge'
import { C } from '../lib/tokens'

interface Props { onBack: () => void }

// ── Achievement badge icons (SVG paths) ──────────────────────
function IconOrganiser({ locked }: { locked?: boolean }) {
  const c = locked ? '#AAAAAA' : '#FAFAF0'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L14 8H19L15 11.5L16.5 17L12 14L7.5 17L9 11.5L5 8H10Z" fill={c} stroke={c} strokeWidth="1" strokeLinejoin="round"/>
    </svg>
  )
}
function IconReliable({ locked }: { locked?: boolean }) {
  const c = locked ? '#AAAAAA' : '#FAFAF0'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconHype({ locked }: { locked?: boolean }) {
  const c = locked ? '#AAAAAA' : '#FAFAF0'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4.5 13.5H11L9 22L19.5 9.5H13L13 2Z" fill={c} stroke={c} strokeWidth="1" strokeLinejoin="round"/>
    </svg>
  )
}
function IconNightOwl({ locked }: { locked?: boolean }) {
  const c = locked ? '#AAAAAA' : '#FAFAF0'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3a9 9 0 1 0 9 9c-5 0-9-4-9-9z" fill={c}/>
    </svg>
  )
}
function IconBailProof({ locked }: { locked?: boolean }) {
  const c = locked ? '#AAAAAA' : '#FAFAF0'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="11" width="16" height="2" rx="1" fill={c}/>
      <rect x="11" y="4" width="2" height="16" rx="1" fill={c}/>
    </svg>
  )
}

const ACHIEVEMENTS = [
  { id: 'organiser', label: 'serial organiser', color: C.pink,   Icon: IconOrganiser, locked: false },
  { id: 'reliable',  label: 'the reliable one', color: C.green,  Icon: IconReliable,  locked: false },
  { id: 'hype',      label: 'hype man',         color: C.orange, Icon: IconHype,      locked: false },
  { id: 'nightowl',  label: 'night owl',        color: C.purple, Icon: IconNightOwl,  locked: true  },
  { id: 'bailproof', label: 'bail-proof',       color: C.blue,   Icon: IconBailProof, locked: true  },
]

export function Profile({ onBack }: Props) {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden' }}>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '48px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Back */}
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', alignSelf: 'flex-start' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
          </svg>
        </button>

        {/* Profile card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <HeaderCard color={C.yellow} padding={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar name="A" color={C.pink} size={56} />
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Achievement title pill — above the name */}
                <div style={{
                  display: 'inline-block',
                  marginBottom: 5,
                  background: C.ink,
                  color: C.base,
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontWeight: 600, fontSize: 11,
                  borderRadius: 100,
                  padding: '3px 10px',
                  letterSpacing: '0.02em',
                }}>
                  serial organiser
                </div>
                <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 26, color: C.ink, lineHeight: 1.1 }}>
                  Aarav Sharma
                </div>
              </div>
              {/* Pencil edit button */}
              <button style={{
                alignSelf: 'flex-start',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 4, flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                </svg>
              </button>
            </div>
          </HeaderCard>
        </div>

        {/* Stats */}
        <Card padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <SectionBadge icon="🎯" color={C.pink} size={32} />
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 18, color: C.ink }}>Your stats</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'organised',     value: '14' },
              { label: 'showed up',     value: '23' },
              { label: 'bailed',        value: '3'  },
              { label: 'bailed on you', value: '7'  },
            ].map(s => (
              <div key={s.label} style={{ background: C.surface, borderRadius: 8, padding: 12 }}>
                <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 600, fontSize: 24, color: C.ink }}>{s.value}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.grey600, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <SectionBadge icon="🏆" color={C.yellow} size={32} />
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 18, color: C.ink }}>Achievements</div>
          </div>

          {/* Horizontal scroll row of circular badges */}
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {ACHIEVEMENTS.map(a => {
              const { Icon } = a
              return (
                <div
                  key={a.id}
                  style={{
                    flexShrink: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  }}
                >
                  {/* Circle badge */}
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: a.locked ? '#F0EEE8' : a.color,
                    border: '2px solid #0A0A0A',
                    boxShadow: a.locked ? 'none' : '2px 2px 0 0 #0A0A0A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon locked={a.locked} />
                  </div>
                  {/* Label */}
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: 10, fontWeight: 600,
                    color: a.locked ? C.grey400 : C.ink,
                    textAlign: 'center',
                    maxWidth: 60,
                    lineHeight: 1.2,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {a.label}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Debt */}
        <Card padding={0}>
          {/* Level 2 strip — colored top with character placeholder */}
          <div style={{
            height: 80,
            background: C.green,
            borderRadius: '10px 10px 0 0',
            border: '2px solid #0A0A0A',
            borderBottom: 'none',
            position: 'relative',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', bottom: -8, right: 16,
              width: 64, height: 72,
              background: C.surface,
              border: '2px dashed #0A0A0A',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src="/In debt.png" alt="" style={{ width: 56, height: 56, objectFit: 'contain' }} />
            </div>
          </div>

          {/* Content zone */}
          <div style={{ padding: '16px 20px 20px', borderTop: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <SectionBadge icon="🪙" color={C.green} size={32} />
              <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 18, color: C.ink, flex: 1 }}>Debt overview</div>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.grey600, marginBottom: 14 }}>across 3 recent outings</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, background: C.debtPositive, border: '2px solid #0A0A0A', borderRadius: 10, padding: 14 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.grey600 }}>owed to you</div>
                <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 600, fontSize: 22, color: C.green, marginTop: 4 }}>₹640</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 11, color: C.grey600, marginTop: 4 }}>from Kabir, Vir</div>
              </div>
              <div style={{ flex: 1, background: C.debtNegative, border: '2px solid #0A0A0A', borderRadius: 10, padding: 14 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.grey600 }}>you owe</div>
                <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 600, fontSize: 22, color: C.error, marginTop: 4 }}>₹180</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 11, color: C.grey600, marginTop: 4 }}>to Diya</div>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  )
}
