'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MinutaLogo } from '@/components/MinutaLogo'

const NAV_LINKS = [
  { href: '/produkt', label: 'Produkt' },
  { href: '/priser', label: 'Priser' },
  { href: '/om-oss', label: 'Om oss' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: '#1A3828',
          borderBottom: '0.5px solid #2A5040',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <MinutaLogo size={32} variant="light-on-dark" />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Huvudnavigation"
            style={{ display: 'flex', alignItems: 'center', gap: 32 }}
            className="desktop-nav"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={isActive ? 'nav-link-active' : undefined}
                  style={{
                    fontFamily: 'DM Sans, system-ui, sans-serif',
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#6FC9A8' : '#B8E0D0',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                    letterSpacing: '0.01em',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#6FC9A8' }}
                  onMouseLeave={e => { e.currentTarget.style.color = isActive ? '#6FC9A8' : '#B8E0D0' }}
                >
                  {label}
                </Link>
              )
            })}

            <Link
              href="/#signup"
              style={{
                fontFamily: 'DM Sans, system-ui, sans-serif',
                fontSize: 14,
                fontWeight: 700,
                color: '#1A3828',
                backgroundColor: '#6FC9A8',
                textDecoration: 'none',
                padding: '9px 20px',
                borderRadius: 8,
                letterSpacing: '0.01em',
                transition: 'background-color 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#5BB99A' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#6FC9A8' }}
            >
              Börja minuta
            </Link>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              display: 'none',
              color: '#F6F3EE',
            }}
          >
            {menuOpen ? (
              /* X icon */
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" stroke="#F6F3EE" strokeWidth={2} strokeLinecap="round" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="#F6F3EE" strokeWidth={2} strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#0F2217',
            zIndex: 40,
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            animation: 'fadeIn 0.15s ease',
          }}
          role="dialog"
          aria-label="Mobilmeny"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'DM Sans, system-ui, sans-serif',
                fontSize: 20,
                fontWeight: 500,
                color: pathname === href ? '#6FC9A8' : '#F6F3EE',
                textDecoration: 'none',
                padding: '16px 0',
                borderBottom: '0.5px solid #2A5040',
                display: 'block',
              }}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/#signup"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              marginTop: 24,
              fontFamily: 'DM Sans, system-ui, sans-serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#1A3828',
              backgroundColor: '#6FC9A8',
              textDecoration: 'none',
              padding: '16px 24px',
              borderRadius: 8,
              textAlign: 'center',
            }}
          >
            Börja minuta
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
