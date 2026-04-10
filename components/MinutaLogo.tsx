import { MinutaIcon } from './MinutaIcon'

type Variant = 'dark-on-light' | 'light-on-dark'

export function MinutaLogo({
  size = 32,
  variant = 'dark-on-light',
}: {
  size?: number
  variant?: Variant
}) {
  const wordmarkColor = variant === 'light-on-dark' ? '#F6F3EE' : '#1A3828'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.28 + 'px' }}>
      <MinutaIcon size={size} />
      <span
        style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: size * 0.58 + 'px',
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '-0.5px',
          color: wordmarkColor,
          lineHeight: 1,
        }}
      >
        minuta
      </span>
    </div>
  )
}
