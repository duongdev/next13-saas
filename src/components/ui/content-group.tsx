import * as React from 'react'

import { cn } from '@/lib/utils'

export interface ContentGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode
  subtitle?: React.ReactNode
}

const ContentGroup = React.forwardRef<HTMLDivElement, ContentGroupProps>(
  ({ className, title, subtitle, children, ...props }, ref) => {
    return (
      <div
        className={cn('flex flex-col gap-4 lg:flex-row lg:gap-8', className)}
        ref={ref}
        {...props}
      >
        <div className="flex-1 lg:max-w-[40%] xl:min-w-[50%]">
          <div className="section-title font-title text-xl">{title}</div>
          <div className="section-subtitle text-sm text-muted-foreground">
            {subtitle}
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    )
  },
)

ContentGroup.displayName = 'ContentGroup'

export { ContentGroup }
