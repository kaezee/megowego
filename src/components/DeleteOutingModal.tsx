import { Button } from './ui/Button'
import { C, F, S } from '../lib/tokens'

interface Props {
  outingName: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteOutingModal({ outingName, onConfirm, onCancel }: Props) {
  return (
    // Scrim
    <div
      onClick={onCancel}
      style={{
        position: 'absolute', inset: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.5)',
        display: 'flex', alignItems: 'flex-end',
      }}
    >
      {/* Sheet */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 430, margin: '0 auto',
          background: C.base,
          border: S.border,
          borderBottom: 'none',
          borderRadius: '16px 16px 0 0',
          padding: '28px 20px 40px',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}
      >
        {/* Handle */}
        <div style={{ width: 40, height: 4, borderRadius: 100, background: C.grey200, margin: '0 auto -8px' }} />

        {/* Illustration */}
        <img src="/Bailing.png" alt="" style={{ width: 120, height: 120, objectFit: 'contain', margin: '0 auto' }} />

        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            fontFamily: F.display,
            fontWeight: 600, fontSize: 24, color: C.ink, lineHeight: 1.2,
          }}>
            delete "{outingName}"?
          </div>
          <div style={{
            fontFamily: F.body,
            fontSize: 14, color: C.grey600, lineHeight: 1.6,
          }}>
            this outing is gone for everyone in the crew. no undo, no "wait actually", no appeals process. just gone.
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button full variant="destructive" onClick={onConfirm}>
            yeah, kill it
          </Button>
          <Button full variant="ghost" onClick={onCancel}>
            no wait, keep it
          </Button>
        </div>
      </div>
    </div>
  )
}
