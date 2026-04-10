import { NextRequest, NextResponse } from 'next/server'

const LOOPS_API_KEY = process.env.LOOPS_API_KEY

const ALLOWED_FORENINGSTYPER = [
  'Bostadsrättsförening',
  'Idrottsförening',
  'Annan ekonomisk förening',
  'Annan ideell förening',
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, foreningstyp, beskrivning } = body

    // Validera email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ogiltig e-postadress' }, { status: 400 })
    }

    if (!foreningstyp || !ALLOWED_FORENINGSTYPER.includes(foreningstyp)) {
      return NextResponse.json({ error: 'Ogiltig föreningstyp' }, { status: 400 })
    }

    // Om ingen API-nyckel är konfigurerad, returnera success ändå (dev-läge)
    if (!LOOPS_API_KEY) {
      console.warn('[signup] LOOPS_API_KEY saknas — sparar inte till Loops')
      return NextResponse.json({ success: true })
    }

    const loopsRes = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOOPS_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        userGroup: foreningstyp,
        source: 'landing-page',
        ...(beskrivning ? { beskrivning: String(beskrivning).slice(0, 500) } : {}),
      }),
    })

    // 409 = redan registrerad — behandla som success
    if (loopsRes.status === 409) {
      return NextResponse.json({ success: true })
    }

    if (!loopsRes.ok) {
      const errText = await loopsRes.text()
      console.error('[signup] Loops API error:', errText)
      return NextResponse.json({ error: 'Kunde inte registrera' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[signup] error:', err)
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 })
  }
}
