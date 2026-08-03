'use client'

import { ClerkProvider } from '@clerk/nextjs'
import {
  CalendarClock,
  Globe,
  HeartPulse,
  Radar,
  ShieldAlert,
  Sparkles,
  Star,
  TrendingUp
} from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/app-sidebar/app-sidebar'
import DashboardHeader from '@/components/dashboard-header/dashboard-header'
import { StatCard, type StatCardProps } from '@/components/stat-card/stat-card'
import { cn } from '@/lib/utils'

const stats: StatCardProps[] = [
  {
    value: '142',
    label: 'Domains monitored',
    description: 'across 15 TLDs',
    icon: Globe,
    tone: 'neutral',
    spark: [20, 24, 22, 28, 30, 35, 38]
  },
  {
    value: '18',
    label: 'Renewal risk',
    description: 'next 90 days',
    icon: CalendarClock,
    tone: 'risk',
    spark: [30, 28, 32, 26, 34, 36, 38]
  },
  {
    value: '87/100',
    label: 'Avg health',
    description: 'up from 84 last quarter',
    icon: HeartPulse,
    tone: 'up',
    spark: [50, 55, 58, 60, 64, 68, 72]
  },
  {
    value: '+12',
    label: 'Watchlist growth',
    description: '12 domains this month',
    icon: Star,
    tone: 'up',
    spark: [20, 26, 24, 30, 36, 40, 46]
  }
]

const expiryMonths = [
  { label: 'Aug', count: 5 },
  { label: 'Sep', count: 7 },
  { label: 'Oct', count: 4 },
  { label: 'Nov', count: 2 }
]

const expiries = [
  { domain: 'verafinance.co', date: 'Aug 20, 2026', days: 17, value: '$5,100' },
  {
    domain: 'simplestudio.co',
    date: 'Sep 15, 2026',
    days: 43,
    value: '$10,500'
  },
  { domain: 'modernspace.io', date: 'Oct 5, 2026', days: 63, value: '$6,800' },
  {
    domain: 'futureinteriors.co',
    date: 'Dec 5, 2026',
    days: 124,
    value: '$5,400'
  }
]

function daysPill(days: number) {
  if (days < 30) {
    return 'bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400'
  }
  if (days < 90) {
    return 'bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400'
  }
  return 'bg-black/[0.05] text-muted-foreground dark:bg-white/[0.07]'
}

const signals = [
  {
    icon: Sparkles,
    tone: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    action:
      'bg-violet-500/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300',
    domain: 'craftlabs.ai',
    text: 'Renew early — value up 31% this quarter',
    value: '$27.4K',
    actionLabel: 'Renew'
  },
  {
    icon: ShieldAlert,
    tone: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    action:
      'bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
    domain: 'verafinance.co',
    text: 'Value trending down — decide renew vs. drop',
    value: '$5.1K',
    actionLabel: 'Review'
  },
  {
    icon: TrendingUp,
    tone: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    action:
      'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
    domain: 'notionpay.com',
    text: 'Comparables rising — hold to expiry window',
    value: '$9.8K',
    actionLabel: 'Hold'
  }
]

const watchlist = [
  { domain: 'flowdesk.io', added: '2d ago' },
  { domain: 'authora.dev', added: '5d ago' },
  { domain: 'ledgerly.xyz', added: '9d ago' }
]

