export function MinutaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Minuta"
    >
      <rect width="48" height="48" rx="11" fill="#1A3828" />
      <rect x="12" y="13" width="24" height="3" rx="1.5" fill="#6FC9A8" />
      <rect x="12" y="20" width="18" height="2" rx="1" fill="rgba(111,201,168,0.55)" />
      <rect x="12" y="26" width="21" height="2" rx="1" fill="rgba(111,201,168,0.55)" />
      <rect x="12" y="32" width="14" height="2" rx="1" fill="rgba(111,201,168,0.35)" />
      <text
        x="33"
        y="38"
        fontFamily="Georgia, serif"
        fontSize="11"
        fill="#6FC9A8"
        fontStyle="italic"
      >
        §
      </text>
    </svg>
  )
}
