import { ShieldAlert, Sparkles, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

type InsightTone = 'iris' | 'amber' | 'emerald'

const insights: {
  icon: typeof Sparkles
  domain: string
  text: string
  value: string
  action: string
  tone: InsightTone
}[] = [
  {
    icon: Sparkles,
    domain: 'craftlabs.ai',
    text: 'Demand spike — list within two weeks',
    value: '$27.4K',
    action: 'List',
    tone: 'iris'
  },
  {
    icon: ShieldAlert,
    domain: 'verafinance.co',
    text: 'Renews in 14 days, value trending down',
    value: '$5.1K',
    action: 'Review',
    tone: 'amber'
  },
  {
    icon: TrendingUp,
    domain: 'flowdesk.io',
    text: '3 comparables sold above holding value',
    value: '$18.2K',
    action: 'Compare',
    tone: 'emerald'
  }
]

const iconTones: Record<InsightTone, string> = {
  iris: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
}

const actionTones: Record<InsightTone, string> = {
  iris: 'bg-violet-500/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300',
  amber:
    'bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
  emerald:
    'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'
}

const Insight = () => {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight">
              AI Insights
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Intelligence brief · updated just now
            </p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.05] bg-black/[0.03] dark:border-white/[0.06] dark:bg-white/[0.05]">
            <Sparkles className="h-4 w-4 text-violet-500 dark:text-violet-400" />
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-black/[0.05] bg-black/[0.02] p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <svg width="62" height="62" viewBox="0 0 62 62" aria-hidden>
            <circle
              cx="31"
              cy="31"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeWidth="6"
            />
            <circle
              cx="31"
              cy="31"
              r="25"
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeDasharray="157.1"
              strokeDashoffset="20.4"
              strokeLinecap="round"
              transform="rotate(-90 31 31)"
            />
          </svg>
          <div>
            <p className="font-mono text-2xl font-medium tracking-tight tabular-nums">
              87<span className="text-sm text-muted-foreground">/100</span>
            </p>
            <p className="mt-1 text-[13px] font-medium text-emerald-600 dark:text-emerald-400">
              Strong &amp; diversified
            </p>
            <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted-foreground">
              Portfolio health · renewed exposure low
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08]">
        <h2 className="text-[15px] font-semibold tracking-tight">
          Recommendations
        </h2>

        <div className="mt-2">
          {insights.map((insight) => (
            <div
              key={insight.domain}
              className="flex gap-3.5 border-b border-black/[0.04] py-4 last:border-0 last:pb-0 dark:border-white/[0.05]"
            >
              <span
                className={cn(
                  'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                  iconTones[insight.tone]
                )}
              >
                <insight.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[12.5px] font-medium text-foreground">
                  {insight.domain}
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                  {insight.text}
                </p>
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[10.5px] font-semibold',
                      actionTones[insight.tone]
                    )}
                  >
                    {insight.action}
                  </span>
                  <span className="font-mono text-[11.5px] tabular-nums text-muted-foreground">
                    est. {insight.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Insight
