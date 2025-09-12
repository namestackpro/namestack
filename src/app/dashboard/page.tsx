'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from '@/components/app-sidebar/app-sidebar'
import { ClerkProvider } from "@clerk/nextjs"
import { useState } from "react"
import DashboardHeader from "@/components/dashboard-header/dashboard-header"
import { DashboardContent } from "@/components/dashboard-content/dashboard-content"




const dashboard = () => {

    const [sideNav, setSiteNav] = useState(true)




    
  return (
    <ClerkProvider>
        <SidebarProvider>
            <AppSidebar/>
            <main className="min-h-screen w-full flex flex-col gap-4 px-4">
                
                <div className="  h-fit grid grid-cols-12">
                    <div className=" h-16 col-span-1 flex px-4 items-center ">
                        <SidebarTrigger/>

                    </div>
                    <div className=" h-16 col-span-11 ">
                        <DashboardHeader/>
                    </div>
                </div>

                <div className="px-8 pt-10 h-fit">
                    <h2 className="text-base font-bold text-[#8d4485]">
                        Overview
                    </h2>
                </div>

                <div >
                    <DashboardContent/>
                </div>
                
                
            </main>
        </SidebarProvider>
    </ClerkProvider>
  )
}
export default dashboard