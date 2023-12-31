import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export type OrgLogoProps = {
  org: {
    name: string
    namespace?: string | null
    logoUrl?: string | null
  }
  className?: string
}

const getNameFallback = (name: string) => {
  name = name.toUpperCase()
  const words = name.split(' ')

  if (words.length === 1) {
    return name[0]
  }

  return words[0][0] + words[words.length - 1][0]
}

const OrgLogo = forwardRef<HTMLDivElement, OrgLogoProps>(
  ({ org: { name, namespace, logoUrl }, className }, ref) => {
    return (
      <Avatar className={cn('rounded-md', className)} ref={ref}>
        {logoUrl && <AvatarImage alt={namespace || name} src={logoUrl} />}
        <AvatarFallback className="rounded-md bg-slate-600 font-title text-muted dark:bg-slate-100">
          {getNameFallback(name)}
        </AvatarFallback>
      </Avatar>
    )
  },
)

OrgLogo.displayName = 'OrgLogo'

export default OrgLogo
