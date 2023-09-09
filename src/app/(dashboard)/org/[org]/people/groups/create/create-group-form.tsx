'use client'

import { type FC } from 'react'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { type OrgPermission } from '@/lib/services/org-member-group'

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
            title="Thêm nhóm thành viên"
            action={
              <Button className="font-title" type="submit">
                Tạo nhóm
              </Button>
            }
          />
          {fields}
        </>
      )}
    </PeopleGroupForm>
  )
}

CreateGroupForm.displayName = 'CreateGroupForm'

export default CreateGroupForm
