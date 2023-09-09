import { type ReactNode } from 'react'

import NavMenu, { NavMenuProps } from './nav-menu'

export type SidebarNavProps = {
  orgProfile: ReactNode
  userProfile: ReactNode
  menus?: NavMenuProps[]
}

export default function SidebarNav({
  orgProfile,
  userProfile,
  menus = [],
}: SidebarNavProps) {
  return (
    <div className="z-10 flex w-60 flex-col gap-3 overflow-hidden border-r p-2">
      <div className="flex items-center justify-between gap-4">
        {orgProfile}
        {userProfile}
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-2">
          {menus.map((menu, idx) => (
            <NavMenu {...menu} key={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}
