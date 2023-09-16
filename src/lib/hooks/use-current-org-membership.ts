import { useParams } from 'next/navigation'

import { useSessionData } from './use-session-data'

export function useCurrentOrgMembership() {
  const session = useSessionData()
  const params = useParams()
  const orgIdOrNS = params.org as string

  if (!(session && orgIdOrNS)) {
    return null
  }

  const { orgMemberships } = session

  const currentOrgMembership = orgMemberships.find(
    (membership) =>
      membership.orgId === orgIdOrNS || membership.org.namespace === orgIdOrNS,
  )

  return currentOrgMembership || null
}
