import { type FC } from 'react'

import EmptyState from '@/components/states/empty-state'

export type NotFoundProps = {}

const NotFound: FC<NotFoundProps> = () => {
  return (
    <div className="flex h-full">
      <EmptyState
        className="m-auto"
        description="Trang bạn đang tìm kiếm không tồn tại"
        image="/assets/illustrations/falling.svg"
        title="404 Not found"
      />
    </div>
  )
}

NotFound.displayName = 'NotFound'

export default NotFound
