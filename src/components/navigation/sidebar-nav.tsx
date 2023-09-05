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
    <div className="z-10 w-60 border-r p-2">
      <div className="flex items-center justify-between gap-4">
        {orgProfile}
        {userProfile}
      </div>
      <div className="mt-4">
        <div className="flex flex-col gap-2">
          {menus.map((menu, idx) => (
            <NavMenu {...menu} key={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}
