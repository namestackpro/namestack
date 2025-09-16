'use client'

import AppSidebar from "@/components/app-sidebar/app-sidebar"
import DashboardHeader from "@/components/dashboard-header/dashboard-header"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ClerkProvider } from "@clerk/nextjs"
import Aiinsight from "@/components/ai-insight/ai-insight"
import Aistatcard from "@/components/report-statcard/report-statcard"




const Report = () => {



  return (
    <ClerkProvider>
        <SidebarProvider>
            <AppSidebar/>

            <main className='min-h-screen w-[100%] bg-background px-4'>
                <div className=' w-full'>
                    <div className="  h-fit grid grid-cols-12">
                        <div className=" h-16 col-span-1 flex px-4 items-center ">
                            <SidebarTrigger/>

                        </div>
                        <div className=" h-16 col-span-11 ">
                            <DashboardHeader/>
                        </div>
                    </div>

                    {/* AI Stat Cards */}
                    <Aistatcard/>


                    {/* latest insight and intel */}
                    <Aiinsight/>
    
                </div>

            </main>
        </SidebarProvider>
    </ClerkProvider>
  )
}


export default Report