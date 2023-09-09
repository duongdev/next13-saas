import { Metadata } from 'next'
import Link from 'next/link'
import type { FC } from 'react'

import { Plus } from 'lucide-react'

import EmptyState from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { PageHeader } from '@/components/ui/page-header'

export const metadata: Metadata = {
  title: 'Nhóm thành viên',
}

export type UserGroupsPageProps = {}

const Page: FC<UserGroupsPageProps> = () => {
  return (
    <Container>
      <PageHeader
        title="Nhóm thành viên"
        action={
          <Button asChild variant="default">
            <Link prefetch href="./groups/create">
              <Plus className="mr-1 w-4" /> Thêm nhóm
            </Link>
          </Button>
        }
      />

      <div>
        <EmptyState
          image="/assets/illustrations/creative-work.svg"
          title="Hãy bắt đầu bằng cách tạo nhóm"
          action={
            <Button asChild>
              <Link prefetch href="./groups/create">
                <Plus className="mr-1 w-4" />
                Tạo nhóm
              </Link>
            </Button>
          }
          description={
            <div className="text-center">
              Bạn có thể tạo nhiều nhóm và thêm thành viên vào nhóm.
              <br />
              Mỗi nhóm có thể có một số nhiệm vụ cụ thể.
            </div>
          }
        />
      </div>
    </Container>
  )
}

export default Page
