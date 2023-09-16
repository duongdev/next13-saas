import Link from 'next/link'
import { useParams } from 'next/navigation'
import { type FC } from 'react'

import { Check } from 'lucide-react'

import OrgLogo from '@/components/org-logo'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Session } from '@/lib/auth'
import { cn } from '@/lib/utils'

export type OrgMembersProps = {
  email: string | null
  orgMemberships: Session['orgMemberships']
}

const OrgMembers: FC<OrgMembersProps> = ({ email, orgMemberships }) => {
  const params = useParams()
  const orgIdOrNS = params.org as string

  return (
    <>
      {email && (
        <DropdownMenuLabel className="truncate font-title">
          {email}
        </DropdownMenuLabel>
      )}
      {orgMemberships.map((membership) => (
        <Link
          key={membership.id}
          passHref
          href={`/org/${membership.org.namespace}`}
        >
          <DropdownMenuItem className="cursor-pointer">
            <div className="flex w-full items-center gap-2">
              <OrgLogo className="h-6 w-6 text-xs" org={membership.org} />
              <div className="flex-1 truncate">{membership.org.name}</div>
              <Check
                className={cn('w-4 text-primary', {
                  hidden: ![
                    membership.orgId,
                    membership.org.namespace,
                  ].includes(orgIdOrNS),
                })}
              />
            </div>
          </DropdownMenuItem>
        </Link>
      ))}
    </>
  )
}

OrgMembers.displayName = 'OrgMembers'

export default OrgMembers
