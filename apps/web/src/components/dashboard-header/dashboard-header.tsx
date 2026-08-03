'use client'

import React from 'react'
import { Globe, UserCircle, ChartNoAxesCombined, Bot } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'

const DashboardHeader = () => {
  const pathname = usePathname()
  const { user } = useUser()

  const portfolioItems = [
    {
      title: user?.firstName || 'User',
      icon: UserCircle,
      path: '/dashboard',
      color: 'text-muted-foreground'
    },
    {
      title: 'Domain Vault',
      icon: Globe,
      path: '/dashboard/domainvault',
      color: 'text-emerald-500'
    },
    {
      title: 'Report & Analytics',
      icon: ChartNoAxesCombined,
      path: '/dashboard/report',
      color: 'text-sky-500'
    },
    {
      title: 'AI Domain Tracker',
      icon: Bot,
      path: '/dashboard/renewals',
      color: 'text-violet-500'
    }
  ]

  const currentItem = portfolioItems.find((item) => item.path === pathname)
  const Title = currentItem?.title || 'User Dashboard'
  const Icon = currentItem?.icon || UserCircle
  const Color = currentItem?.color || 'text-muted-foreground'

  const isMainDashboard = pathname === '/dashboard'
  const userFirstName = user?.firstName || 'User'

  return (
    <div className="h-full w-auto">
      <div className="flex items-center justify-end px-2 md:px-5 py-[0.88rem] w-full">
        <div
          className={`flex items-center justify-center gap-3 ${isMainDashboard ? 'ml-auto pr-2' : ''}`}
        >
          {!isMainDashboard && <Icon className={`h-5 w-5 ${Color}`} />}
          <span className="text-foreground font-semibold text-[15px] max-md:text-sm">
            {isMainDashboard ? `Welcome, ${userFirstName}` : Title}
          </span>

          {isMainDashboard && (
            <div className="ml-auto flex items-center gap-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
