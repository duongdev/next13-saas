'use client'
import Link from 'next/link'
import { type FC } from 'react'

import { Org, OrgMembership } from '@prisma/client'

import OrgLogo from '@/components/org-logo'
import EmptyState from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'

export type OrgListProps = {
  orgMemberships: (OrgMembership & {
    org: Org
  })[]
}

const OrgList: FC<OrgListProps> = ({ orgMemberships: members }) => {
  if (members.length === 0) {
    return (
      <div className="container mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-8 py-4 md:py-8">
        <EmptyState
          image="/assets/illustrations/engineer.svg"
          title="Welcome!"
          description={
            <>
              Bạn chưa có tổ chức nào.
              <br />
              Hãy tạo một tổ chức để bắt đầu.
            </>
          }
        />
        <Button asChild className="min-w-[200px]">
          <Link href="/org/new">Bắt đầu thôi</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-screen max-w-lg py-4 md:py-8">
      <PageHeader
        title="Chọn tổ chức"
        action={
          <Button asChild>
            <Link href="/org/new">Thêm tổ chức mới</Link>
          </Button>
        }
      />

      <div className="flex flex-col gap-2 md:gap-4">
        {members.map((member) => (
          <OrgItem key={member.orgId} org={member.org} />
        ))}
      </div>
    </div>
  )
}

const OrgItem: FC<{ org: Org }> = ({ org }) => {
  return (
    <Link
      className="-m-2 flex items-center gap-3 rounded-md p-2 hover:bg-muted"
      href={`/org/${org.namespace}`}
    >
      <OrgLogo className="h-12 w-12 shrink-0" org={org} />
      <div>
        <div className="getNameFallback font-title">{org.name}</div>
        <div className="getNameFallback text-sm text-slate-600">
          {org.namespace}
        </div>
      </div>
    </Link>
  )
}

OrgList.displayName = 'OrgList'

export default OrgList
