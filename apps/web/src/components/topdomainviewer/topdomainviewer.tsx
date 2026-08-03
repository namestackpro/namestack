import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type HoldingStatus = 'Active' | 'Expiring' | 'Risk'

const statusStyles: Record<HoldingStatus, { pill: string; dot: string }> = {
  Active: {
    pill: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400',
    dot: 'bg-emerald-500'
  },
  Expiring: {
    pill: 'bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400',
    dot: 'bg-amber-500'
  },
  Risk: {
    pill: 'bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400',
    dot: 'bg-rose-500'
  }
}

const holdings: {
  domain: string
  value: number
  health: number
  expiry: string
  change: number
  status: HoldingStatus
}[] = [
  {
    domain: 'craftlabs.ai',
    value: 27400,
    health: 88,
    expiry: 'Jan 2028',
    change: 31.0,
    status: 'Active'
  },
  {
    domain: 'flowdesk.io',
    value: 18200,
    health: 94,
    expiry: 'Mar 2027',
    change: 12.4,
    status: 'Active'
  },
  {
    domain: 'notionpay.com',
    value: 9850,
    health: 61,
    expiry: 'Sep 2026',
    change: 2.1,
    status: 'Expiring'
  },
  {
    domain: 'authora.dev',
    value: 7400,
    health: 77,
    expiry: 'Nov 2027',
    change: 8.9,
    status: 'Active'
  },
  {
    domain: 'verafinance.co',
    value: 5100,
    health: 44,
    expiry: 'Aug 2026',
    change: -6.8,
    status: 'Risk'
  }
]

function changeClass(change: number) {
  return change > 0 ?
      'text-emerald-600 dark:text-emerald-400'
    : 'text-rose-600 dark:text-rose-400'
}

function HealthCell({ health }: { health: number }) {
  const barColor =
    health >= 75 ? 'bg-emerald-500'
    : health >= 55 ? 'bg-amber-500'
    : 'bg-rose-500'
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          'font-mono text-xs font-medium tabular-nums',
          health >= 55 ? 'text-foreground' : 'text-rose-600 dark:text-rose-400'
        )}
      >
        {health}
      </span>
      <span className="h-1 w-10 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.08]">
        <span
          className={cn('block h-full rounded-full', barColor)}
          style={{ width: `${health}%` }}
        />
      </span>
    </div>
  )
}

function StatusPill({ status }: { status: HoldingStatus }) {
  const style = statusStyles[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium',
        style.pill
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />
      {status}
    </span>
  )
}

const TopdomainViewer = () => {
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-card shadow-sm dark:border-white/[0.08]">
      <div className="flex items-center justify-between gap-4 border-b border-black/[0.05] px-6 py-5 dark:border-white/[0.06]">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">Holdings</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            142 domains · top movers
          </p>
        </div>
        <Link
          href="/dashboard/domainvault"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/[0.05] dark:border-white/[0.06]">
              {[
                'Domain',
                'Est. value',
                'Health',
                'Expiry',
                'Change',
                'Status'
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr
                key={holding.domain}
                className="border-b border-black/[0.04] transition-colors last:border-0 hover:bg-black/[0.02] dark:border-white/[0.04] dark:hover:bg-white/[0.03]"
              >
                <td className="px-6 py-4 font-mono text-[13px] font-medium text-foreground">
                  {holding.domain}
                </td>
                <td className="px-6 py-4 font-mono text-[13px] tabular-nums text-foreground/80">
                  ${holding.value.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <HealthCell health={holding.health} />
                </td>
                <td className="px-6 py-4 text-[13px] text-muted-foreground">
                  {holding.expiry}
                </td>
                <td
                  className={cn(
                    'px-6 py-4 font-mono text-[12.5px] font-medium tabular-nums',
                    changeClass(holding.change)
                  )}
                >
                  {holding.change > 0 ? '+' : ''}
                  {holding.change}%
                </td>
                <td className="px-6 py-4">
                  <StatusPill status={holding.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-black/[0.04] md:hidden dark:divide-white/[0.04]">
        {holdings.map((holding) => (
          <div key={holding.domain} className="flex flex-col gap-3 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[13.5px] font-medium text-foreground">
                {holding.domain}
              </p>
              <p className="font-mono text-[13.5px] font-medium tabular-nums">
                ${holding.value.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Expires {holding.expiry}</span>
                <HealthCell health={holding.health} />
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'font-mono text-xs font-medium tabular-nums',
                    changeClass(holding.change)
                  )}
                >
                  {holding.change > 0 ? '+' : ''}
                  {holding.change}%
                </span>
                <StatusPill status={holding.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopdomainViewer
