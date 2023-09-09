import * as React from 'react'

import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full px-4 py-4 md:mx-auto md:max-w-5xl md:py-8',
          className,
        )}
        {...props}
      />
    )
  },
)

Container.displayName = 'Container'

export { Container }
