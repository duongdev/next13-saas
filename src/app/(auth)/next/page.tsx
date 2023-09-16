import { redirect } from 'next/navigation'
import { type FC } from 'react'

import { getSession } from '@/lib/auth'
import { getMetadata } from '@/lib/metadata'

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
  const session = await getSession()

  if (!session?.user) {
    return redirect(`/sign-in?email=${email ?? ''}`)
  }

  if (session.orgMemberships.length === 1) {
    return redirect(`/dashboard/org/${session.orgMemberships[0].org.name}`)
  }

  return <OrgList orgMemberships={session.orgMemberships} />
}

OrgPage.displayName = 'OrgPage'

export default OrgPage
