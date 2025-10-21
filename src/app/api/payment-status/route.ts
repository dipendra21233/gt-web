import CryptoJS from 'crypto-js'
import { NextRequest, NextResponse } from 'next/server'

const AES_KEY = '1400012829905020'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  // Parse x-www-form-urlencoded
  const body: Record<string, string> = {}
  rawBody.split('&').forEach((pair) => {
    const [key, value] = pair.split('=')
    if (key) body[decodeURIComponent(key)] = decodeURIComponent(value || '')
  })

  // Decrypt values
  const decrypted: Record<string, string> = {}
  Object.keys(body).forEach((key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(
        body[key],
        CryptoJS.enc.Utf8.parse(AES_KEY),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      )
      decrypted[key] = bytes.toString(CryptoJS.enc.Utf8) || body[key]
    } catch {
      decrypted[key] = body[key]
    }
  })

  // Save into cookies for the page to read
  const payload = { rawData: body, decryptedData: decrypted }
  const cookieValue = Buffer.from(JSON.stringify(payload)).toString('base64')

  const res = NextResponse.redirect(new URL('/payment-status', req.url))
  res.cookies.set('payment_response', cookieValue, { httpOnly: true })
  return res
}
