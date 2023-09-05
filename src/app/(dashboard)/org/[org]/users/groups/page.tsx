import { Metadata } from 'next'
import type { FC } from 'react'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Nhóm người dùng',
}

export type UserGroupsPageProps = {}

const Page: FC<UserGroupsPageProps> = () => {
  return (
    <div className="w-full px-4 py-4 md:mx-auto md:max-w-5xl md:py-8">
      <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
        <h1 className="text-4xl font-semibold">Nhóm người dùng</h1>
        <Button variant="default">
          <Plus className="mr-1 w-4" /> Thêm nhóm
        </Button>
      </div>

      <div className="text-muted-foreground">Chưa có nhóm nào được tạo.</div>
    </div>
  )
}

export default Page
