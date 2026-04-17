import Link from 'next/link'
import { HeroForm } from '@/components/HeroForm'
import { ProtocolMockup } from '@/components/ProtocolMockup'
import { ScrollButton } from '@/components/ScrollButton'
import { StepsCards } from '@/components/StepsCards'
import { SignupSection } from '@/components/SignupSection'

export default function LandingPage() {
  return (
    <>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <HeroForm />

      {/* ── PROTOKOLL-MOCKUP ───────────────────────────────────── */}
      <ProtocolMockup />

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
          <ScrollButton
            style={{ backgroundColor: '#6FC9A8', color: '#1A3828', fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 14, padding: '11px 24px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
          >
            Reservera din plats →
          </ScrollButton>
        </div>
      </div>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#F6F3EE', borderBottom: '0.5px solid #E8E0D0' }}>
        <div className="stats-grid" style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '40px 24px' }}>
          {[
            { value: '0', label: 'kvällar med tråkigt efterarbete' },
            { value: '<1 min', label: 'för att generera protokollet' },
            { value: '88%', label: 'kortare tid från avslutat möte till utskickat protokoll*' },
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

      <div style={{ backgroundColor: '#F6F3EE', padding: '0 24px 20px' }}>
        <p style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, color: '#A89E90', lineHeight: 1.5 }}>
          * Baserat på jämförelse av genomsnittlig handläggningstid vid manuell protokollföring kontra Minuta.
        </p>
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

        <div style={{ borderTop: '0.5px solid #2A5040', padding: '52px 24px 72px' }}>
          <div className="days-grid" style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 32 }}>

            <div style={{ backgroundColor: '#0F2217', borderRadius: 12, padding: '28px 32px', border: '0.5px solid #3A6B56' }}>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#96D9BE', marginBottom: 12 }}>Förr</p>
              <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', color: '#B8E0D0', lineHeight: 1, marginBottom: 8 }}>Dagar</p>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, color: '#B8E0D0', lineHeight: 1.5, margin: 0 }}>från avslutat möte till utskickat protokoll</p>
            </div>

            <div className="days-arrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#3A6B56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3A6B56' }}>med Minuta</span>
            </div>

            <div style={{ backgroundColor: '#0F2217', borderRadius: 12, padding: '28px 32px', border: '0.5px solid #6FC9A8' }}>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6FC9A8', marginBottom: 12 }}>Nu</p>
              <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 400, fontStyle: 'italic', color: '#6FC9A8', lineHeight: 1, marginBottom: 8 }}>Minuter</p>
              <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 13, color: '#8FB5A3', lineHeight: 1.5, margin: 0 }}>Skicka för signering innan du lämnat möteslokalen</p>
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <ScrollButton
              style={{ backgroundColor: '#6FC9A8', color: '#1A3828', fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 14, padding: '13px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
            >
              Reservera din plats →
            </ScrollButton>
          </div>
        </div>
      </section>

      {/* ── HUR DET FUNGERAR ───────────────────────────────────── */}
      <StepsCards />

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
      <SignupSection />

      {/* ── VANLIGA FRÅGOR-LÄNK ─────────────────────────────────── */}
      <section style={{ backgroundColor: '#F6F3EE', padding: '56px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 15, color: '#4A6355', margin: '0 0 12px' }}>
          Har du frågor om hur Minuta fungerar?
        </p>
        <Link
          href="/vanliga-fragor"
          className="link-fade"
          style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: 15,
            fontWeight: 600,
            color: '#1A3828',
            textDecoration: 'none',
            borderBottom: '1.5px solid #6FC9A8',
            paddingBottom: 2,
            transition: 'opacity 0.15s',
          }}
        >
          Se vanliga frågor och svar →
        </Link>
      </section>
    </>
  )
}
