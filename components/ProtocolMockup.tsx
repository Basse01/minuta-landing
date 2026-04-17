'use client'

import { useState, useEffect } from 'react'

const SCENARIOS = [
  {
    forening: 'BRF Solsidan',
    datum: '8 april 2026', tid: 'Kl. 18:30',
    ordforande: 'Anna Svensson', sekreterare: 'Erik Lindberg',
    justerare: 'Maria Holm', plats: 'Föreningslokalen',
    para1: 'Ordförande Anna Svensson förklarade mötet öppnat och hälsade samtliga ledamöter välkomna. Konstaterades att mötet är behörigt utlyst.',
    heading3: 'Underhållsplan 2026',
    text3: 'Styrelsen beslutade att godkänna underhållsplanen för 2026 med en total budget om 840 000 kr.',
    heading4: 'Byte av fastighetsskötare',
    text4: 'Styrelsen beslutade att teckna avtal med Fastighetsservice AB fr.o.m. 1 juni 2026.',
    signatory: 'Anna Svensson och Maria Holm',
  },
  {
    forening: 'IFK Solna FK',
    datum: '14 april 2026', tid: 'Kl. 19:00',
    ordforande: 'Marcus Berg', sekreterare: 'Sofia Lindqvist',
    justerare: 'Johan Karlsson', plats: 'Klubbhuset',
    para1: 'Ordförande Marcus Berg förklarade mötet öppnat och hälsade samtliga ledamöter välkomna. Konstaterades att mötet är behörigt utlyst.',
    heading3: 'Tränarkontrakt 2026/27',
    text3: 'Styrelsen beslutade att förlänga kontraktet med huvudtränare Per Nilsson t.o.m. säsongen 2026/27.',
    heading4: 'Ansökan konstgräs',
    text4: 'Styrelsen beslutade att ansöka om bidrag hos Riksidrottsförbundet för anläggning av konstgräsplan.',
    signatory: 'Marcus Berg och Johan Karlsson',
  },
  {
    forening: 'Kooperativet Ekorren',
    datum: '22 april 2026', tid: 'Kl. 18:00',
    ordforande: 'Lena Öberg', sekreterare: 'David Persson',
    justerare: 'Karin Strand', plats: 'Förskolans matsal',
    para1: 'Ordförande Lena Öberg förklarade mötet öppnat och hälsade samtliga ledamöter välkomna. Konstaterades att mötet är behörigt utlyst.',
    heading3: 'Budget hösttermin 2026',
    text3: 'Styrelsen beslutade att fastställa budgeten för höstterminen 2026 med en omslutning om 620 000 kr.',
    heading4: 'Inköp utematerial',
    text4: 'Styrelsen beslutade att bevilja inköp av ny utomhusutrustning till en kostnad om högst 45 000 kr.',
    signatory: 'Lena Öberg och Karin Strand',
  },
]

