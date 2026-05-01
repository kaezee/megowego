import { useState } from 'react'
import { BottomSheet } from '../components/ui/BottomSheet'
import { C, F, S } from '../lib/tokens'

interface Props { onBack: () => void }

const PACKS = [
  {
    id: 'roast-og',
    name: 'the OG roast pack',
    sub: '8 savage roast cards',
    price: '₹49',
    color: C.pink,
    owned: false,
    preview: ['the classic ghost 👻', 'last-minute bailout 💨', 'the eternal "on my way" 🚶', 'the wrong address 🗺️'],
  },
  {
    id: 'fomo-deluxe',
    name: 'fomo deluxe',
    sub: '6 premium fomo cards',
    price: '₹49',
    color: C.purple,
    owned: false,
    preview: ['you missed the plot twist', 'this one was for the ages', 'we talked about you (kindly)', 'should\'ve been there'],
  },
  {
    id: 'moment-gold',
    name: 'moment gold',
    sub: '10 memory cards with gold foil',
    price: '₹79',
    color: C.yellow,
    owned: true,
    preview: ['legendary night', 'core memory unlocked', 'we did that', 'this one stays'],
  },
  {
    id: 'chaos-pack',
    name: 'chaos pack',
    sub: '8 unhinged cards',
    price: '₹49',
    color: C.orange,
    owned: false,
    preview: ['absolutely unhinged evening', 'do not speak of this', 'the timeline is unclear', 'no context needed'],
  },
  {
    id: 'wholesome',
    name: 'wholesome collection',
    sub: '6 wholesome memory cards',
    price: '₹49',
    color: C.green,
    owned: false,
    preview: ['grateful for this crew', 'soft hours only', 'the best kind of tired', 'exactly what we needed'],
  },
]

export function Shop({ onBack }: Props) {
  const [selected, setSelected]   = useState<typeof PACKS[0] | null>(null)
  const [owned, setOwned]         = useState<string[]>(['moment-gold'])
  const [bought, setBought]       = useState<string | null>(null)

  const handleBuy = (id: string) => {
    setOwned(prev => [...prev, id])
    setBought(id)
    setTimeout(() => { setBought(null); setSelected(null) }, 1500)
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: C.surface, position: 'relative', overflow: 'hidden' }}>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ padding: '48px 20px 80px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, alignSelf: 'flex-start' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/>
            </svg>
          </button>

          <div>
            <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 26, color: C.ink }}>card packs</div>
            <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600, marginTop: 4 }}>more cards, more chaos</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PACKS.map(p => {
              const isOwned = owned.includes(p.id)
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  style={{
                    background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', width: '100%',
                  }}
                >
                  <div style={{ border: S.border, borderRadius: 12, overflow: 'hidden', boxShadow: '3px 3px 0 0 #0A0A0A' }}>
                    {/* Color header */}
                    <div style={{ background: p.color, padding: '16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 18, color: C.ink }}>{p.name}</div>
                        <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink, opacity: 0.7, marginTop: 2 }}>{p.sub}</div>
                      </div>
                      <div style={{
                        background: isOwned ? C.green : C.ink,
                        border: S.border, borderRadius: 100,
                        padding: '6px 14px',
                        fontFamily: F.body, fontWeight: 600, fontSize: 13,
                        color: isOwned ? C.ink : C.base,
                        flexShrink: 0,
                      }}>
                        {isOwned ? 'owned ✓' : p.price}
                      </div>
                    </div>
                    {/* Preview */}
                    <div style={{ background: C.base, padding: '12px 16px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {p.preview.slice(0, 3).map((card, i) => (
                        <div key={i} style={{
                          flexShrink: 0, background: `${p.color}22`, border: `1.5px solid #0A0A0A`,
                          borderRadius: 8, padding: '8px 10px', minWidth: 100,
                          fontFamily: F.body, fontSize: 11, fontWeight: 500, color: C.ink, lineHeight: 1.3,
                        }}>
                          {card}
                        </div>
                      ))}
                      {p.preview.length > 3 && (
                        <div style={{ flexShrink: 0, background: C.grey100, border: `1.5px solid ${C.grey200}`, borderRadius: 8, padding: '8px 10px', minWidth: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: 11, color: C.grey400 }}>
                          +{p.preview.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

        </div>
      </div>

      {selected && (
        <BottomSheet onClose={() => setSelected(null)} title={selected.name}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: F.body, fontSize: 14, color: C.grey600 }}>{selected.sub}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {selected.preview.map((card, i) => (
                <div key={i} style={{ background: `${selected.color}22`, border: `1.5px solid #0A0A0A`, borderRadius: 10, padding: '12px 14px', fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.ink }}>
                  {card}
                </div>
              ))}
            </div>
            {owned.includes(selected.id) ? (
              <div style={{ background: C.green, border: S.border, borderRadius: 16, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.body, fontWeight: 600, fontSize: 16, color: C.ink }}>
                owned ✓ — all cards unlocked
              </div>
            ) : (
              <button
                onClick={() => handleBuy(selected.id)}
                style={{
                  width: '100%', height: 52,
                  background: bought === selected.id ? C.green : C.ink,
                  border: 'none', borderRadius: 16, cursor: 'pointer',
                  fontFamily: F.body, fontWeight: 600, fontSize: 16,
                  color: bought === selected.id ? C.ink : C.base,
                  transition: 'background 200ms',
                }}
              >
                {bought === selected.id ? 'unlocked ✓' : `get this pack — ${selected.price}`}
              </button>
            )}
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
