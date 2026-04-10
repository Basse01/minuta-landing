'use client'

import { useState } from 'react'

const FAQ_ITEMS = [
  {
    question: 'Vad är ett AI-drivet mötesprotokoll?',
    answer:
      'Ett AI-drivet mötesprotokoll är ett beslutsprotokoll som genereras automatiskt av artificiell intelligens utifrån en inspelning av ett styrelsemöte. Med Minuta spelar du in mötet i webbläsaren. Minuta transkriberar inspelningen på svenska med hjälp av AI och skapar sedan ett juridiskt korrekt beslutsprotokoll enligt EFL (Lagen om ekonomiska föreningar, 2018:672). Protokollet innehåller alla obligatoriska delar: mötesuppgifter, deltagare, dagordningspunkter och tydliga beslut. Du slipper skriva för hand under mötet och slippar det tunga efterarbetet. AI gör allt det åt dig.',
  },
  {
    question: 'Hur lång tid tar det att generera ett mötesprotokoll med Minuta?',
    answer:
      'Med Minuta tar det under en minut att generera ett färdigt mötesprotokoll efter att mötet är avslutat. Traditionellt tar det dagar från avslutat möte till ett utskickat och signerat protokoll. Minuta kortar den tiden med 88 procent. Du avslutar inspelningen, AI transkriberar och strukturerar mötet automatiskt, och du får ett komplett beslutsprotokoll i klar text. Protokollet kan sedan redigeras, skickas för BankID-signering och exporteras som PDF eller Word, allt i samma verktyg.',
  },
  {
    question: 'Är Minuta GDPR-säkert?',
    answer:
      'Ja, Minuta är GDPR-säkert. All data lagras i Sverige och lämnar aldrig landet. Vi använder Azure OpenAI med databehandling i Sweden Central (Stockholm) och Deepgram via EU-endpoint för transkribering. Din förenings inspelningar, transkriptioner och protokoll sparas i en databas med servrar i Europa. Minuta delar aldrig din data med tredje part och säljer den aldrig vidare. Föreningen äger alltid sin data och kan begära radering när som helst.',
  },
  {
    question: 'Fungerar Minuta för alla typer av svenska föreningar?',
    answer:
      'Minuta fungerar för alla typer av svenska föreningar som håller styrelsemöten och behöver föra beslutsprotokoll. Det inkluderar bostadsrättsföreningar (BRF), idrottsföreningar, ekonomiska föreningar och ideella föreningar. Protokollformatet är anpassat efter EFL (Lagen om ekonomiska föreningar) och svenska föreningars juridiska krav. Oavsett om din förening är en liten lokal idrottsförening eller en stor BRF med hundratals lägenheter fungerar Minuta lika bra.',
  },
  {
    question: 'Vad krävs juridiskt i ett BRF-styrelseprotokoll enligt EFL?',
    answer:
      'Enligt EFL (Lagen om ekonomiska föreningar, 2018:672) ska ett BRF-styrelseprotokoll innehålla: datum och plats för mötet, vilka som deltog och i vilken egenskap, vem som var ordförande och sekreterare, de ärenden som behandlades, de beslut som fattades med erforderlig röstuppgift, samt underskrift av protokollföraren och justeringsman. Protokollet ska justeras och förvaras på ett betryggande sätt. Minuta genererar automatiskt ett protokoll som uppfyller alla dessa krav, i ett juridiskt korrekt beslutsprotokollformat.',
  },
  {
    question: 'Hur fungerar BankID-signering i Minuta?',
    answer:
      'Med Minuta kan alla berörda parter signera mötesprotokoll digitalt med BankID direkt i verktyget. Efter att protokollet är genererat och eventuellt redigerat skickar du ut en signeringslänk till ordförande och justeringsman. De signerar var och en med sitt BankID, mobilt eller på dator. När alla har signerat låses protokollet och sparas med digitala signaturer. Signeringen är juridiskt bindande och likställd med en handskriven underskrift. Du behöver aldrig skriva ut, scanna eller skicka papper.',
  },
  {
    question: 'Kan jag exportera protokollet till PDF eller Word?',
    answer:
      'Ja, du kan exportera det färdiga mötesprotokoll till både PDF och Word (DOCX) direkt från Minuta. PDF-versionen är lämplig för arkivering och utskick till medlemmar. Word-versionen lämpar sig om din förening vill anpassa formateringen ytterligare enligt egna mallar. Exporten sker med ett knapptryck och innehåller alla uppgifter från protokollet inklusive digitala signaturer från BankID-signeringen.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section style={{ backgroundColor: '#F6F3EE', padding: '88px 24px' }} aria-label="Vanliga frågor">
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#7A9285', display: 'block', marginBottom: 14 }}>
            Vanliga frågor
          </span>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#1A3828', margin: 0, lineHeight: 1.2 }}>
            Allt du behöver veta om Minuta
          </h2>
        </div>

        {/* FAQ items */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} style={{
                backgroundColor: '#fff',
                borderRadius: i === 0 ? '10px 10px 0 0' : i === FAQ_ITEMS.length - 1 ? '0 0 10px 10px' : 0,
                border: '0.5px solid #E8E0D0',
                borderBottom: i === FAQ_ITEMS.length - 1 ? '0.5px solid #E8E0D0' : 'none',
                overflow: 'hidden',
              }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    gap: 16,
                  }}
                >
                  <span style={{
                    fontFamily: 'DM Sans, system-ui, sans-serif',
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#1A3828',
                    lineHeight: 1.4,
                    flex: 1,
                  }}>
                    {item.question}
                  </span>
                  {/* Chevron */}
                  <svg
                    width="18" height="18" fill="none" viewBox="0 0 24 24"
                    style={{ flexShrink: 0, transition: 'transform 0.25s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <path d="M6 9l6 6 6-6" stroke="#6FC9A8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Answer — atomsvar 134–167 ord, för AI-citering */}
                {isOpen && (
                  <div style={{ padding: '0 24px 22px', borderTop: '0.5px solid #F0EAE0' }}>
                    <p style={{
                      fontFamily: 'DM Sans, system-ui, sans-serif',
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: '#4A6355',
                      margin: '16px 0 0',
                    }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
