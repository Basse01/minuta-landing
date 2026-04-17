'use client'

import Link from 'next/link'
import { MinutaLogo } from '@/components/MinutaLogo'

const PAGE_LINKS = [
  { href: '/produkt', label: 'Produkt' },
  { href: '/priser', label: 'Priser' },
  { href: '/om-oss', label: 'Om oss' },
  { href: '/vanliga-fragor', label: 'Vanliga frågor' },
  { href: '/integritetspolicy', label: 'Integritetspolicy' },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A3828', padding: '48px 24px 40px' }} aria-label="Sidfot">
      <div
        className="footer-inner"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 32,
        }}
      >
        {/* Logo + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link href="/" aria-label="Minuta startsida" style={{ textDecoration: 'none' }}>
            <MinutaLogo size={28} variant="light-on-dark" />
          </Link>
          <span
            style={{
              fontFamily: 'DM Sans, system-ui, sans-serif',
              fontSize: 13,
              color: '#6FC9A8',
              opacity: 0.7,
            }}
          >
            Mötesprotokoll på minuter, inte dagar.
          </span>
        </div>

        {/* Nav links */}
        <nav aria-label="Sidlänkar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
          {PAGE_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'DM Sans, system-ui, sans-serif',
                fontSize: 13,
                color: '#B8E0D0',
                textDecoration: 'none',
                opacity: 0.8,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.8' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <span
          style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: 13,
            color: '#B8E0D0',
            opacity: 0.5,
            alignSelf: 'flex-end',
            width: '100%',
            textAlign: 'right',
            marginTop: 8,
          }}
          className="footer-copyright"
        >
          © 2026 Minuta — Stockholm, Sverige
        </span>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-copyright { text-align: left !important; }
        }
      `}</style>
    </footer>
  )
}
