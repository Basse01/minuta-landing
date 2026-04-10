import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#1A3828',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Document lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 8 }}>
          <div style={{ width: 90, height: 10, borderRadius: 5, background: '#6FC9A8' }} />
          <div style={{ width: 68, height: 8, borderRadius: 4, background: 'rgba(111,201,168,0.55)' }} />
          <div style={{ width: 80, height: 8, borderRadius: 4, background: 'rgba(111,201,168,0.55)' }} />
          <div style={{ width: 52, height: 8, borderRadius: 4, background: 'rgba(111,201,168,0.35)' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
