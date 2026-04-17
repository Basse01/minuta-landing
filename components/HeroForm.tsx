'use client'

import { useState, useEffect } from 'react'

const ROTATING_WORDS = [
  'bostadsrättsföreningar',
  'idrottsföreningar',
  'ekonomiska föreningar',
  'ideella föreningar',
]

export function HeroForm() {
  const [wordIndex, setWordIndex] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const [heroEmail, setHeroEmail] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => {
        setWordIndex(i => (i + 1) % ROTATING_WORDS.length)
        setWordVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!heroEmail.trim()) return
    sessionStorage.setItem('minuta_email', heroEmail.trim())
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="grain hero-section hero-gradient" style={{ position: 'relative', padding: '112px 24px 96px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <div className="hero-animate hero-animate-1">
          <h1 className="hero-title" style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2.4rem, 5.5vw, 3.5rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
            <span style={{ color: '#1A3828', display: 'block', margin: '0 0 4px' }}>
              Minuta är mötesverktyget för
            </span>
            <span style={{ color: '#6FC9A8', display: 'block', minHeight: '1.2em' }}>
              <span className={`word-fade ${wordVisible ? 'visible' : 'hidden'}`}>{ROTATING_WORDS[wordIndex]}</span>
            </span>
          </h1>
        </div>

        <p className="hero-animate hero-animate-2" style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 18, lineHeight: 1.65, color: '#4A6355', maxWidth: 520, margin: '0 auto 28px' }}>
          Spela in mötet i webbläsaren. Få ett juridiskt korrekt protokoll på under 1 minut. Signera med BankID. Klart.
        </p>

        <form className="hero-animate hero-animate-3 hero-form" onSubmit={handleSubmit} aria-label="Reservera din plats hos Minuta" style={{ display: 'flex', gap: 8, maxWidth: 480, margin: '0 auto 12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <label htmlFor="hero-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
            Din e-postadress
          </label>
          <input
            id="hero-email"
            type="email"
            value={heroEmail}
            onChange={e => setHeroEmail(e.target.value)}
            placeholder="din@forening.se"
            required
            autoComplete="email"
            style={{ flex: 1, minWidth: 220, backgroundColor: '#fff', border: '0.5px solid #E8E0D0', borderRadius: 8, padding: '12px 16px', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 15, color: '#1A3828', outline: 'none' }}
          />
          <button type="submit" style={{ backgroundColor: '#6FC9A8', color: '#1A3828', fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 14, padding: '12px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Reservera min plats →
          </button>
        </form>

        <p className="hero-animate hero-animate-4" style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, color: '#7A9285', margin: 0 }}>
          ✓ Testad av BRF-styrelser i Stockholm
        </p>
      </div>
    </section>
  )
}
