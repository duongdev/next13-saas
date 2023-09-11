import { redirect } from 'next/navigation'
import { type FC } from 'react'

import { getServerSession } from 'next-auth'

import SignOut from '@/components/sign-out'
import { Button } from '@/components/ui/button'

export type OrgPageProps = {
  searchParams: {
    source?: 'signed_out' | 'signed_in'
    email?: string
    provider?: 'email'
  }
}

const OrgPage: FC<OrgPageProps> = async ({ searchParams: { email } }) => {
  const session = await getServerSession()

  if (!session?.user) {
    return redirect(`/sign-in?email=${email ?? ''}`)
  }

  return (
    <>
      Welcome {session?.user?.email}{' '}
      <SignOut withConfirmation>
        <Button>Sign Out</Button>
      </SignOut>
    </>
  )
}

OrgPage.displayName = 'OrgPage'

export default OrgPage
