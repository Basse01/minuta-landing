import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: '#1A3828',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 2 }}>
          <div style={{ width: 16, height: 2, borderRadius: 1, background: '#6FC9A8' }} />
          <div style={{ width: 12, height: 1.5, borderRadius: 1, background: 'rgba(111,201,168,0.55)' }} />
          <div style={{ width: 14, height: 1.5, borderRadius: 1, background: 'rgba(111,201,168,0.55)' }} />
          <div style={{ width: 9, height: 1.5, borderRadius: 1, background: 'rgba(111,201,168,0.35)' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
