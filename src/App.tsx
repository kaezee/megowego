import { useState } from 'react'
import { BottomNav } from './components/BottomNav'
import type { Tab } from './components/BottomNav'
import { Splash } from './screens/Splash'
import { Signup } from './screens/Signup'
import { Signin } from './screens/Signin'
import { HomeEmpty } from './screens/HomeEmpty'
import { HomeActive } from './screens/HomeActive'
import { CreateOuting } from './screens/CreateOuting'
import { OutingDetail } from './screens/OutingDetail'
import { Moments, MomentDetail } from './screens/Moments'
import { Friends } from './screens/Friends'
import { Profile } from './screens/Profile'
import { Settings } from './screens/Settings'
import type { Moment } from './screens/Moments'
import { Avatar } from './components/ui/Avatar'
import { C } from './lib/tokens'

type Screen =
  | 'splash' | 'signup' | 'signin'
  | 'home-empty' | 'home-active'
  | 'create' | 'outing-detail'
  | 'moments' | 'moment-detail'
  | 'friends'
  | 'profile' | 'settings'

export interface Outing {
  id: string
  name: string
  date: string
  sortDate: string
  type: string
  color: string
  people: { name: string; color: string }[]
}

const PEOPLE = [
  { name: 'Aarav', color: C.pink },
  { name: 'Diya',  color: C.yellow },
  { name: 'Kabir', color: C.green },
  { name: 'Mira',  color: C.blue },
  { name: 'Rhea',  color: C.purple },
  { name: 'Vir',   color: C.orange },
]

const INITIAL_OUTINGS: Outing[] = [
  { id: '1', name: 'chai @ irani',              date: 'HAPPENING NOW',         sortDate: 'LIVE',       type: 'food 🍕',     color: C.yellow, people: PEOPLE.slice(0,4) },
  { id: '2', name: 'shuka dinner',              date: 'FRI 1 MAY · 8:00 PM',   sortDate: '2026-05-01', type: 'food 🍕',     color: C.yellow, people: PEOPLE.slice(0,5) },
  { id: '3', name: 'matinee madness',           date: 'WED 30 APR · 3:30 PM',  sortDate: '2026-04-30', type: 'movies 🎬',  color: C.pink,   people: [PEOPLE[1], PEOPLE[3], PEOPLE[5]] },
  { id: '4', name: 'goa boys (real this time)', date: 'FRI 29 MAY · WEEKEND',  sortDate: '2026-05-29', type: 'hangout ✌️', color: C.blue,   people: PEOPLE },
]

const TABBED_SCREENS: Screen[] = ['home-empty', 'home-active', 'moments', 'friends', 'profile', 'settings']

export default function App() {
  const [screen, setScreen]             = useState<Screen>('splash')
  const [tab, setTab]                   = useState<Tab>('home')
  const [outings, setOutings]           = useState<Outing[]>(INITIAL_OUTINGS)
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null)
  const [showMore, setShowMore]         = useState(false)

  const hasOutings = outings.length > 0
  const go = (s: Screen) => setScreen(s)

  const handleTab = (t: Tab) => {
    if (t === 'more') {
      setShowMore(true)
      return
    }
    setTab(t)
    setShowMore(false)
    if (t === 'home')         go(hasOutings ? 'home-active' : 'home-empty')
    else if (t === 'moments') go('moments')
    else if (t === 'friends') go('friends')
  }

  const openMoment = (m: Moment) => {
    setActiveMoment(m)
    go('moment-detail')
  }

  const handleOutingCreated = (o: Outing) => {
    setOutings(prev => [...prev, o])
    go('home-active')
  }

  const showNav = TABBED_SCREENS.includes(screen)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>

        {screen === 'splash'        && <Splash onSignup={() => go('signup')} onSignin={() => go('signin')} />}
        {screen === 'signup'        && <Signup onBack={() => go('splash')} onDone={() => { setTab('home'); go('home-active') }} />}
        {screen === 'signin'        && <Signin onBack={() => go('splash')} onDone={() => { setTab('home'); go('home-active') }} />}
        {screen === 'home-empty'    && <HomeEmpty onCreate={() => go('create')} />}
        {screen === 'home-active'   && (
          <HomeActive
            outings={outings}
            onOutingsChange={setOutings}
            onOutingTap={() => go('outing-detail')}
            onCreate={() => go('create')}
          />
        )}
        {screen === 'create'        && (
          <CreateOuting
            onBack={() => go(hasOutings ? 'home-active' : 'home-empty')}
            onDone={handleOutingCreated}
          />
        )}
        {screen === 'outing-detail' && <OutingDetail onBack={() => go('home-active')} />}
        {screen === 'moments'       && <Moments onMomentTap={openMoment} />}
        {screen === 'moment-detail' && activeMoment && <MomentDetail moment={activeMoment} onBack={() => go('moments')} />}
        {screen === 'friends'       && <Friends />}
        {screen === 'profile'       && <Profile />}
        {screen === 'settings'      && <Settings onBack={() => go('profile')} />}

      </div>

      {showNav && <BottomNav active={tab} onChange={handleTab} />}

      {/* More sheet */}
      {showMore && (
        <div
          onClick={() => setShowMore(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
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
              paddingBottom: 32,
            }}
          >
            {/* Handle */}
            <div style={{ padding: '12px 0 4px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 40, height: 4, borderRadius: 100, background: C.grey200 }} />
            </div>

            {/* User row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 20px 16px',
              borderBottom: `1px solid ${C.grey100}`,
            }}>
              <Avatar name="A" color={C.pink} size={40} />
              <div>
                <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 17, color: C.ink }}>Aarav Sharma</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, color: C.grey600 }}>serial organiser 🫡</div>
              </div>
            </div>

            {/* Profile */}
            <button
              onClick={() => { setTab('more'); setShowMore(false); go('profile') }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 20px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                borderBottom: `1px solid ${C.grey100}`, textAlign: 'left',
              }}
            >
              <span style={{
                width: 36, height: 36, borderRadius: '50%',
                background: C.yellow, border: '2px solid #0A0A0A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }}>👤</span>
              <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 15, color: C.ink, flex: 1 }}>
                Profile
              </span>
              <span style={{ color: C.grey400, fontSize: 18 }}>›</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => { setTab('more'); setShowMore(false); go('settings') }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 20px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{
                width: 36, height: 36, borderRadius: '50%',
                background: C.blue, border: '2px solid #0A0A0A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }}>⚙️</span>
              <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 500, fontSize: 15, color: C.ink, flex: 1 }}>
                Settings
              </span>
              <span style={{ color: C.grey400, fontSize: 18 }}>›</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
