'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, type FC } from 'react'

import FullscreenLoading from './ui/fullscreen-loading'

export type AuthRedirectProps = {}

// Redirects to /sign-in?next={current path}
const AuthRedirect: FC<AuthRedirectProps> = () => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchString = useSearchParams().toString()

  const next = encodeURIComponent(`${pathname}?${searchString}`)

  useEffect(() => {
    replace(`/sign-in?next=${next}`)
  }, [next, replace])

  return <FullscreenLoading />
}

AuthRedirect.displayName = 'AuthRedirect'

export default AuthRedirect
