import { forwardRef } from 'react'

import LoadingCircle from '@/components/icons/loading-circle'
import { cn } from '@/lib/utils'

export type FullscreenLoadingProps = {
  className?: string
}

const FullscreenLoading = forwardRef<HTMLDivElement, FullscreenLoadingProps>(
  ({ className }, ref) => {
    return (
      <div
        className={cn('grid h-screen place-items-center', className)}
        ref={ref}
      >
        <LoadingCircle className="h-8 w-8" />
      </div>
    )
  },
)

FullscreenLoading.displayName = 'FullscreenLoading'

export default FullscreenLoading
