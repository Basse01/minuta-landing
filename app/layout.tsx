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
    default: 'Minuta — Automatiserade mötesprotokoll för föreningar',
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
    title: 'Minuta — Automatiserade mötesprotokoll för föreningar',
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
    title: 'Minuta — Automatiserade mötesprotokoll',
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
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'SEK',
        description: 'Registrera intresse gratis',
      },
      inLanguage: 'sv',
      provider: {
        '@type': 'Organization',
        '@id': 'https://minuta.se/#org',
        name: 'Minuta',
        url: 'https://minuta.se',
      },
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
