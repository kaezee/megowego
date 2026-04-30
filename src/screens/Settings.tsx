import { Card } from '../components/ui/Card'
import { C } from '../lib/tokens'

interface Props {
  onBack: () => void
}

export function Settings({ onBack }: Props) {
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

      {/* Items */}
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
              <span style={{ color: C.grey400, fontSize: 18 }}>›</span>
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
