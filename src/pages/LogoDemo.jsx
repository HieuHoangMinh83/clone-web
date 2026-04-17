import LogoMark from '../components/shared/LogoMark/LogoMark.jsx'
import '../components/shared/LogoMark/LogoMark.css'

export default function LogoDemo() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1528',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 60,
      fontFamily: 'var(--font-sans)',
    }}>
      <h1 style={{ color: '#fff', fontSize: 14, letterSpacing: '0.2em', opacity: 0.5 }}>
        LOGO MARK DEMO — HOVER TO PAUSE
      </h1>

      {/* Newtecons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <LogoMark letter="N" />
        <span style={{ color: '#fff', fontSize: 22, fontWeight: 800, letterSpacing: '0.18em' }}>
          NEWTECONS
        </span>
      </div>

      {/* HMKgrass */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <LogoMark letter="H" />
        <span style={{ color: '#fff', fontSize: 22, fontWeight: 800, letterSpacing: '0.18em' }}>
          HMK<span style={{ color: '#4ade80' }}>grass</span>
        </span>
      </div>

      {/* Example A */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <LogoMark letter="A" />
        <span style={{ color: '#fff', fontSize: 22, fontWeight: 800, letterSpacing: '0.18em' }}>
          AURA GROUP
        </span>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 40 }}>
        {'<LogoMark letter="H" />'} — just pass the letter prop
      </p>
    </div>
  )
}
