'use client'

import { ButtonHTMLAttributes } from 'react'

interface ScrollButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  targetId?: string
}

export function ScrollButton({ targetId = 'signup', children, ...props }: ScrollButtonProps) {
  return (
    <button
      {...props}
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })}
    >
      {children}
    </button>
  )
}
