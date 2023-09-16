import { useSession } from 'next-auth/react'

import { Session } from '../auth'

export function useSessionData() {
  const session = useSession()

  return session.data as Session | null
}
