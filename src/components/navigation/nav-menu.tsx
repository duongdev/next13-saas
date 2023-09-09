'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, type FC, type ReactNode, useState } from 'react'

import { cn } from '@/lib/utils'

import LazyLucidIcon, { IconName } from '../icons/lazy-lucid-icon'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

export type NavMenuProps = {
  label: ReactNode
  icon?: IconName
  href?: string
  items?: NavMenuProps[]
  matchChildren?: string[]
}

const NavMenu: FC<NavMenuProps> = ({
  label,
  href,
  icon,
  items,
  matchChildren,
}) => {
  const pathname = usePathname().replace(/\/$/, '')
  const Cmp = useMemo(() => (href ? Link : 'div'), [href])

  const isActive = useMemo(() => {
    if (!href) return false
    if (href === pathname) return true
    if (matchChildren?.includes(pathname)) return true
    return false
  }, [href, matchChildren, pathname])

  const [isExpanded, setIsExpanded] = useState(
    getDefaultExpanded(items ?? [], pathname),
  )

  const menuItem = useMemo(() => {
    return (
      <Cmp
        className={cn(
          'flex items-center gap-2 rounded-md px-2 py-1',
          isActive && 'bg-muted',
        )}
        {...(href
          ? { href, role: 'button' }
          : { href: '', onClick: () => setIsExpanded(!isExpanded) })}
      >
        {icon && (
          <LazyLucidIcon
            className="w-4 text-slate-600 dark:text-slate-300"
            name={icon}
            strokeWidth={3}
          />
        )}
        <div className="flex-1 font-sans text-sm font-medium">{label}</div>
      </Cmp>
    )
  }, [Cmp, href, icon, isActive, isExpanded, label])

  if (!items?.length) {
    return (
      <div>
        {menuItem}

        <div className={cn('ml-4', { 'animate-accordion-down': isExpanded })}>
          {items?.map((item, idx) => <NavMenu {...item} key={idx} />)}
        </div>
      </div>
    )
  }

  return (
    <Accordion
      collapsible
      className="w-full"
      type="single"
      value={isExpanded ? 'expanded' : ''}
      onValueChange={(value) => setIsExpanded(value === 'expanded')}
    >
      <AccordionItem className="border-none" value="expanded">
        <AccordionTrigger
          className="p-0 hover:no-underline"
          onChange={console.log}
        >
          {menuItem}
        </AccordionTrigger>
        <AccordionContent className="pl-4 [&>div]:pb-0">
          {items?.map((item, idx) => <NavMenu {...item} key={idx} />)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

// Recursively check if any of the items or its children matches the pathname
const getDefaultExpanded = (items: NavMenuProps[], pathname: string) => {
  if (!items) return false
  if (items.find((item) => item.href === pathname)) return true
  if (items.find((item) => item.matchChildren?.includes(pathname))) return true

  if (items.find((item) => getDefaultExpanded(item.items ?? [], pathname)))
    return true

  return false
}

export default NavMenu
