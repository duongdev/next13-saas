import { type ReactNode, type FC } from 'react'

import { cn } from '@/lib/utils'

import BlurImage from '../ui/blur-image'

export type EmptyStateProps = {
  title?: ReactNode
  description?: ReactNode
  image?: string | false
  action?: ReactNode
  className?: string
}

const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  image = '/assets/illustrations/cute-dog-with-a-bone.svg',
  action,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {!!image && (
        <BlurImage
          priority
          alt="Cute dog with a bone"
          className="h-auto w-80 dark:invert"
          height={400}
          src={image}
          width={400}
        />
      )}
      {title && <h3 className="text-2xl font-semibold">{title}</h3>}
      {description && <div className="text-gray-500">{description}</div>}
      {action}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'

export default EmptyState
