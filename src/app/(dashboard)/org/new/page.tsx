import { type FC } from 'react'

import AuthRedirect from '@/components/auth-redirect'
import { PageHeader } from '@/components/ui/page-header'
import { getSession } from '@/lib/auth'
import { getMetadata } from '@/lib/metadata'

import CreateOrgForm from './create-org-form'

export const metadata = getMetadata({
  title: 'Tạo tổ chức mới',
})

export type NewOrgPageProps = {}

const NewOrgPage: FC<NewOrgPageProps> = async () => {
  const session = await getSession()

  if (!session) {
    return <AuthRedirect />
  }

  return (
    <div className="container max-w-lg py-4 md:py-8 lg:py-12">
      <PageHeader withBackButton title="Tạo tổ chức mới" />
      <CreateOrgForm />
    </div>
  )
}

NewOrgPage.displayName = 'NewOrgPage'

export default NewOrgPage
