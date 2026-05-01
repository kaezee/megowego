import { C, F } from '../../lib/tokens'

interface Props {
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function BottomSheet({ onClose, title, children }: Props) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.45)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.base,
          borderTop: '2px solid #0A0A0A',
          borderRadius: '20px 20px 0 0',
          maxHeight: '80%',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Handle */}
        <div style={{ padding: '12px 0 4px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 40, height: 4, borderRadius: 100, background: C.grey200 }} />
        </div>

        {title && (
          <div style={{ padding: '4px 20px 12px', fontFamily: F.display, fontWeight: 600, fontSize: 20, color: C.ink, flexShrink: 0, borderBottom: `1px solid ${C.grey100}` }}>
            {title}
          </div>
        )}

        <div style={{ overflowY: 'auto', padding: '16px 20px 40px', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
