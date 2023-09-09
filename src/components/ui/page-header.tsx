import * as React from 'react'

import { cn } from '@/lib/utils'

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  title: React.ReactNode
  action?: React.ReactNode
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-4 flex flex-wrap items-center justify-between gap-4 md:mb-8',
          className,
        )}
        {...props}
      >
        <h1 className="text-4xl font-semibold">{title}</h1>
        <div>{action}</div>
      </div>
    )
  },
)

PageHeader.displayName = 'PageHeader'

export { PageHeader }
