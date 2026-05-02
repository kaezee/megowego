import { useState } from 'react'
import { AvatarStack } from '../components/ui/Avatar'
import { Card } from '../components/ui/Card'
import { Chip } from '../components/ui/Chip'
import { SearchInput } from '../components/ui/Input'
import { TypeIcon } from '../components/ui/TypeIcon'
import { SwipeableOutingCard } from '../components/SwipeableOutingCard'
import { DeleteOutingModal } from '../components/DeleteOutingModal'
import type { Outing } from '../App'
import { Blob } from '../components/ui/Blob'
import { C, F, S } from '../lib/tokens'

function bucketOutings(outings: Outing[]) {
  const now = new Date()
  const sevenDaysOut = new Date(now)
  sevenDaysOut.setDate(now.getDate() + 7)

  const live   = outings.find(o => o.sortDate === 'LIVE')
  const coming = outings.filter(o => {
    if (o.sortDate === 'LIVE') return false
    const d = new Date(o.sortDate)
    return d >= now && d <= sevenDaysOut
  })
  const later  = outings.filter(o => {
    if (o.sortDate === 'LIVE') return false
    const d = new Date(o.sortDate)
    return d > sevenDaysOut
  })
  return { live, coming, later }
}

interface Props {
  outings: Outing[]
  onOutingsChange: (outings: Outing[]) => void
  onOutingTap: () => void
  onCreate: () => void
}

export function HomeActive({ outings, onOutingsChange, onOutingTap, onCreate }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const deletingOuting = outings.find(o => o.id === deletingId)

  const handleDelete = () => {
    onOutingsChange(outings.filter(o => o.id !== deletingId))
    setDeletingId(null)
  }

  const { live, coming, later } = bucketOutings(outings)

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, position: 'relative', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '48px 20px 0', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 24, color: C.ink }}>Your week</div>
        <button onClick={onCreate} style={{
          width: 40, height: 40, borderRadius: '50%',
          background: C.ink, border: S.border,
          boxShadow: S.shadow,
          color: C.base, cursor: 'pointer',
          fontFamily: F.display,
          fontSize: 26, fontWeight: 400, lineHeight: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>+</button>
      </div>
      <div style={{ padding: '0 20px' }}>
        <SearchInput placeholder="search outings, friends..." />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Live pinned card */}
        {live && (
          <SwipeableOutingCard onClick={onOutingTap} onDelete={() => setDeletingId(live.id)}>
            <div style={{
              border: S.border,
              borderRadius: 12,
              boxShadow: S.shadow,
              overflow: 'hidden',
            }}>
              {/* Purple header strip */}
              <div style={{
                background: C.purple,
                padding: '18px 20px 20px',
              }}>
                {/* "happening now" label */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  marginBottom: 8,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.base, flexShrink: 0 }} />
                  <span style={{
                    fontFamily: F.body,
                    fontWeight: 500, fontSize: 12, color: C.base,
                  }}>happening now</span>
                </div>
                {/* Outing name */}
                <div style={{
                  fontFamily: F.display,
                  fontWeight: 600, fontSize: 24, color: C.base, lineHeight: 1.1,
                }}>
                  {live.name}
                </div>
                {/* Started x min ago */}
                <div style={{
                  fontFamily: F.mono,
                  fontSize: 11, color: C.base, opacity: 0.7, marginTop: 6,
                }}>
                  started 18 min ago
                </div>
              </div>

              {/* White content zone */}
              <div style={{
                background: '#FFFFFF',
                padding: '16px 20px 20px',
              }}>
                {/* Avatar circles — overlapping, max 4 + overflow count */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  {live.people.slice(0, 4).map((p, i) => (
                    <div key={p.name} style={{
                      width: 38, height: 38, borderRadius: '50%',
                      background: p.color,
                      border: S.border,
                      marginLeft: i === 0 ? 0 : -10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: F.display,
                      fontWeight: 600, fontSize: 16, color: C.ink,
                      flexShrink: 0,
                      zIndex: i,
                    }}>
                      {p.name[0]}
                    </div>
                  ))}
                  {live.people.length > 4 && (
                    <div style={{
                      width: 38, height: 38, borderRadius: '50%',
                      background: C.grey200,
                      border: S.border,
                      marginLeft: -10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: F.body,
                      fontWeight: 700, fontSize: 12, color: C.ink,
                      flexShrink: 0,
                    }}>
                      +{live.people.length - 4}
                    </div>
                  )}
                </div>
                {/* CTA */}
                <button
                  onClick={e => { e.stopPropagation(); onOutingTap() }}
                  style={{
                    width: '100%', height: 48,
                    background: C.ink, border: S.border,
                    borderRadius: 10, color: C.base, cursor: 'pointer',
                    fontFamily: F.display,
                    fontSize: 18, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  I'm coming
                </button>
              </div>
            </div>
          </SwipeableOutingCard>
        )}

        {/* Coming up */}
        {coming.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M13 2L4.5 13.5H11L9 22L19.5 9.5H13L13 2Z" fill={C.ink}/></svg>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 18, color: C.ink }}>Coming up</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {coming.map(o => (
                <SwipeableOutingCard key={o.id} onClick={onOutingTap} onDelete={() => setDeletingId(o.id)}>
                  <Card padding={16}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 18, color: C.ink }}>{o.name}</div>
                        <div style={{ fontFamily: F.mono, fontSize: 12, color: C.grey600, marginTop: 4 }}>{o.date}</div>
                      </div>
                      <Chip color={o.color} active><TypeIcon type={o.type} size={13} />{o.type}</Chip>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <AvatarStack people={o.people} size={32} max={4} />
                    </div>
                  </Card>
                </SwipeableOutingCard>
              ))}
            </div>
          </div>
        )}

        {/* Further out */}
        {later.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={C.ink}/><circle cx="12" cy="9" r="2.5" fill={C.base}/></svg>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 16, color: C.grey600 }}>Further out</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {later.map(o => (
                <SwipeableOutingCard key={o.id} onClick={onOutingTap} onDelete={() => setDeletingId(o.id)}>
                  <Card padding={14} style={{ opacity: 0.85 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 16, color: C.ink }}>{o.name}</div>
                        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.grey600, marginTop: 4 }}>{o.date}</div>
                      </div>
                      <Chip color={o.color} active><TypeIcon type={o.type} size={13} />{o.type}</Chip>
                    </div>
                  </Card>
                </SwipeableOutingCard>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {outings.length === 0 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, paddingTop: 48, textAlign: 'center' }}>
            <Blob color={C.purple} shape="puffy" expression="sad" size={110} />
            <div>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 22, color: C.ink }}>clean slate</div>
              <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600, marginTop: 6 }}>you deleted everything. bold move.</div>
            </div>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deletingId && deletingOuting && (
        <DeleteOutingModal
          outingName={deletingOuting.name}
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  )
}
