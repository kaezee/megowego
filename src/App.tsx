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
import { Achievements } from './screens/Achievements'
import { Wrapped } from './screens/Wrapped'
import { Shop } from './screens/Shop'
import { Settings } from './screens/Settings'
import type { Moment } from './screens/Moments'
import { C, F, S } from './lib/tokens'

function PersonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7" r="5" fill={C.ink} />
      <path d="M3 22c0-5 4-9 9-9s9 4 9 9H3z" fill={C.ink} />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.8 5L17 4.3L18.7 7.3L22 8.5L21 12L22 15.5L18.7 16.7L17 19.7L13.8 19L12 22L10.2 19L7 19.7L5.3 16.7L2 15.5L3 12L2 8.5L5.3 7.3L7 4.3L10.2 5Z" fill={C.ink} />
      <circle cx="12" cy="12" r="3.5" fill={C.base} />
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill={C.ink} />
      <path d="M3 6h18" stroke={C.base} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 10a4 4 0 0 1-8 0" stroke={C.base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

type Screen =
  | 'splash' | 'signup' | 'signin'
  | 'home-empty' | 'home-active'
  | 'create' | 'outing-detail'
  | 'moments' | 'moment-detail'
  | 'friends'
  | 'profile' | 'achievements' | 'wrapped' | 'shop'
  | 'settings'

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
  { id: '1', name: 'chai @ irani',              date: 'HAPPENING NOW',         sortDate: 'LIVE',       type: 'food',    color: C.yellow, people: PEOPLE.slice(0,4) },
  { id: '2', name: 'shuka dinner',              date: 'FRI 1 MAY · 8:00 PM',   sortDate: '2026-05-01', type: 'food',    color: C.yellow, people: PEOPLE.slice(0,5) },
  { id: '3', name: 'matinee madness',           date: 'WED 30 APR · 3:30 PM',  sortDate: '2026-04-30', type: 'movies',  color: C.pink,   people: [PEOPLE[1], PEOPLE[3], PEOPLE[5]] },
  { id: '4', name: 'goa boys (real this time)', date: 'FRI 29 MAY · WEEKEND',  sortDate: '2026-05-29', type: 'hangout', color: C.blue,   people: PEOPLE },
]

const TABBED_SCREENS: Screen[] = ['home-empty', 'home-active', 'moments', 'friends', 'profile', 'settings']

export default function App() {
  const [screen, setScreen]             = useState<Screen>('splash')
  const [tab, setTab]                   = useState<Tab>('home')
  const [outings, setOutings]           = useState<Outing[]>(INITIAL_OUTINGS)
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null)
  const [showMore, setShowMore]         = useState(false)
  const [returnScreen, setReturnScreen] = useState<Screen>('home-active')

  const hasOutings = outings.length > 0
  const go = (s: Screen) => setScreen(s)

  const handleTab = (t: Tab) => {
    if (t === 'more') { setShowMore(true); return }
    setTab(t)
    setShowMore(false)
    if (t === 'home')         go(hasOutings ? 'home-active' : 'home-empty')
    else if (t === 'moments') go('moments')
    else if (t === 'friends') go('friends')
  }

  const openMoment = (m: Moment) => { setActiveMoment(m); go('moment-detail') }

  const handleOutingCreated = (o: Outing) => { setOutings(prev => [...prev, o]); go('home-active') }

  const showNav = TABBED_SCREENS.includes(screen)

  const goProfile = () => { setReturnScreen(screen); setTab('more'); setShowMore(false); go('profile') }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
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
        {screen === 'create'        && <CreateOuting onBack={() => go(hasOutings ? 'home-active' : 'home-empty')} onDone={handleOutingCreated} />}
        {screen === 'outing-detail' && <OutingDetail onBack={() => go('home-active')} />}
        {screen === 'moments'       && <Moments onMomentTap={openMoment} />}
        {screen === 'moment-detail' && activeMoment && <MomentDetail moment={activeMoment} onBack={() => go('moments')} />}
        {screen === 'friends'       && <Friends />}
        {screen === 'profile'       && (
          <Profile
            onBack={() => go(returnScreen)}
            onAchievements={() => go('achievements')}
          />
        )}
        {screen === 'achievements'  && <Achievements onBack={() => go('profile')} />}
        {screen === 'wrapped'       && <Wrapped onBack={() => go('profile')} />}
        {screen === 'shop'          && <Shop onBack={() => go('profile')} />}
        {screen === 'settings'      && <Settings onBack={() => go('profile')} />}

      </div>

      {showNav && <BottomNav active={tab} onChange={handleTab} />}

      {/* More sheet */}
      {showMore && (
        <div
          onClick={() => setShowMore(false)}
          style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(10,10,10,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: C.base, borderTop: S.border, borderRadius: '20px 20px 0 0', paddingBottom: 32 }}>
            <div style={{ padding: '12px 0 4px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 40, height: 4, borderRadius: 100, background: C.grey200 }} />
            </div>
            <button
              onClick={goProfile}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', background: 'transparent', border: 'none', cursor: 'pointer', borderBottom: `1px solid ${C.grey100}`, textAlign: 'left' }}
            >
              <PersonIcon />
              <span style={{ fontFamily: F.body, fontWeight: 600, fontSize: 16, color: C.ink, flex: 1 }}>Profile</span>
              <span style={{ color: C.grey400, fontSize: 18 }}>›</span>
            </button>
            <button
              onClick={() => { setReturnScreen(screen); setShowMore(false); go('shop') }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', background: 'transparent', border: 'none', cursor: 'pointer', borderBottom: `1px solid ${C.grey100}`, textAlign: 'left' }}
            >
              <ShopIcon />
              <span style={{ fontFamily: F.body, fontWeight: 600, fontSize: 16, color: C.ink, flex: 1 }}>Shop</span>
              <span style={{ color: C.grey400, fontSize: 18 }}>›</span>
            </button>
            <button
              onClick={() => { setReturnScreen(screen); setShowMore(false); go('settings') }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <GearIcon />
              <span style={{ fontFamily: F.body, fontWeight: 600, fontSize: 16, color: C.ink, flex: 1 }}>Settings</span>
              <span style={{ color: C.grey400, fontSize: 18 }}>›</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
