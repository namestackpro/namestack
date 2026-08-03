import React from 'react'
import { DollarSign, Target, TrendingUp, ShieldAlert } from 'lucide-react'
import { aiStat } from '@/Utils/userDatabase'
import {
  StatCard,
  type StatCardProps,
  type StatTone
} from '../stat-card/stat-card'

const descriptions = [
  'quality-weighted score',
  '12-month outlook',
  'vs. comparable sales',
  'exposure-adjusted'
]

const icons = [DollarSign, TrendingUp, Target, ShieldAlert]

const tones: StatTone[] = ['up', 'up', 'neutral', 'up']

const sparks = [
  [40, 44, 48, 52, 56, 60, 64],
  [30, 34, 36, 40, 44, 46, 50],
  [50, 50, 48, 52, 51, 54, 55],
  [60, 62, 64, 66, 68, 70, 72]
]

const ReportStatcard = () => {
  const cards: StatCardProps[] = aiStat.stats.map((stat, index) => ({
    value: `${stat.value}/100`,
    label: stat.label,
    description: descriptions[index],
    gains: stat.gains,
    icon: icons[index],
    tone: tones[index],
    spark: sparks[index]
  }))

  return (
    <div className="px-4 pt-6 md:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>
    </div>
  )
}

export default ReportStatcard
