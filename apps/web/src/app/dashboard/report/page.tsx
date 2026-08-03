'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/app-sidebar/app-sidebar'
import DashboardHeader from '@/components/dashboard-header/dashboard-header'
import Aistatcard from '@/components/report-statcard/report-statcard'
import Aiinsight from '@/components/ai-insight/ai-insight'

const Report = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="relative min-h-screen w-full overflow-hidden">
        <div
          aria-hidden
          className="bg-grid-faint mask-fade-top pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-[-10%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.14),transparent)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(110,107,246,0.16),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-20%] left-[-8%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(79,209,232,0.08),transparent)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(79,209,232,0.1),transparent)]"
        />

        <div className="relative flex flex-col px-4 md:px-6">
          <div className="grid h-16 grid-cols-12 items-center">
            <div className="col-span-1 flex items-center px-4">
              <SidebarTrigger />
            </div>
            <div className="col-span-11">
              <DashboardHeader />
            </div>
          </div>

          <section className="px-4 pb-2 pt-6 md:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Report &amp; Analytics
            </p>
            <h1 className="mt-2.5 text-2xl font-bold tracking-tight md:text-3xl">
              Performance, explained.
            </h1>
            <p className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
              Intelligent analysis and recommendations across your domain
              portfolio — value, alignment, and risk in one report.
            </p>
          </section>

          <Aistatcard />
          <Aiinsight />
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Report
