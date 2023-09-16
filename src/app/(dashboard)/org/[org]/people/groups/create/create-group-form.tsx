'use client'

import { type FC } from 'react'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { type OrgPermission } from '@/lib/fetchers/org-member-group'

import PeopleGroupForm from '../components/people-group-form'

export type CreateGroupFormProps = {
  permissions: Record<string, OrgPermission>
}

const CreateGroupForm: FC<CreateGroupFormProps> = ({ permissions }) => {
  return (
    <PeopleGroupForm permissions={permissions} onSubmit={console.log}>
      {({ fields }) => (
        <>
          <PageHeader
            action={<Button type="submit">Tạo nhóm</Button>}
            title="Thêm nhóm thành viên"
            withBackButton={{
              href: './',
              label: 'Danh sách nhóm',
            }}
          />
          {fields}
        </>
      )}
    </PeopleGroupForm>
  )
}

CreateGroupForm.displayName = 'CreateGroupForm'

export default CreateGroupForm
