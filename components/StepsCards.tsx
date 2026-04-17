'use client'

import { useState, useEffect, useRef } from 'react'

const STEPS = [
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1A3828" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    step: '01',
    title: 'Spela in',
    text: 'Öppna Minuta i webbläsaren och starta inspelningen. Ingen app att ladda ner.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1A3828" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    step: '02',
    title: 'Få protokollet',
    text: 'AI transkriberar mötet på svenska och genererar ett juridiskt korrekt protokoll automatiskt.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1A3828" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    step: '03',
    title: 'Signera med BankID',
    text: 'Alla berörda signerar digitalt med BankID. Protokollet sparas och är redo att arkiveras.',
  },
]

export function StepsCards() {
  const [cardsVisible, setCardsVisible] = useState([false, false, false])
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        [0, 1, 2].forEach(i =>
          setTimeout(() => setCardsVisible(prev => { const n = [...prev]; n[i] = true; return n }), i * 120)
        )
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section-padding" style={{ backgroundColor: '#F6F3EE', padding: '88px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 22, fontWeight: 500, color: '#1A3828', textAlign: 'center', marginBottom: 52, letterSpacing: '-0.01em' }}>
          Tre steg. Inget mer.
        </h2>
        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {STEPS.map((card, i) => (
            <div key={i} className={`feature-card card-reveal ${cardsVisible[i] ? 'visible' : 'hidden'}`}
              style={{ backgroundColor: '#ffffff', borderRadius: 12, border: '0.5px solid #E8E0D0', padding: '28px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                {card.icon}
                <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', color: '#B8E0D0' }}>{card.step}</span>
              </div>
              <h3 style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 17, fontWeight: 500, color: '#1A3828', marginBottom: 8 }}>{card.title}</h3>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 15, lineHeight: 1.65, color: '#4A6355', margin: 0 }}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
