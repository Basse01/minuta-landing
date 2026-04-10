import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Minuta — Automatiserade mötesprotokoll för föreningar'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1A3828',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 100px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 22,
            background: '#1A3828',
            border: '2.5px solid #6FC9A8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 36,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 4 }}>
            <div style={{ width: 52, height: 6, borderRadius: 3, background: '#6FC9A8' }} />
            <div style={{ width: 38, height: 5, borderRadius: 3, background: 'rgba(111,201,168,0.55)' }} />
            <div style={{ width: 45, height: 5, borderRadius: 3, background: 'rgba(111,201,168,0.55)' }} />
            <div style={{ width: 28, height: 5, borderRadius: 3, background: 'rgba(111,201,168,0.35)' }} />
          </div>
        </div>

        {/* Wordmark */}
        <div
          style={{
            color: '#6FC9A8',
            fontSize: 64,
            fontStyle: 'italic',
            fontWeight: 400,
            letterSpacing: '-2px',
            marginBottom: 20,
          }}
        >
          minuta
        </div>

        {/* Headline */}
        <div
          style={{
            color: '#F6F3EE',
            fontSize: 34,
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.35,
            marginBottom: 20,
            fontFamily: 'Georgia, serif',
          }}
        >
          Automatiserade mötesprotokoll för föreningar
        </div>

        {/* Subline */}
        <div
          style={{
            color: '#7A9285',
            fontSize: 22,
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 400,
          }}
        >
          Spela in → Transkribera → Juridiskt korrekt protokoll på 1 minut
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'rgba(111,201,168,0.6)',
            fontSize: 16,
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          minuta.se
        </div>
      </div>
    ),
    { ...size }
  )
}
