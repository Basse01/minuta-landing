'use client'

import { useState, useEffect } from 'react'

const FORENINGSTYPER = [
  { value: 'Bostadsrättsförening', label: 'Bostadsrättsförening' },
  { value: 'Idrottsförening', label: 'Idrottsförening' },
  { value: 'Annan ekonomisk förening', label: 'Annan ekonomisk förening' },
  { value: 'Annan ideell förening', label: 'Annan ideell förening' },
]

export function SignupSection() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [signupError, setSignupError] = useState('')

  // Pre-fill email if set by hero form
  useEffect(() => {
    const saved = sessionStorage.getItem('minuta_email')
    if (saved) {
      setEmail(saved)
      setStep(2)
      sessionStorage.removeItem('minuta_email')
    }
  }, [])

  async function handleForeingstypSelect(typ: string) {
    setLoading(true)
    setSignupError('')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, foreningstyp: typ, foreningsnamn: '' }),
      })
      const data = await res.json()
      if (!res.ok) { setSignupError(data.error || 'Något gick fel'); setLoading(false); return }
      setStep(3)
    } catch { setSignupError('Nätverksfel — försök igen') }
    finally { setLoading(false) }
  }

  return (
    <section id="signup" style={{ backgroundColor: '#F6F3EE', padding: '96px 24px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 24px rgba(26,56,40,0.10)' }}>

          <div className="signup-card-top" style={{ backgroundColor: '#F6F3EE', padding: '40px 40px 28px', textAlign: 'center', borderBottom: '0.5px solid #E8E0D0' }}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#1A3828', marginBottom: 8, lineHeight: 1.2 }}>
              Reservera din plats
            </h2>
            <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 14, color: '#4A6355', margin: step < 3 ? '0 0 24px' : 0, lineHeight: 1.6 }}>
              De 100 första föreningarna får 3 månader gratis.
            </p>

            {step < 3 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {[1, 2].map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      backgroundColor: step >= s ? '#1A3828' : '#E8E0D0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background-color 0.3s'
                    }}>
                      <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, fontWeight: 600, color: step >= s ? '#F6F3EE' : '#7A9285' }}>{s}</span>
                    </div>
                    {s < 2 && <div style={{ width: 32, height: 1, backgroundColor: step > s ? '#1A3828' : '#E8E0D0', transition: 'background-color 0.3s' }} />}
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div style={{ animation: 'fadeIn 0.5s ease', paddingTop: 8 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: '#EDF5F0', border: '1px solid #6FC9A8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" stroke="#6FC9A8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 19, fontStyle: 'italic', color: '#1A3828', margin: '0 0 6px' }}>Du är med på listan.</p>
                <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 14, color: '#4A6355', margin: 0 }}>Vi hör av oss när Minuta är redo.</p>
              </div>
            )}
          </div>

          {step < 3 && (
            <div className="signup-card-bottom" style={{ backgroundColor: '#1A3828', padding: '32px 40px 40px' }}>
              {step === 1 && (
                <form onSubmit={e => { e.preventDefault(); if (email.trim()) setStep(2) }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="din@forening.se"
                    required
                    style={{ width: '100%', backgroundColor: '#fff', border: 'none', borderRadius: 8, padding: '15px 18px', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 16, color: '#1A3828', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <button type="submit" style={{ width: '100%', backgroundColor: '#6FC9A8', color: '#1A3828', fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 16, padding: '15px 24px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                    Reservera min plats →
                  </button>
                  <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, color: '#6FC9A8', margin: '4px 0 0', textAlign: 'center' }}>
                    67 av 100 platser kvar
                  </p>
                </form>
              )}

              {step === 2 && (
                <div style={{ animation: 'slideIn 0.3s ease' }}>
                  <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 14, fontWeight: 500, color: '#B8E0D0', marginBottom: 14, textAlign: 'left' }}>Vilken typ av förening?</p>
                  {signupError && <p style={{ color: '#F4A4A4', fontSize: 13, marginBottom: 12, fontFamily: 'DM Sans, system-ui, sans-serif' }}>{signupError}</p>}
                  <div className="signup-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {FORENINGSTYPER.map(typ => (
                      <button
                        key={typ.value}
                        onClick={() => handleForeingstypSelect(typ.value)}
                        disabled={loading}
                        style={{ backgroundColor: '#2A5040', border: '1px solid #3A6050', borderRadius: 8, padding: '16px 12px', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 14, color: '#F6F3EE', cursor: loading ? 'not-allowed' : 'pointer', transition: 'border-color 0.15s, background-color 0.15s', opacity: loading ? 0.6 : 1 }}
                        onMouseEnter={e => { if (!loading) { e.currentTarget.style.borderColor = '#6FC9A8'; e.currentTarget.style.backgroundColor = '#335A48' } }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#3A6050'; e.currentTarget.style.backgroundColor = '#2A5040' }}
                      >
                        {typ.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
