import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Screens — stub placeholders until each is built
function Splash() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '48px 20px 24px', background: '#FAFAF0', gap: 32,
    }}>
      <div style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontWeight: 700, fontSize: 56, lineHeight: 1,
        color: '#0A0A0A', letterSpacing: '-0.02em', textAlign: 'center',
      }}>
        mego<br />
        <span style={{ color: '#FF5C9A', WebkitTextStroke: '2px #0A0A0A' }}>wego</span>
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        fontSize: 15, color: '#6B6760', textAlign: 'center', maxWidth: 280,
      }}>
        plan outings. show up. roast the ones who don't.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <button style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontWeight: 600, fontSize: 16, height: 52,
          background: '#0A0A0A', color: '#FAFAF0', border: 'none',
          borderRadius: 16, boxShadow: '4px 4px 0 0 #0A0A0A',
          cursor: 'pointer', width: '100%',
        }}>let's go →</button>
        <button style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontWeight: 600, fontSize: 16, height: 52,
          background: 'transparent', color: '#0A0A0A', border: 'none',
          borderRadius: 16, cursor: 'pointer', width: '100%',
        }}>already one of us? sign in</button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