export function ProtocolMockup() {
  const [mockupStarted, setMockupStarted] = useState(false)
  const [mockupEl, setMockupEl] = useState<boolean[]>(Array(10).fill(false))
  const [typed3, setTyped3] = useState('')
  const [typed3Done, setTyped3Done] = useState(false)
  const [typed4, setTyped4] = useState('')
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [swipePhase, setSwipePhase] = useState<'visible' | 'exit' | 'enter'>('visible')

  useEffect(() => {
    const timer = setTimeout(() => setMockupStarted(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mockupStarted) return
    const BASE = 300
    const STEP = 150
    Array.from({ length: 10 }).forEach((_, i) => {
      setTimeout(() => setMockupEl(prev => { const n = [...prev]; n[i] = true; return n }), BASE + i * STEP)
    })
  }, [mockupStarted])

  const showDecision3 = mockupEl[6]

  useEffect(() => {
    if (!showDecision3) return
    const text = SCENARIOS[scenarioIndex].text3
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped3(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setTyped3Done(true) }
    }, 22)
    return () => clearInterval(id)
  }, [showDecision3, scenarioIndex])

  useEffect(() => {
    const text4 = SCENARIOS[scenarioIndex].text4
    if (!typed3Done || !text4) return
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped4(text4.slice(0, i))
      if (i >= text4.length) clearInterval(id)
    }, 22)
    return () => clearInterval(id)
  }, [typed3Done, scenarioIndex])

  useEffect(() => {
    if (!mockupEl[9]) return
    const VISIBLE = 5000
    const EXIT_MS = 400
    const ENTER_MS = 500
    const timeout = setTimeout(() => {
      setSwipePhase('exit')
      setTimeout(() => {
        setScenarioIndex(i => (i + 1) % SCENARIOS.length)
        setTyped3('')
        setTyped3Done(false)
        setTyped4('')
        setSwipePhase('enter')
        setTimeout(() => setSwipePhase('visible'), ENTER_MS)
      }, EXIT_MS)
    }, VISIBLE)
    return () => clearTimeout(timeout)
  }, [mockupEl[9], scenarioIndex])

  const scenario = SCENARIOS[scenarioIndex]

  return (
    <section style={{ backgroundColor: '#F6F3EE', padding: '0 40px 80px' }} className="mockup-section">
      <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>

        <div className={`mockup-el${mockupEl[0] ? ' show' : ''}`}
          style={{ position: 'absolute', top: 22, right: 16, zIndex: 10, backgroundColor: '#1A3828', color: '#6FC9A8', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 999, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          Genererat under 1 min
        </div>

        <div style={{ transformOrigin: 'center top' }}>
          <div style={{
            backgroundColor: '#FDFCFA',
            borderRadius: 14,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 12px 40px rgba(0,0,0,0.10)',
            borderTop: '3px solid #1A3828',
            overflow: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale' as const,
            textRendering: 'optimizeLegibility' as const,
            animation: mockupStarted ? 'mockupSlide 0.65s cubic-bezier(0.22,1,0.36,1) both' : 'none',
            opacity: mockupStarted ? undefined : 0,
          }}>

            <div className={`mockup-el${mockupEl[0] ? ' show' : ''}`}
              style={{ backgroundColor: '#F2F8F5', padding: '18px 32px 16px', borderBottom: '0.5px solid #E0D8CC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="11" fill="#1A3828"/>
                  <rect x="12" y="13" width="24" height="3" rx="1.5" fill="#6FC9A8"/>
                  <rect x="12" y="20" width="18" height="2" rx="1" fill="rgba(111,201,168,0.6)"/>
                  <rect x="12" y="26" width="21" height="2" rx="1" fill="rgba(111,201,168,0.6)"/>
                  <rect x="12" y="32" width="14" height="2" rx="1" fill="rgba(111,201,168,0.35)"/>
                  <text x="33" y="38" fontFamily="Georgia, serif" fontSize="11" fill="#6FC9A8" fontStyle="italic">§</text>
                </svg>
                <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontStyle: 'italic', fontSize: 12, color: '#1A3828', letterSpacing: '-0.2px' }}>minuta</span>
              </div>
              <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 10, color: '#9A9080', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Utkast</span>
            </div>

            <div style={{ padding: '28px 32px 24px', overflow: 'hidden' }}>
              <div className={swipePhase === 'exit' ? 'swipe-exit' : swipePhase === 'enter' ? 'swipe-enter' : ''}>

                <div className={`mockup-el${mockupEl[1] ? ' show' : ''}`} style={{ marginBottom: 20 }}>
                  <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20, fontWeight: 400, color: '#1A3828', margin: '0 0 5px', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                    Protokoll fört vid styrelsemöte
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, color: '#9A9080', margin: 0, letterSpacing: '0.01em' }}>
                    {scenario.forening} &nbsp;·&nbsp; {scenario.datum} &nbsp;·&nbsp; {scenario.tid}
                  </p>
                </div>

                <div className={`mockup-el${mockupEl[2] ? ' show' : ''} doc-section`}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
                  {([
                    ['Ordförande', scenario.ordforande],
                    ['Sekreterare', scenario.sekreterare],
                    ['Justerare', scenario.justerare],
                    ['Plats', scenario.plats],
                  ] as [string, string][]).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, color: '#9A9080', minWidth: 72 }}>{k}</span>
                      <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, color: '#2C4A3A', fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div className={`mockup-el${mockupEl[3] ? ' show' : ''}`}
                  style={{ borderTop: '0.5px solid #EAE4DA', margin: '18px 0' }} />

                <div style={{ marginBottom: 16 }}>
                  <p className={`mockup-el${mockupEl[4] ? ' show' : ''}`}
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, fontWeight: 600, color: '#1A3828', margin: '0 0 5px', display: 'flex', alignItems: 'baseline', gap: 0 }}>
                    <span className="para-num">§ 1</span> Mötets öppnande
                  </p>
                  <p className={`mockup-el${mockupEl[5] ? ' show' : ''}`}
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, color: '#4A6355', margin: 0, lineHeight: 1.65, paddingLeft: 24 }}>
                    {scenario.para1}
                  </p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <p className={`mockup-el${mockupEl[6] ? ' show' : ''}`}
                    style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, fontWeight: 600, color: '#1A3828', margin: '0 0 6px', display: 'flex', alignItems: 'baseline' }}>
                    <span className="para-num">§ 2</span> {scenario.heading3}
                  </p>
                  <div className={`mockup-el${mockupEl[6] ? ' show' : ''}`}
                    style={{ marginLeft: 24, borderLeft: '2px solid #6FC9A8', backgroundColor: '#EDF5F0', borderRadius: '0 6px 6px 0', padding: '9px 14px', minHeight: 58 }}>
                    <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, color: '#1A3828', margin: 0, lineHeight: 1.65 }}>
                      <span style={{ color: '#6FC9A8', fontWeight: 700, marginRight: 4 }}>BESLUT</span>
                      {typed3}
                      {typed3.length < scenario.text3.length && showDecision3
                        ? <span style={{ display: 'inline-block', width: 2, height: 13, backgroundColor: '#1A3828', marginLeft: 2, verticalAlign: 'text-bottom', animation: 'blink 0.75s step-end infinite' }} />
                        : null}
                    </p>
                  </div>
                </div>

                {scenario.text4 && (
                  <div style={{ marginBottom: 6 }}>
                    <p className={`mockup-el${mockupEl[7] ? ' show' : ''}`}
                      style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, fontWeight: 600, color: '#1A3828', margin: '0 0 6px', display: 'flex', alignItems: 'baseline' }}>
                      <span className="para-num">§ 3</span> {scenario.heading4}
                    </p>
                    <div className={`mockup-el${mockupEl[8] ? ' show' : ''}`}
                      style={{ marginLeft: 24, borderLeft: '2px solid #6FC9A8', backgroundColor: '#EDF5F0', borderRadius: '0 6px 6px 0', padding: '9px 14px', minHeight: 58 }}>
                      <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, color: '#1A3828', margin: 0, lineHeight: 1.65 }}>
                        <span style={{ color: '#6FC9A8', fontWeight: 700, marginRight: 4 }}>BESLUT</span>
                        {typed4}
                        {typed4.length < (scenario.text4?.length ?? 0) && typed3Done
                          ? <span style={{ display: 'inline-block', width: 2, height: 13, backgroundColor: '#1A3828', marginLeft: 2, verticalAlign: 'text-bottom', animation: 'blink 0.75s step-end infinite' }} />
                          : null}
                      </p>
                    </div>
                  </div>
                )}

                <div className={`mockup-el${mockupEl[9] ? ' show' : ''}`}
                  style={{ borderTop: '0.5px solid #EAE4DA', marginTop: 20, paddingTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" stroke="#6FC9A8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, color: '#6FC9A8', margin: 0, letterSpacing: '0.01em' }}>
                    Signerat av {scenario.signatory} via BankID
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