const Renewals = () => {
  const maxCount = Math.max(...expiryMonths.map((m) => m.count))

  return (
    <ClerkProvider>
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

            <section className="px-4 pb-2 pt-6 md:px-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                AI Tracking
              </p>
              <h1 className="mt-2.5 text-2xl font-bold tracking-tight md:text-3xl">
                Renewal intelligence.
              </h1>
              <p className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
                AI-ranked renewal risk and opportunity signals across your
                portfolio — nothing expires unnoticed.
              </p>
            </section>

            <div className="flex flex-col gap-6 px-4 pb-14 pt-6 md:px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              <div className="grid max-lg:grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex flex-col gap-6 lg:col-span-2">
                  <div className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08]">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-[15px] font-semibold tracking-tight">
                          Renewal exposure
                        </h2>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Expiries per month, next 90 days
                        </p>
                      </div>
                      <span className="rounded-full bg-amber-500/10 px-3 py-1.5 font-mono text-xs font-medium text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                        18 at risk
                      </span>
                    </div>

                    <div className="mt-8 flex h-28 items-end justify-between gap-6 px-2">
                      {expiryMonths.map((month, index) => {
                        const urgent = index < 2
                        return (
                          <div
                            key={month.label}
                            className="flex flex-1 flex-col items-center gap-2.5"
                          >
                            <span
                              className={cn(
                                'font-mono text-[11px] tabular-nums',
                                urgent ?
                                  'text-amber-600 dark:text-amber-400'
                                : 'text-muted-foreground'
                              )}
                            >
                              {month.count}
                            </span>
                            <div className="flex h-20 w-full items-end">
                              <div
                                className={cn(
                                  'w-full rounded-t-lg transition-all duration-300',
                                  urgent ?
                                    'bg-amber-400/80 dark:bg-amber-400/60'
                                  : 'bg-black/[0.08] dark:bg-white/[0.1]'
                                )}
                                style={{
                                  height: `${(month.count / maxCount) * 100}%`
                                }}
                              />
                            </div>
                            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                              {month.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-8 divide-y divide-black/[0.04] border-t border-black/[0.05] dark:divide-white/[0.05] dark:border-white/[0.06]">
                      {expiries.map((expiry) => (
                        <div
                          key={expiry.domain}
                          className="flex items-center justify-between gap-4 py-3.5"
                        >
                          <div className="flex min-w-0 flex-col gap-1">
                            <p className="truncate font-mono text-[13px] font-medium text-foreground">
                              {expiry.domain}
                            </p>
                            <p className="text-[11.5px] text-muted-foreground">
                              Expires {expiry.date}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <span
                              className={cn(
                                'rounded-full px-2.5 py-1 font-mono text-[11px] font-medium',
                                daysPill(expiry.days)
                              )}
                            >
                              {expiry.days}d left
                            </span>
                            <span className="font-mono text-[12.5px] tabular-nums text-foreground/80">
                              {expiry.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 lg:col-span-1">
                  <div className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-[15px] font-semibold tracking-tight">
                          AI signals
                        </h2>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Ranked by conviction
                        </p>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.05] bg-black/[0.03] dark:border-white/[0.06] dark:bg-white/[0.05]">
                        <Radar className="h-4 w-4 text-muted-foreground" />
                      </span>
                    </div>

                    <div className="mt-2">
                      {signals.map((signal) => (
                        <div
                          key={signal.domain}
                          className="flex gap-3.5 border-b border-black/[0.04] py-4 last:border-0 last:pb-0 dark:border-white/[0.05]"
                        >
                          <span
                            className={cn(
                              'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                              signal.tone
                            )}
                          >
                            <signal.icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-mono text-[12.5px] font-medium text-foreground">
                              {signal.domain}
                            </p>
                            <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                              {signal.text}
                            </p>
                            <div className="mt-2.5 flex items-center justify-between gap-3">
                              <span
                                className={cn(
                                  'rounded-full px-2.5 py-1 text-[10.5px] font-semibold',
                                  signal.action
                                )}
                              >
                                {signal.actionLabel}
                              </span>
                              <span className="font-mono text-[11.5px] tabular-nums text-muted-foreground">
                                est. {signal.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08]">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-[15px] font-semibold tracking-tight">
                        Watchlist
                      </h2>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                        +12
                      </span>
                    </div>

                    <div className="mt-2 divide-y divide-black/[0.04] dark:divide-white/[0.05]">
                      {watchlist.map((item) => (
                        <div
                          key={item.domain}
                          className="flex items-center justify-between gap-3 py-3"
                        >
                          <p className="font-mono text-[12.5px] font-medium text-foreground">
                            {item.domain}
                          </p>
                          <span className="text-[11.5px] text-muted-foreground">
                            added {item.added}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </ClerkProvider>
  )
}

export default Renewals
