import { Check, Moon, Sun, SunMoon } from 'lucide-react'

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

export default function ThemeMenu() {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Giao diện</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-40">
          <DropdownMenuItem className="flex items-center gap-2">
            <Sun className="w-4 text-primary" />
            <div className="flex-1">Sáng</div>
            <Check className="w-4 text-primary" />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Moon className="w-4 text-primary" />
            <div className="flex-1">Tối</div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <SunMoon className="w-4 text-primary" />
            <div className="flex-1">Tự động</div>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
