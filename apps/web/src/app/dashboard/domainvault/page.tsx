'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar/app-sidebar'
import DashboardHeader from '@/components/dashboard-header/dashboard-header'
import Domaincontent from '@/components/domain-content/domain-content'

const Domainvault = () => {
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

        <div className="relative flex flex-col px-4 md:px-6">
          <div className="grid h-16 grid-cols-12 items-center">
            <div className="col-span-1 flex items-center px-4">
              <SidebarTrigger />
            </div>
            <div className="col-span-11">
              <DashboardHeader />
            </div>
          </div>

          <section className="flex flex-col gap-6 px-4 pb-2 pt-6 md:px-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Domain Vault
              </p>
              <h1 className="mt-2.5 text-2xl font-bold tracking-tight md:text-3xl">
                Your domain stack, at a glance.
              </h1>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                Every holding valued and monitored — health, expiry, traffic,
                and renewal exposure in one view.
              </p>
            </div>

            <Link
              href="/domain-upload"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background shadow-sm transition duration-300 hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add domain
            </Link>
          </section>

          <Domaincontent />
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Domainvault
