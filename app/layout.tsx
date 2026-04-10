import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://minuta.se'),
  title: {
    default: 'Minuta - Automatiserade mötesprotokoll för föreningar',
    template: '%s | Minuta',
  },
  description:
    'Spela in mötet i webbläsaren. Minuta transkriberar och genererar ett juridiskt korrekt beslutsprotokoll på under 1 minut. För BRF, idrottsföreningar och ekonomiska föreningar.',
  keywords: [
    'mötesprotokoll',
    'automatiskt protokoll',
    'brf protokoll',
    'bostadsrättsförening protokoll',
    'AI mötesprotokoll',
    'styrelseprotokoll',
    'protokollföring',
    'föreningsprotokoll',
    'digitalt mötesprotokoll',
  ],
  authors: [{ name: 'Minuta', url: 'https://minuta.se' }],
  creator: 'Minuta',
  publisher: 'Minuta',
  alternates: {
    canonical: 'https://minuta.se',
    languages: { 'sv-SE': 'https://minuta.se' },
  },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://minuta.se',
    siteName: 'Minuta',
    title: 'Minuta - Automatiserade mötesprotokoll för föreningar',
    description:
      'Spela in mötet i webbläsaren. Få ett juridiskt korrekt beslutsprotokoll på under 1 minut. Testad av BRF-styrelser i Stockholm.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Minuta — Automatiserade mötesprotokoll',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@minutase',
    title: 'Minuta - Automatiserade mötesprotokoll',
    description: 'Spela in mötet. Få juridiskt korrekt protokoll på under 1 minut.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

const faqItems = [
  {
    question: 'Vad är ett AI-drivet mötesprotokoll?',
    answer:
      'Ett AI-drivet mötesprotokoll är ett beslutsprotokoll som genereras automatiskt av artificiell intelligens utifrån en inspelning av ett styrelsemöte. Med Minuta spelar du in mötet i webbläsaren. Minuta transkriberar inspelningen på svenska med hjälp av AI och skapar sedan ett juridiskt korrekt beslutsprotokoll enligt EFL (Lagen om ekonomiska föreningar, 2018:672). Protokollet innehåller alla obligatoriska delar: mötesuppgifter, deltagare, dagordningspunkter och tydliga beslut. Du slipper skriva för hand under mötet och slippar det tunga efterarbetet — AI gör allt det åt dig.',
  },
  {
    question: 'Hur lång tid tar det att generera ett mötesprotokoll med Minuta?',
    answer:
      'Med Minuta tar det under en minut att generera ett färdigt mötesprotokoll efter att mötet är avslutat. Traditionellt tar det dagar från avslutat möte till ett utskickat och signerat protokoll. Minuta kortar den tiden med 88 procent. Du avslutar inspelningen, AI transkriberar och strukturerar mötet automatiskt, och du får ett komplett beslutsprotokoll i klar text. Protokollet kan sedan redigeras, skickas för BankID-signering och exporteras som PDF eller Word — allt i samma verktyg.',
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
      'Med Minuta kan alla berörda parter signera mötesprotokoll digitalt med BankID direkt i verktyget. Efter att protokollet är genererat och eventuellt redigerat skickar du ut en signeringslänk till ordförande och justeringsman. De signerar var och en med sitt BankID — mobilt eller på dator. När alla har signerat låses protokollet och sparas med digitala signaturer. Signeringen är juridiskt bindande och likställd med en handskriven underskrift. Du behöver aldrig skriva ut, scanna eller skicka papper.',
  },
  {
    question: 'Kan jag exportera protokollet till PDF eller Word?',
    answer:
      'Ja, du kan exportera det färdiga mötesprotokoll till både PDF och Word (DOCX) direkt från Minuta. PDF-versionen är lämplig för arkivering och utskick till medlemmar. Word-versionen lämpar sig om din förening vill anpassa formateringen ytterligare enligt egna mallar. Exporten sker med ett knapptryck och innehåller alla uppgifter från protokollet inklusive digitala signaturer från BankID-signeringen.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://minuta.se/#app',
      name: 'Minuta',
      url: 'https://minuta.se',
      description:
        'AI-driven tjänst som automatiskt transkriberar styrelsemöten och genererar juridiskt korrekta beslutsprotokoll enligt EFL för svenska föreningar.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      featureList: [
        'AI-transkribering på svenska',
        'BankID-signering',
        'GDPR-säkert — all data i Sverige',
        'Juridiskt korrekt format enligt EFL',
        'Export till PDF och Word',
        'Beslutsprotokoll på under 1 minut',
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'SEK',
        description: 'Gratis för de 100 första föreningarna',
      },
      audience: {
        '@type': 'Audience',
        audienceType:
          'Bostadsrättsföreningar, idrottsföreningar, ekonomiska föreningar och ideella föreningar i Sverige',
      },
      inLanguage: 'sv-SE',
      provider: {
        '@type': 'Organization',
        '@id': 'https://minuta.se/#org',
        name: 'Minuta',
        url: 'https://minuta.se',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://minuta.se/#faq',
      mainEntity: faqItems.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    },
    {
      '@type': 'Organization',
      '@id': 'https://minuta.se/#org',
      name: 'Minuta',
      url: 'https://minuta.se',
      description: 'Automatiserade mötesprotokoll för svenska föreningar.',
      foundingLocation: {
        '@type': 'Place',
        addressLocality: 'Stockholm',
        addressCountry: 'SE',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Sverige',
      },
      knowsAbout: [
        'Mötesprotokoll',
        'Bostadsrättsföreningar',
        'Styrelseprotokoll',
        'EFL — Lagen om ekonomiska föreningar',
        'AI-transkribering',
        'BankID-signering',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://minuta.se/#website',
      url: 'https://minuta.se',
      name: 'Minuta',
      inLanguage: 'sv-SE',
      publisher: { '@id': 'https://minuta.se/#org' },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-parchment text-brand-primary font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
