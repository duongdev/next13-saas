import { ReactNode } from 'react'

export type SidebarNavProps = {
  orgProfile: ReactNode
  userProfile: ReactNode
}

export default function SidebarNav({
  orgProfile,
  userProfile,
}: SidebarNavProps) {
  return (
    <div className="z-10 w-60 border-r p-2">
      <div className="flex items-center justify-between gap-4">
        {orgProfile}
        {userProfile}
      </div>
    </div>
  )
}
