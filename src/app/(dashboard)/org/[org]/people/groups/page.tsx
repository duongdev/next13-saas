import { Metadata } from 'next'
import Link from 'next/link'
import type { FC } from 'react'

import { Plus } from 'lucide-react'

import EmptyState from '@/components/states/empty-state'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Nhóm thành viên',
}

export type UserGroupsPageProps = {}

const Page: FC<UserGroupsPageProps> = () => {
  return (
    <div className="w-full px-4 py-4 md:mx-auto md:max-w-5xl md:py-8">
      <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
        <h1 className="text-4xl font-semibold">Nhóm thành viên</h1>
        <Button variant="default">
          <Plus className="mr-1 w-4" /> Thêm nhóm
        </Button>
      </div>

      <div>
        <EmptyState
          title="Hãy bắt đầu bằng cách tạo nhóm"
          action={
            <Button asChild>
              <Link href="./groups/create">
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
    </div>
  )
}

export default Page
