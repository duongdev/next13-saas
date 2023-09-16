import { redirect } from 'next/navigation'
import { type FC } from 'react'

import { getSession } from '@/lib/auth'
import { getMetadata } from '@/lib/metadata'
import { devDelay } from '@/lib/utils'

import OrgList from './org-list'

export const metadata = getMetadata({
  title: 'Chọn tổ chức',
})

export type OrgPageProps = {
  searchParams: {
    source?: 'signed_out' | 'signed_in'
    email?: string
    provider?: 'email'
  }
}

const OrgPage: FC<OrgPageProps> = async ({ searchParams: { email } }) => {
  const session = await devDelay(await getSession())

  if (!session?.user) {
    return redirect(`/sign-in?email=${email ?? ''}`)
  }

  if (session.orgMemberships.length === 1) {
    return redirect(`/org/${session.orgMemberships[0].org.namespace}`)
  }

  return <OrgList orgMemberships={session.orgMemberships} />
}

OrgPage.displayName = 'OrgPage'

export default OrgPage
