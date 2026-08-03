import {
  AlertCircle,
  ArrowUpRight,
  BarChart,
  DollarSign,
  Globe,
  HelpCircle,
  Lightbulb,
  TrendingUp,
  type LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Priority = 'high priority' | 'medium priority' | 'low priority'

const priorityStyles: Record<Priority, string> = {
  'high priority':
    'bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400',
  'medium priority':
    'bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400',
  'low priority':
    'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400'
}

const insights: {
  domain: string
  est_value: string
  action: string
  description: string
  icon: LucideIcon
  priority: Priority
}[] = [
  {
    domain: 'creativespace.com',
    est_value: '25,090',
    action: 'Acquire',
    description:
      'Matches trending search patterns in the design industry with 73% higher engagement than similar domains.',
    icon: TrendingUp,
    priority: 'high priority'
  },
  {
    domain: 'minimalstudio.cv',
    est_value: '3,100',
    action: 'List for sale',
    description:
      'Demand up 28% for this keyword set — valuation at a two-year high, signaling an optimal selling window.',
    icon: DollarSign,
    priority: 'medium priority'
  },
  {
    domain: 'modernstudio.io',
    est_value: '7,800',
    action: 'Review',
    description:
      'Potential trademark conflict detected with "ModernSpaces Inc.", who recently filed in similar categories.',
    icon: AlertCircle,
    priority: 'low priority'
  },
  {
    domain: 'cupidlove.io',
    est_value: '4,800',
    action: 'Investigate',
    description:
      'Seasonal demand building ahead of Q4 — expect renewed buyer interest within the quarter.',
    icon: TrendingUp,
    priority: 'medium priority'
  },
  {
    domain: 'blairwoldorf.xyz',
    est_value: '10,800',
    action: 'Review Offer',
    description:
      'Inbound offer sits below estimate — counter at 15% above current valuation.',
    icon: DollarSign,
    priority: 'high priority'
  }
]

const tips = [
  'Diversify categories',
  'Explore emerging TLDs',
  'Leverage market trends'
]

const intelligence: {
  content: string
  description: string
  icon: LucideIcon
}[] = [
  {
    content: 'Industry Trend',
    description:
      'Design and minimalism-focused domains have seen a 24% increase in search volume over the last quarter.',
    icon: TrendingUp
  },
  {
    content: 'Emerging Keywords',
    description:
      '"Sustainable," "minimal," and "studio" show strong growth potential in premium domain valuations.',
    icon: Lightbulb
  },
  {
    content: 'TLD Analysis',
    description:
      'While .com remains dominant, .io domains in the tech space appreciated 18% faster this year.',
    icon: Globe
  }
]

const Aiinsight = () => {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-14 pt-8 md:px-8">
      <div className="grid max-lg:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08] lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[15px] font-semibold tracking-tight">
              Latest insights
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {insights.length} insights
            </span>
          </div>

          <div className="mt-2 divide-y divide-black/[0.04] dark:divide-white/[0.05]">
            {insights.map((insight) => (
              <div key={insight.domain} className="flex gap-3.5 py-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
                  <insight.icon className="h-4 w-4 text-muted-foreground" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[12.5px] font-medium text-foreground">
                      {insight.domain}
                    </p>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold',
                        priorityStyles[insight.priority]
                      )}
                    >
                      {insight.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {insight.description}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[10.5px] font-semibold text-foreground/80 dark:bg-white/[0.07]">
                      {insight.action}
                    </span>
                    <span className="font-mono text-[11.5px] tabular-nums text-muted-foreground">
                      est. ${insight.est_value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08]">
            <h2 className="text-[15px] font-semibold tracking-tight">
              AI Recommendations
            </h2>

            <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-black/[0.05] bg-black/[0.02] p-5 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                </span>
                <h3 className="text-[13.5px] font-semibold tracking-tight">
                  Weekly Portfolio Insight
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <svg width="58" height="58" viewBox="0 0 58 58" aria-hidden>
                  <circle
                    cx="29"
                    cy="29"
                    r="23"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.08"
                    strokeWidth="6"
                  />
                  <circle
                    cx="29"
                    cy="29"
                    r="23"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeDasharray="144.5"
                    strokeDashoffset="18.8"
                    strokeLinecap="round"
                    transform="rotate(-90 29 29)"
                  />
                </svg>
                <div>
                  <p className="font-mono text-2xl font-medium tracking-tight tabular-nums">
                    87
                    <span className="text-sm text-muted-foreground">/100</span>
                  </p>
                  <span className="mt-1.5 inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                    +11% this month
                  </span>
                </div>
              </div>

              <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                Your portfolio is performing well with strong growth potential,
                based on domain quality, market trends, and portfolio diversity.
              </p>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-black/[0.08] py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:border-foreground/25 dark:border-white/[0.1]"
              >
                View full analysis
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="h-4 w-4 text-amber-500" />
              <h2 className="text-[15px] font-semibold tracking-tight">
                Optimization Tips
              </h2>
            </div>

            <div className="mt-4 flex flex-col gap-1">
              {tips.map((tip, index) => (
                <button
                  key={index}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-black/[0.04] dark:bg-white/[0.06]">
                    <BarChart className="h-3.5 w-3.5 text-muted-foreground" />
                  </span>
                  <span className="flex-1 text-[13px] font-medium text-foreground/80">
                    {tip}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08]">
        <h2 className="text-[15px] font-semibold tracking-tight">
          Market Intelligence
        </h2>
        <div className="mt-4 grid max-lg:grid-cols-1 lg:grid-cols-3 gap-4">
          {intelligence.map((info) => (
            <div
              key={info.content}
              className="rounded-xl border border-black/[0.05] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.1] hover:shadow-sm dark:border-white/[0.06] dark:hover:border-white/[0.12]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
                <info.icon className="h-4 w-4 text-muted-foreground" />
              </span>
              <h3 className="mt-4 text-[13.5px] font-semibold tracking-tight">
                {info.content}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
                {info.description}
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Aiinsight
