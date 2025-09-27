'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/app-sidebar/app-sidebar'
import { ClerkProvider } from '@clerk/nextjs'
import { useState } from 'react'
import DashboardHeader from '@/components/dashboard-header/dashboard-header'
import { DashboardContent } from '@/components/dashboard-content/dashboard-content'
import { Heading } from '@radix-ui/themes'

const Dashboard = () => {
  const [sideNav, setSiteNav] = useState(true)

  return (
    <ClerkProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="min-h-screen w-full flex flex-col gap-4 px-4">
          <div className="  h-fit grid grid-cols-12 justify-center items-center">
            <div className=" h-16 col-span-1 flex px-4 items-center ">
              <SidebarTrigger />
            </div>
            <div className=" h-16 col-span-11 ">
              <DashboardHeader />
            </div>
          </div>

          <div className="px-8 py-4 h-fit flex flex-col gap-2.5">
            <Heading className="text-lg font-bold text-[#8d4485]">
              Overview
            </Heading>
            <p className="text-gray-700 text-sm font-medium">
              Harness the power of AI to optimize your domain investments
            </p>
          </div>

          <div>
            <DashboardContent />
          </div>
        </main>
      </SidebarProvider>
    </ClerkProvider>
  )
}
export default Dashboard
