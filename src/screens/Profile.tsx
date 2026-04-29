import { useState } from 'react'
import { Card, HeaderCard } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'
import { Avatar } from '../components/ui/Avatar'
import { SectionBadge } from '../components/ui/SectionBadge'
import { C } from '../lib/tokens'

export function Profile() {
  const [showSettings, setShowSettings] = useState(false)

  if (showSettings) {
    return <SettingsView onBack={() => setShowSettings(false)} />
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden' }}>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '48px 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Profile card */}
        <HeaderCard color={C.yellow} padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Avatar name="A" color={C.pink} size={56} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 24, color: C.ink }}>Aarav Sharma</div>
              <Chip color={C.ink} style={{ marginTop: 8, fontSize: 12 }}>
                <span style={{ color: C.base }}>serial organiser 🫡</span>
              </Chip>
            </div>
            <button
              style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: C.ink, border: '2px solid #0A0A0A',
                boxShadow: '2px 2px 0 0 #0A0A0A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>✏️</span>
            </button>
          </div>
        </HeaderCard>

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <SectionBadge icon="🏆" color={C.yellow} size={32} />
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
            <SectionBadge icon="🪙" color={C.green} size={32} />
            <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 18, color: C.ink, flex: 1 }}>Debt overview</div>
            <img src="/In debt.png" alt="" style={{ width: 48, height: 48, objectFit: 'contain', flexShrink: 0 }} />
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

        {/* Settings — single nav button */}
        <Card padding={0}>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 18 }}>⚙️</span>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 500, fontSize: 15, color: C.ink, flex: 1,
            }}>Settings</span>
            <span style={{ color: C.grey400, fontSize: 18, fontWeight: 300 }}>›</span>
          </button>
        </Card>

      </div>
    </div>
  )
}

// ── Settings screen ─────────────────────────────────────────
function SettingsView({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '48px 20px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: C.base, border: '2px solid #0A0A0A',
            boxShadow: '2px 2px 0 0 #0A0A0A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            fontFamily: "'Fredoka', system-ui, sans-serif",
            fontSize: 18, color: C.ink,
          }}
        >
          ←
        </button>
        <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 24, color: C.ink }}>
          Settings
        </div>
      </div>

      {/* Settings items */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card padding={0}>
          {[
            { emoji: '🔔', label: 'Notifications' },
            { emoji: '🤝', label: 'Invite friends' },
          ].map((item, i) => (
            <button key={item.label} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              borderBottom: i === 0 ? `1px solid ${C.grey100}` : 'none',
              textAlign: 'left',
            }}>
              <span style={{ fontSize: 18 }}>{item.emoji}</span>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontWeight: 500, fontSize: 15, color: C.ink, flex: 1,
              }}>{item.label}</span>
              <span style={{ color: C.grey400, fontSize: 18, fontWeight: 300 }}>›</span>
            </button>
          ))}
        </Card>

        <Card padding={0}>
          <button style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 20px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            textAlign: 'left',
          }}>
            <span style={{ fontSize: 18 }}>🚪</span>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 500, fontSize: 15, color: C.error, flex: 1,
            }}>Sign out</span>
          </button>
        </Card>
      </div>

    </div>
  )
}
