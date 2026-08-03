'use client'

import {
  Bot,
  Globe,
  ChartNoAxesCombined,
  Moon,
  Sun,
  HomeIcon,
  User2,
  ChevronUp,
  PieChart
} from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'
import { cn } from '@/lib/utils'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import Logo from '../logo/logo'
import { UserButton, useUser } from '@clerk/nextjs'

// Menu items.
const items = [
  { title: 'Dashboard', url: '/dashboard', icon: PieChart },
  { title: 'Domain Vault', url: '/dashboard/domainvault', icon: Globe },
  {
    title: 'Report & Analytics',
    url: '/dashboard/report',
    icon: ChartNoAxesCombined
  },
  { title: 'AI Tracking', url: '/dashboard/renewals', icon: Bot }
]

export function AppSidebar() {
  const user = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleItemClick = (url: string) => {
    router.push(url)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const userFirstName = user.user?.firstName || 'Champ!'

  return (
    <Sidebar side="left">
      <SidebarHeader>
        <div className="border-b border-black/[0.05] py-3 flex flex-col justify-center items-start dark:border-white/[0.06]">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className=" uppercase text-[11px] font-semibold tracking-[0.12em] mt-6 mb-3 px-4 text-muted-foreground">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-2 px-2">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleItemClick(item.url)}
                      className={cn(
                        'w-full justify-start gap-3 rounded-lg px-4 py-2.5 text-[13px] transition-all duration-200',
                        isActive ?
                          'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                        : 'font-medium text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'h-4 w-4',
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        )}
                      />
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup className="mt-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem className="flex flex-col gap-3 pb-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="flex gap-4 rounded-lg px-4 py-2.5 text-[13px] font-semibold">
                      <UserButton />{' '}
                      <div className="flex flex-row gap-1 text-muted-foreground">
                        <span className="text-sidebar-foreground">Hi,</span>{' '}
                        {userFirstName}
                      </div>
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    <DropdownMenuItem className="flex flex-col justify-start items-start pr-20 pl-5 py-4 gap-5">
                      <SidebarMenuButton
                        onClick={() => handleItemClick('/dashboard/profile')}
                        className={`w-full justify-start gap-4 rounded-md px-3 py-5 text-sm hover:bg-accent hover:shadow-sm`}
                      >
                        <User2 />
                        <span className="font-semibold">Account</span>
                      </SidebarMenuButton>

                      <SidebarMenuButton
                        onClick={() => handleItemClick('/')}
                        className={`w-full justify-start gap-[20px] rounded-md px-3 py-5 text-sm hover:bg-accent hover:shadow-sm`}
                      >
                        <div className="ml-[1.5px]">
                          <HomeIcon size={23} />
                        </div>
                        <span className="font-semibold">Home</span>
                      </SidebarMenuButton>

                      <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-4 rounded-full px-3 py-2 hover:bg-accent hover:shadow-sm">
                          <Moon
                            size={18}
                            className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`}
                          />
                          <Switch
                            checked={!isDarkMode}
                            onCheckedChange={toggleTheme}
                            className="data-[state=checked]:bg-primary"
                          />
                          <Sun
                            size={18}
                            className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`}
                          />
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
