'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MinutaLogo } from '@/components/MinutaLogo'

const ROTATING_WORDS = [
  'bostadsrättsföreningar',
  'idrottsföreningar',
  'ekonomiska föreningar',
  'ideella föreningar',
]

const FORENINGSTYPER = [
  { value: 'Bostadsrättsförening', label: 'Bostadsrättsförening' },
  { value: 'Idrottsförening', label: 'Idrottsförening' },
  { value: 'Annan ekonomisk förening', label: 'Annan ekonomisk förening' },
  { value: 'Annan ideell förening', label: 'Annan ideell förening' },
]

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

export default function LandingPage() {
  const [wordIndex, setWordIndex] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const [cardsVisible, setCardsVisible] = useState([true, true, true])
  const cardsRef = useRef<HTMLDivElement>(null)

  // Mockup animation
  const mockupRef = useRef<HTMLDivElement>(null)
  const [mockupStarted, setMockupStarted] = useState(false)
  const [mockupEl, setMockupEl] = useState<boolean[]>(Array(10).fill(false))
  const [typed3, setTyped3] = useState('')
  const [typed3Done, setTyped3Done] = useState(false)
  const [typed4, setTyped4] = useState('')
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [swipePhase, setSwipePhase] = useState<'visible'|'exit'|'enter'>('visible')
  // 2-step signup (email → foreningstyp → tack)
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [heroEmail, setHeroEmail] = useState('')
  const [foreningstyp, setForeningstyp] = useState('')
  const [loading, setLoading] = useState(false)
  const [signupError, setSignupError] = useState('')

  // Rotating hero word
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

  // Mockup: starta animation direkt på mount
  useEffect(() => {
    const timer = setTimeout(() => setMockupStarted(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mockupStarted) return
    // Reveal 10 elements sequentially, card slides in at 0, elements start at 300ms
    const BASE = 300
    const STEP = 150
    Array.from({ length: 10 }).forEach((_, i) => {
      setTimeout(() => setMockupEl(prev => { const n = [...prev]; n[i] = true; return n }), BASE + i * STEP)
    })
  }, [mockupStarted])

  const showDecision3 = mockupEl[6]
  const showDecision4 = mockupEl[8]

  // Typing § 2 (first decision)
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

  // Typing § 3 (second decision) — starts only after first is done
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

  // Swipe: cycle through scenarios after full reveal
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

  // Intersection observer — cards (staggered)
  useEffect(() => {
    const el = cardsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        [0, 1, 2].forEach(i => setTimeout(() => setCardsVisible(prev => { const n = [...prev]; n[i] = true; return n }), i * 120))
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function handleHeroEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!heroEmail.trim()) return
    setEmail(heroEmail.trim())
    setStep(2)
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleForeingstypSelect(typ: string) {
    setForeningstyp(typ)
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
    <>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#1A3828', borderBottom: '0.5px solid #2A5040', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <MinutaLogo size={32} variant="light-on-dark" />
          </Link>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="grain hero-section" style={{ position: 'relative', backgroundColor: '#F6F3EE', padding: '112px 24px 96px' }}>
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

          <form className="hero-animate hero-animate-3 hero-form" onSubmit={handleHeroEmailSubmit} aria-label="Reservera din plats hos Minuta" style={{ display: 'flex', gap: 8, maxWidth: 480, margin: '0 auto 12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <label htmlFor="hero-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
              Din e-postadress
            </label>
            <input id="hero-email" type="email" value={heroEmail} onChange={e => setHeroEmail(e.target.value)} placeholder="din@forening.se" required autoComplete="email"
              style={{ flex: 1, minWidth: 220, backgroundColor: '#fff', border: '0.5px solid #E8E0D0', borderRadius: 8, padding: '12px 16px', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 15, color: '#1A3828', outline: 'none' }} />
            <button type="submit" style={{ backgroundColor: '#6FC9A8', color: '#1A3828', fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 14, padding: '12px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Reservera min plats →
            </button>
          </form>

          {/* Social proof */}
          <p className="hero-animate hero-animate-4" style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, color: '#7A9285', margin: 0 }}>
            ✓ Testad av BRF-styrelser i Stockholm
          </p>
        </div>
      </section>

      {/* ── PROTOKOLL-MOCKUP (dold på mobil) ──────────────────── */}
      <section style={{ backgroundColor: '#F6F3EE', padding: '0 40px 80px' }} className="mockup-section">

        <div ref={mockupRef} style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>

          {/* Badge */}
          <div className={`mockup-el${mockupEl[0] ? ' show' : ''}`}
            style={{ position: 'absolute', top: 22, right: 16, zIndex: 10, backgroundColor: '#1A3828', color: '#6FC9A8', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 999, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
            Genererat under 1 min
          </div>

          {/* Rotations-wrapper */}
          <div style={{ transformOrigin: 'center top' }}>
          {/* Dokument */}
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

            {/* Dokument-header med svag grön tint */}
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

            {/* Dokument-body */}
            <div style={{ padding: '28px 32px 24px', overflow: 'hidden' }}>
              <div className={swipePhase === 'exit' ? 'swipe-exit' : swipePhase === 'enter' ? 'swipe-enter' : ''}>

              {/* 1: Rubrik */}
              <div className={`mockup-el${mockupEl[1] ? ' show' : ''}`} style={{ marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20, fontWeight: 400, color: '#1A3828', margin: '0 0 5px', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                  Protokoll fört vid styrelsemöte
                </h3>
                <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, color: '#9A9080', margin: 0, letterSpacing: '0.01em' }}>
                  {SCENARIOS[scenarioIndex].forening} &nbsp;·&nbsp; {SCENARIOS[scenarioIndex].datum} &nbsp;·&nbsp; {SCENARIOS[scenarioIndex].tid}
                </p>
              </div>

              {/* 2: Metadata */}
              <div className={`mockup-el${mockupEl[2] ? ' show' : ''} doc-section`}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
                {([
                  ['Ordförande', SCENARIOS[scenarioIndex].ordforande],
                  ['Sekreterare', SCENARIOS[scenarioIndex].sekreterare],
                  ['Justerare', SCENARIOS[scenarioIndex].justerare],
                  ['Plats', SCENARIOS[scenarioIndex].plats],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 6 }}>
                    <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, color: '#9A9080', minWidth: 72 }}>{k}</span>
                    <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, color: '#2C4A3A', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* 3: Divider */}
              <div className={`mockup-el${mockupEl[3] ? ' show' : ''}`}
                style={{ borderTop: '0.5px solid #EAE4DA', margin: '18px 0' }} />

              {/* 4+5: § 1 */}
              <div style={{ marginBottom: 16 }}>
                <p className={`mockup-el${mockupEl[4] ? ' show' : ''}`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, fontWeight: 600, color: '#1A3828', margin: '0 0 5px', display: 'flex', alignItems: 'baseline', gap: 0 }}>
                  <span className="para-num">§ 1</span> Mötets öppnande
                </p>
                <p className={`mockup-el${mockupEl[5] ? ' show' : ''}`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, color: '#4A6355', margin: 0, lineHeight: 1.65, paddingLeft: 24 }}>
                  {SCENARIOS[scenarioIndex].para1}
                </p>
              </div>

              {/* 6: § 2 rubrik + beslut */}
              <div style={{ marginBottom: 16 }}>
                <p className={`mockup-el${mockupEl[6] ? ' show' : ''}`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, fontWeight: 600, color: '#1A3828', margin: '0 0 6px', display: 'flex', alignItems: 'baseline' }}>
                  <span className="para-num">§ 2</span> {SCENARIOS[scenarioIndex].heading3}
                </p>
                <div className={`mockup-el${mockupEl[6] ? ' show' : ''}`}
                  style={{ marginLeft: 24, borderLeft: '2px solid #6FC9A8', backgroundColor: '#EDF5F0', borderRadius: '0 6px 6px 0', padding: '9px 14px', height: 58, overflow: 'hidden' }}>
                  <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, color: '#1A3828', margin: 0, lineHeight: 1.65 }}>
                    <span style={{ color: '#6FC9A8', fontWeight: 700, marginRight: 4 }}>BESLUT</span>
                    {typed3}
                    {typed3.length < SCENARIOS[scenarioIndex].text3.length && showDecision3
                      ? <span style={{ display: 'inline-block', width: 2, height: 13, backgroundColor: '#1A3828', marginLeft: 2, verticalAlign: 'text-bottom', animation: 'blink 0.75s step-end infinite' }} />
                      : null}
                  </p>
                </div>
              </div>

              {/* 7+8: § 3 (optional — only when scenario has text4) */}
              {SCENARIOS[scenarioIndex].text4 && (
              <div style={{ marginBottom: 6 }}>
                <p className={`mockup-el${mockupEl[7] ? ' show' : ''}`}
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, fontWeight: 600, color: '#1A3828', margin: '0 0 6px', display: 'flex', alignItems: 'baseline' }}>
                  <span className="para-num">§ 3</span> {SCENARIOS[scenarioIndex].heading4}
                </p>
                <div className={`mockup-el${mockupEl[8] ? ' show' : ''}`}
                  style={{ marginLeft: 24, borderLeft: '2px solid #6FC9A8', backgroundColor: '#EDF5F0', borderRadius: '0 6px 6px 0', padding: '9px 14px', height: 58, overflow: 'hidden' }}>
                  <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 12, color: '#1A3828', margin: 0, lineHeight: 1.65 }}>
                    <span style={{ color: '#6FC9A8', fontWeight: 700, marginRight: 4 }}>BESLUT</span>
                    {typed4}
                    {typed4.length < (SCENARIOS[scenarioIndex].text4?.length ?? 0) && typed3Done
                      ? <span style={{ display: 'inline-block', width: 2, height: 13, backgroundColor: '#1A3828', marginLeft: 2, verticalAlign: 'text-bottom', animation: 'blink 0.75s step-end infinite' }} />
                      : null}
                  </p>
                </div>
              </div>
              )}

              {/* 9: Signatur */}
              <div className={`mockup-el${mockupEl[9] ? ' show' : ''}`}
                style={{ borderTop: '0.5px solid #EAE4DA', marginTop: 20, paddingTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" stroke="#6FC9A8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, color: '#6FC9A8', margin: 0, letterSpacing: '0.01em' }}>
                  Signerat av {SCENARIOS[scenarioIndex].signatory} via BankID
                </p>
              </div>

              </div>{/* /swipe-wrapper */}
            </div>
          </div>
          </div>{/* /rotations-wrapper */}
        </div>
      </section>

      {/* ── ERBJUDANDE-BANNER ──────────────────────────────────── */}
      <div style={{ backgroundColor: '#1A3828', borderTop: '0.5px solid #2A5040', padding: '28px 24px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', wordBreak: 'break-word' }}>
          <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#F6F3EE', margin: '0 0 6px', lineHeight: 1.3 }}>
            De 100 första föreningarna får 3 månader gratis.
          </p>
          <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 14, color: '#8FB5A3', margin: '0 0 14px' }}>
            Reservera din plats nu. Inga kreditkortsuppgifter.
          </p>
          <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, fontWeight: 600, color: '#6FC9A8', letterSpacing: '0.02em', display: 'block', marginBottom: 20 }}>
            67 av 100 platser kvar
          </span>
          <button
            onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ backgroundColor: '#6FC9A8', color: '#1A3828', fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 14, padding: '11px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'opacity 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Reservera din plats →
          </button>
        </div>
      </div>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#F6F3EE', borderBottom: '0.5px solid #E8E0D0' }}>
        <div className="stats-grid" style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '40px 24px' }}>
          {[
            { value: '0', label: 'kvällar med tråkigt efterarbete' },
            { value: '<1 min', label: 'för att generera protokollet' },
            { value: '88%', label: 'kortare tid från avslutat möte till utskickat protokoll' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0 24px', borderRight: i < 2 ? '0.5px solid #E8E0D0' : 'none' }}>
              <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, fontStyle: 'italic', color: '#1A3828', lineHeight: 1, marginBottom: 8 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, color: '#7A9285', lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEM ────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#1A3828', padding: '72px 24px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', paddingBottom: 72 }}>
          <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7A9285', display: 'block', marginBottom: 20 }}>Problemet</span>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#F6F3EE', lineHeight: 1.25, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Protokollet tar längre tid än mötet.
          </h2>
          <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 16, lineHeight: 1.75, color: '#8FB5A3', margin: 0, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Glöm stressen med att försöka skriva och lyssna samtidigt, och slipp det tunga efterarbetet med att "fixa till" anteckningarna dagen efter. Minuta lyssnar, strukturerar och formaterar era beslut i realtid. Ni går från möte till signerat protokoll på några minuter, inte dagar.
          </p>
        </div>

        {/* ── DAYS TO MINUTES ── */}
        <div style={{ borderTop: '0.5px solid #2A5040', padding: '52px 24px 72px' }}>
          <div className="days-grid" style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 32 }}>

            {/* Förr */}
            <div style={{ backgroundColor: '#0F2217', borderRadius: 12, padding: '28px 32px', border: '0.5px solid #2A5040' }}>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A6355', marginBottom: 12 }}>Förr</p>
              <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', color: '#8FB5A3', lineHeight: 1, marginBottom: 8 }}>Dagar</p>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, color: '#4A6355', lineHeight: 1.5, margin: 0 }}>från avslutat möte till utskickat protokoll</p>
            </div>

            {/* Pil */}
            <div className="days-arrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#3A6B56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3A6B56' }}>med Minuta</span>
            </div>

            {/* Nu */}
            <div style={{ backgroundColor: '#0F2217', borderRadius: 12, padding: '28px 32px', border: '0.5px solid #6FC9A8' }}>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6FC9A8', marginBottom: 12 }}>Nu</p>
              <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', color: '#6FC9A8', lineHeight: 1, marginBottom: 8 }}>Minuter</p>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, color: '#8FB5A3', lineHeight: 1.5, margin: 0 }}>Skicka för signering innan du lämnat möteslokalen</p>
            </div>

          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ backgroundColor: '#6FC9A8', color: '#1A3828', fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Reservera din plats →
            </button>
          </div>

        </div>
      </section>

      {/* ── HUR DET FUNGERAR ───────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: '#F6F3EE', padding: '88px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 22, fontWeight: 500, color: '#1A3828', textAlign: 'center', marginBottom: 52, letterSpacing: '-0.01em' }}>
            Tre steg. Inget mer.
          </h2>
          <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              {
                icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1A3828" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>,
                step: '01', title: 'Spela in',
                text: 'Öppna Minuta i webbläsaren och starta inspelningen. Ingen app att ladda ner.',
              },
              {
                icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1A3828" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
                step: '02', title: 'Få protokollet',
                text: 'AI transkriberar mötet på svenska och genererar ett juridiskt korrekt protokoll automatiskt.',
              },
              {
                icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1A3828" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                step: '03', title: 'Signera med BankID',
                text: 'Alla berörda signerar digitalt med BankID. Protokollet sparas och är redo att arkiveras.',
              },
            ].map((card, i) => (
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

      {/* ── VARFÖR MINUTA ──────────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: '#1A3828', padding: '88px 24px' }}>
        <div className="varfor-grid" style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, fontStyle: 'italic', color: '#F6F3EE', lineHeight: 1.2, marginBottom: 16 }}>
              Byggt för svenska föreningar
            </h2>
            <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 15, color: '#7A9285', lineHeight: 1.7, margin: 0 }}>
              Minuta förstår hur svenska styrelsemöten fungerar och vad lagen kräver.
            </p>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              'Juridiskt korrekt format — anpassat för EFL och svenska föreningars krav',
              'All data lagras i Sverige — GDPR-säkert',
              'BankID-signering',
              'Exportera till PDF eller Word direkt',
            ].map((punkt, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 3 }}>
                  <path d="M20 6L9 17l-5-5" stroke="#6FC9A8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 15, lineHeight: 1.6, color: '#B8E0D0' }}>{punkt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SIGNUP ─────────────────────────────────────────────── */}
      <section id="signup" style={{ backgroundColor: '#F6F3EE', padding: '96px 24px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          {/* Card */}
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 24px rgba(26,56,40,0.10)' }}>

            {/* Top — parchment */}
            <div className="signup-card-top" style={{ backgroundColor: '#F6F3EE', padding: '40px 40px 28px', textAlign: 'center', borderBottom: '0.5px solid #E8E0D0' }}>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#1A3828', marginBottom: 8, lineHeight: 1.2 }}>
                Reservera din plats
              </h2>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 14, color: '#4A6355', margin: step < 3 ? '0 0 24px' : 0, lineHeight: 1.6 }}>
                De 100 första föreningarna får 3 månader gratis.
              </p>

              {/* Progress indicator — 2 steg */}
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

              {/* Success */}
              {step === 3 && (
                <div style={{ animation: 'fadeIn 0.5s ease', paddingTop: 8 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: '#EDF5F0', border: '1px solid #6FC9A8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#6FC9A8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 19, fontStyle: 'italic', color: '#1A3828', margin: '0 0 6px' }}>Du är med på listan.</p>
                  <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 14, color: '#4A6355', margin: 0 }}>Vi hör av oss när Minuta är redo.</p>
                </div>
              )}
            </div>

            {/* Bottom — dark green, formulär */}
            {step < 3 && (
              <div className="signup-card-bottom" style={{ backgroundColor: '#1A3828', padding: '32px 40px 40px' }}>
                {step === 1 && (
                  <form onSubmit={e => { e.preventDefault(); if (email.trim()) setStep(2) }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="din@forening.se" required
                      style={{ width: '100%', backgroundColor: '#fff', border: 'none', borderRadius: 8, padding: '15px 18px', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 16, color: '#1A3828', outline: 'none', boxSizing: 'border-box' }} />
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
                        <button key={typ.value} onClick={() => handleForeingstypSelect(typ.value)} disabled={loading}
                          style={{ backgroundColor: '#2A5040', border: '1px solid #3A6050', borderRadius: 8, padding: '16px 12px', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 14, color: '#F6F3EE', cursor: loading ? 'not-allowed' : 'pointer', transition: 'border-color 0.15s, background-color 0.15s', opacity: loading ? 0.6 : 1 }}
                          onMouseEnter={e => { if (!loading) { e.currentTarget.style.borderColor = '#6FC9A8'; e.currentTarget.style.backgroundColor = '#335A48' } }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#3A6050'; e.currentTarget.style.backgroundColor = '#2A5040' }}>
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

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#1A3828', padding: '40px 24px' }} aria-label="Sidfot">
        <div className="footer-inner" style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <Link href="/" aria-label="Minuta startsida" style={{ textDecoration: 'none' }}>
            <MinutaLogo size={28} variant="light-on-dark" />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, color: '#B8E0D0' }}>© 2026 Minuta — Stockholm, Sverige</span>
            <a href="/integritetspolicy" style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, color: '#B8E0D0', textDecoration: 'none', opacity: 0.7 }}>Integritetspolicy</a>
          </div>
        </div>
      </footer>
    </>
  )
}
