'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { ChevronLeft } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from './button'

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  title: React.ReactNode
  subtitle?: React.ReactNode
  action?: React.ReactNode
  withBackButton?:
    | true
    | {
        href: string
        label?: string
      }
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, subtitle, action, withBackButton, ...props }, ref) => {
    const { back } = useRouter()

    const backButton = React.useMemo(() => {
      if (!withBackButton) return null

      const label =
        (typeof withBackButton === 'object' && withBackButton.label) ||
        'Quay lại'

      return (
        <Button
          className="-ml-1 h-7 pl-0 pr-1.5 text-muted-foreground"
          size="sm"
          type="button"
          variant="ghost"
          asChild={
            !!(typeof withBackButton === 'object' && withBackButton.href)
          }
          onClick={
            typeof withBackButton === 'object' && withBackButton.href
              ? undefined
              : () => {
                  back()
                }
          }
        >
          {typeof withBackButton === 'object' && withBackButton.href ? (
            <Link href={withBackButton.href}>
              <ChevronLeft className="mr-1 w-5" />
              {label}
            </Link>
          ) : (
            <>
              <ChevronLeft className="mr-1 w-5" />
              {label}
            </>
          )}
        </Button>
      )
    }, [back, withBackButton])

    return (
      <>
        {backButton}
        <div
          ref={ref}
          className={cn(
            'mb-4 flex flex-wrap items-start justify-between gap-4 md:mb-8',
            className,
          )}
          {...props}
        >
          <div>
            <h1 className="text-4xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div>{action}</div>
        </div>
      </>
    )
  },
)

PageHeader.displayName = 'PageHeader'

export { PageHeader }
