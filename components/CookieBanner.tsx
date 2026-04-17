'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie-consent')
      if (!consent) setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookiemedgivande"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#0F2217',
        borderTop: '0.5px solid #2A5040',
        padding: '16px 24px',
        animation: 'slideIn 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <p
          style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: 14,
            color: '#B8E0D0',
            margin: 0,
            lineHeight: 1.5,
            flex: 1,
            minWidth: 200,
          }}
        >
          Vi använder cookies för att förbättra din upplevelse.{' '}
          <Link
            href="/integritetspolicy"
            style={{ color: '#6FC9A8', textDecoration: 'underline' }}
          >
            Läs vår integritetspolicy
          </Link>
          .
        </p>

        <button
          onClick={accept}
          style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: 14,
            fontWeight: 700,
            color: '#1A3828',
            backgroundColor: '#6FC9A8',
            border: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background-color 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#5BB99A' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#6FC9A8' }}
        >
          Acceptera
        </button>
      </div>
    </div>
  )
}
