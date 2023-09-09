import { Metadata } from 'next'
import { type FC } from 'react'

import { Container } from '@/components/ui/container'
import { getOrgPermissions } from '@/lib/services/org-member-group'

import CreateGroupForm from './create-group-form'

export const metadata: Metadata = {
  title: 'Thêm nhóm thành viên',
}

export type CreateGroupPageProps = {
  params: {
    org: string
  }
}

const CreateGroupPage: FC<CreateGroupPageProps> = async ({
  params: { org },
}) => {
  const permissions = await getOrgPermissions(org)
  return (
    <Container>
      <CreateGroupForm permissions={permissions} />
    </Container>
  )
}

CreateGroupPage.displayName = 'CreateGroupPage'

export default CreateGroupPage
