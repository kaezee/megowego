import { Card } from '../components/ui/Card'
import { C, F } from '../lib/tokens'

interface Props {
  onBack: () => void
}

export function Settings({ onBack }: Props) {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '48px 20px 16px', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 24, color: C.ink }}>
          Settings
        </div>
      </div>

      {/* Items */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        <Card padding={0}>
          {[
            {
              label: 'Notifications',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              ),
            },
            {
              label: 'Invite friends',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" y1="8" x2="19" y2="14"/>
                  <line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
              ),
            },
          ].map((item, i) => (
            <button key={item.label} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              borderBottom: i === 0 ? `1px solid ${C.grey100}` : 'none',
              textAlign: 'left',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{item.icon}</span>
              <span style={{
                fontFamily: F.body,
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
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.error} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </span>
            <span style={{
              fontFamily: F.body,
              fontWeight: 500, fontSize: 15, color: C.error, flex: 1,
            }}>Sign out</span>
          </button>
        </Card>

      </div>
    </div>
  )
}
