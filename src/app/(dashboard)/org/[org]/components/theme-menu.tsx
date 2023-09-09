'use client'

import { Check, type LucideIcon, Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

type Theme = 'light' | 'dark' | 'system'

const themes: Record<
  Theme,
  {
    label: string
    icon: LucideIcon
  }
> = {
  light: {
    label: 'Sáng',
    icon: Sun,
  },
  dark: {
    label: 'Tối',
    icon: Moon,
  },
  system: {
    label: 'Tự động',
    icon: SunMoon,
  },
}

export default function ThemeMenu() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Giao diện</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-40">
          {Object.entries(themes).map(([key, { label, icon: Icon }]) => (
            <DropdownMenuItem
              key={key}
              className="flex items-center gap-2"
              onClick={() => setTheme(key as Theme)}
            >
              <Icon className="w-4 text-primary" />
              <div className="flex-1">{label}</div>
              {theme === key && <Check className="w-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
