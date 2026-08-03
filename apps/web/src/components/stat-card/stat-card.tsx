import React from 'react'
import {
  Clock,
  DollarSign,
  ArrowLeftRight,
  Sparkles,
  TrendingDown,
  TrendingUp,
  type LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type StatTone = 'up' | 'risk' | 'neutral'

export const statToneStyles: Record<
  StatTone,
  { pill: string; text: string; spark: string }
> = {
  up: {
    pill: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400',
    text: 'text-emerald-600 dark:text-emerald-400',
    spark: '#10b981'
  },
  risk: {
    pill: 'bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400',
    text: 'text-amber-600 dark:text-amber-400',
    spark: '#f59e0b'
  },
  neutral: {
    pill: 'bg-black/[0.05] text-muted-foreground dark:bg-white/[0.07]',
    text: 'text-muted-foreground',
    spark: '#9ca3af'
  }
}

export type StatCardProps = {
  value: string
  label: string
  description: string
  gains?: number
  icon: LucideIcon
  tone: StatTone
  spark: number[]
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const width = 72
  const height = 26
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((point - min) / range) * (height - 4) - 2
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2}
        r="2.25"
        fill={color}
      />
    </svg>
  )
}

export function StatCard({
  value,
  label,
  description,
  gains,
  icon: Icon,
  tone,
  spark
}: StatCardProps) {
  const toneStyle = statToneStyles[tone]
  const TrendIcon = gains !== undefined && gains < 0 ? TrendingDown : TrendingUp

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-black/[0.12] dark:border-white/[0.08] dark:hover:border-white/[0.16]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.05] bg-black/[0.03] dark:border-white/[0.06] dark:bg-white/[0.05]">
          <Icon className="h-[18px] w-[18px] text-muted-foreground" />
        </div>

        {gains !== undefined && (
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium',
              toneStyle.pill
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {gains > 0 ? '+' : ''}
            {gains}%
          </span>
        )}
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[22px] font-medium tracking-tight tabular-nums">
            {value}
          </p>
          <p className="mt-1.5 text-[13px] font-medium text-foreground/80">
            {label}
          </p>
          <p className={cn('mt-0.5 text-xs', toneStyle.text)}>{description}</p>
        </div>
        <div className="shrink-0 pb-1 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          <Sparkline data={spark} color={toneStyle.spark} />
        </div>
      </div>
    </div>
  )
}

const stats: StatCardProps[] = [
  {
    value: '$248,420',
    label: 'Portfolio Value',
    description: 'this month',
    gains: 18.4,
    icon: DollarSign,
    tone: 'up',
    spark: [40, 44, 41, 48, 52, 58, 64]
  },
  {
    value: '18',
    label: 'Renewal Exposure',
    description: '18 domains · next 60 days',
    icon: Clock,
    tone: 'risk',
    spark: [30, 28, 32, 26, 34, 36, 38]
  },
  {
    value: '$61,200',
    label: 'Escrow Volume',
    description: '4 deals active',
    gains: 12.5,
    icon: ArrowLeftRight,
    tone: 'up',
    spark: [20, 24, 28, 26, 34, 40, 46]
  },
  {
    value: '87/100',
    label: 'AI Opportunity Score',
    description: '31 opportunities found',
    icon: Sparkles,
    tone: 'neutral',
    spark: [50, 55, 58, 60, 64, 68, 72]
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
