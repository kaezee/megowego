import { Card, HeaderCard } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'
import { Avatar } from '../components/ui/Avatar'
import { Blob } from '../components/ui/Blob'
import { SectionBadge } from '../components/ui/SectionBadge'
import { C } from '../lib/tokens'

export function Profile() {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden' }}>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '48px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Profile card — blob sits top-right corner of the yellow header */}
        <HeaderCard color={C.yellow} padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar name="A" color={C.pink} size={56} />
              <div>
                <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 24, color: C.ink }}>Aarav Sharma</div>
                <Chip color={C.ink} style={{ marginTop: 8, fontSize: 12 }}>
                  <span style={{ color: C.base }}>serial organiser 🫡</span>
                </Chip>
              </div>
            </div>
            <Blob color={C.purple} shape="puffy" expression="cool" size={72} style={{ marginRight: -8, marginTop: -8 }} />
          </div>
        </HeaderCard>

        {/* Stats */}
        <Card padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <SectionBadge icon="🎯" color={C.pink} size={28} />
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 18, color: C.ink }}>Your stats</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'organised', value: '14' },
              { label: 'showed up', value: '23' },
              { label: 'bailed',    value: '3' },
              { label: 'bailed on you', value: '7' },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <SectionBadge icon="🏆" color={C.yellow} size={28} />
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 18, color: C.ink }}>Achievements</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['serial organiser 🫡', 'the reliable one ✅', 'hype man 🔥'].map(t => (
              <Chip key={t} color={C.grey100}>{t}</Chip>
            ))}
          </div>
        </Card>

        {/* Debt */}
        <Card padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <SectionBadge icon="🪙" color={C.green} size={28} />
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 18, color: C.ink }}>Debt overview</div>
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
        </Card>

        {/* Settings */}
        <Card padding={0}>
          {[
            { emoji: '✏️', label: 'Edit profile' },
            { emoji: '🔔', label: 'Notifications' },
            { emoji: '🤝', label: 'Invite friends' },
            { emoji: '🚪', label: 'Sign out', danger: true },
          ].map((item, i, arr) => (
            <button key={item.label} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              borderBottom: i < arr.length - 1 ? `1px solid ${C.grey100}` : 'none',
              textAlign: 'left',
            }}>
              <span style={{ fontSize: 18 }}>{item.emoji}</span>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 500, fontSize: 15,
                color: item.danger ? C.error : C.ink, flex: 1,
              }}>{item.label}</span>
              {!item.danger && <span style={{ color: C.grey400, fontSize: 18, fontWeight: 300 }}>›</span>}
            </button>
          ))}
        </Card>

      </div>
    </div>
  )
}
