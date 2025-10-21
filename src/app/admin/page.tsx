import { ACCESS_TOKEN } from '@/utils/constant'
import { appRoutes } from '@/utils/routes'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

function getCookieValue(
  cookieHeader: string | null,
  name: string
): string | undefined {
  if (!cookieHeader) return undefined
  const parts = cookieHeader.split(';')
  for (const part of parts) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) {
      return decodeURIComponent(rest.join('='))
    }
  }
  return undefined
}

async function checkAuthentication() {
  const h = await headers()
  const cookieHeader = h.get('cookie')
  const token = getCookieValue(cookieHeader, ACCESS_TOKEN)
  if (token) {
    redirect(appRoutes.userRequests)
  } else {
    redirect(appRoutes.login)
  }
}

export default async function Admin() {
  await checkAuthentication()
}
