import { Card, HeaderCard } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'
import { Avatar } from '../components/ui/Avatar'
import { C } from '../lib/tokens'

export function Profile() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.base }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '48px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Profile card */}
        <HeaderCard color={C.yellow} padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Avatar name="A" color={C.pink} size={56} />
            <div>
              <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink }}>aarav sharma</div>
              <Chip color={C.ink} style={{ marginTop: 8, fontSize: 12 }}>
                <span style={{ color: C.base }}>serial organiser 🫡</span>
              </Chip>
            </div>
          </div>
        </HeaderCard>

        {/* Stats */}
        <Card padding={20}>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, marginBottom: 16 }}>your stats</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'organised', value: '14' },
              { label: 'showed up', value: '23' },
              { label: 'bailed',    value: '3' },
              { label: 'bailed on you', value: '7' },
            ].map(s => (
              <div key={s.label} style={{ background: C.grey100, borderRadius: 8, padding: 12 }}>
                <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 700, fontSize: 24, color: C.ink }}>{s.value}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.grey600, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card padding={20}>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, marginBottom: 12 }}>titles earned</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['serial organiser 🫡', 'the reliable one ✅', 'hype man 🔥'].map(t => (
              <Chip key={t} color={C.grey100}>{t}</Chip>
            ))}
          </div>
        </Card>

        {/* Debt */}
        <Card padding={20}>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: C.ink, marginBottom: 4 }}>debt overview</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 13, color: C.grey600 }}>you are owed</div>
              <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 700, fontSize: 24, color: C.green }}>₹640</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 13, color: C.grey600 }}>you owe</div>
              <div style={{ fontFamily: "'Space Mono', ui-monospace, monospace", fontWeight: 700, fontSize: 24, color: C.error }}>₹180</div>
            </div>
          </div>
        </Card>

        {/* Wrapped teaser */}
        <HeaderCard color={C.purple} padding={20}>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 20 }}>2026 wrapped 🎁</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, marginTop: 4, opacity: 0.9 }}>14 outings · ₹4,200 spent · Diya bailed 3 times</div>
          <button style={{ marginTop: 12, background: C.base, border: '2px solid #0A0A0A', borderRadius: 12, padding: '8px 16px', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 600, fontSize: 13, color: C.ink, cursor: 'pointer' }}>
            see your wrapped →
          </button>
        </HeaderCard>
      </div>
    </div>
  )
}
