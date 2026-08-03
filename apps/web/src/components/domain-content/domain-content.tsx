'use client'

import React, { useState } from 'react'
import {
  Search,
  ArrowUpRight,
  Star,
  Palette,
  Cpu,
  Building2,
  Home
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type VaultStatus = 'Active' | 'Expiring' | 'Risk'

const statusStyles: Record<VaultStatus, string> = {
  Active:
    'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400',
  Expiring:
    'bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400',
  Risk: 'bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400'
}

const domains = [
  {
    id: 1,
    name: 'designcraft.com',
    value: 8250,
    change: 12.5,
    expires: '2027-05-12',
    traffic: 1250,
    premium: true,
    category: 'Design'
  },
  {
    id: 2,
    name: 'modernspace.io',
    value: 6800,
    change: -8.2,
    expires: '2026-10-05',
    traffic: 580,
    premium: false,
    category: 'Architecture'
  },
  {
    id: 3,
    name: 'simplestudio.co',
    value: 10500,
    change: 2.1,
    expires: '2026-09-15',
    traffic: 3100,
    premium: true,
    category: 'Design'
  },
  {
    id: 4,
    name: 'minimaldesign.com',
    value: 7200,
    change: 15.7,
    expires: '2027-02-28',
    traffic: 1580,
    premium: false,
    category: 'Design'
  },
  {
    id: 5,
    name: 'cleantechnology.com',
    value: 12500,
    change: 5.3,
    expires: '2027-08-17',
    traffic: 3200,
    premium: true,
    category: 'Technology'
  },
  {
    id: 6,
    name: 'futureinteriors.co',
    value: 5400,
    change: -1.8,
    expires: '2026-08-20',
    traffic: 850,
    premium: false,
    category: 'Interior'
  },
  {
    id: 7,
    name: 'digitalproduct.io',
    value: 8900,
    change: 9.4,
    expires: '2027-03-22',
    traffic: 1750,
    premium: true,
    category: 'Technology'
  },
  {
    id: 8,
    name: 'smartliving.com',
    value: 14200,
    change: 7.6,
    expires: '2028-01-10',
    traffic: 2850,
    premium: true,
    category: 'Lifestyle'
  }
]

const filters = [
  { id: 'all', label: 'All Domains' },
  { id: 'premium', label: 'Premium' },
  { id: 'expiring', label: 'Expiring Soon' },
  { id: 'trending', label: 'Trending Up' }
]

const categoryCards = [
  { icon: Palette, label: 'Design', count: '3 domains', value: '$24,950' },
  { icon: Cpu, label: 'Technology', count: '2 domains', value: '$21,400' },
  {
    icon: Building2,
    label: 'Architecture',
    count: '1 domain',
    value: '$6,800'
  },
  { icon: Home, label: 'Lifestyle', count: '2 domains', value: '$19,600' }
]

function daysUntil(expires: string) {
  return Math.ceil(
    (new Date(expires).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )
}

function statusFor(expires: string): VaultStatus {
  const days = daysUntil(expires)
  if (days < 30) return 'Risk'
  if (days < 90) return 'Expiring'
  return 'Active'
}

const Domaincontent = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useRouter()

  const filteredDomains = domains.filter((domain) => {
    const q = searchTerm.trim().toLowerCase()
    const matchesSearch =
      q.length === 0 || domain.name.toLowerCase().includes(q)

    let matchesFilter = true
    if (activeFilter === 'premium') {
      matchesFilter = domain.premium
    } else if (activeFilter === 'expiring') {
      matchesFilter = daysUntil(domain.expires) < 90
    } else if (activeFilter === 'trending') {
      matchesFilter = domain.change > 7
    }

    return matchesSearch && matchesFilter
  })

  const handleAddDomain = () => {
    navigate.push('/domain-upload')
  }

  return (
    <div className="flex w-full flex-col gap-8 px-4 pb-14 pt-4 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="searchBar"
            name="searchBar"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search domains..."
            className="h-10 w-full rounded-xl border border-black/[0.06] bg-card pl-10 pr-4 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/25 focus:ring-2 focus:ring-foreground/10 dark:border-white/[0.08]"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-card px-4 py-2.5 text-[13px] font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground dark:border-white/[0.08]"
          >
            Filters
          </button>
          <button
            type="button"
            onClick={handleAddDomain}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-[13px] font-semibold text-background shadow-sm transition-opacity hover:opacity-90"
          >
            Add Domain
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              'whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors',
              activeFilter === filter.id ?
                'bg-foreground text-background'
              : 'bg-black/[0.04] text-muted-foreground hover:bg-black/[0.07] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-card shadow-sm dark:border-white/[0.08]">
        <div className="flex items-center justify-between border-b border-black/[0.05] px-6 py-5 dark:border-white/[0.06]">
          <h2 className="text-[15px] font-semibold tracking-tight">
            Your Domains
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            {filteredDomains.length} domains
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-black/[0.05] dark:border-white/[0.06]">
                {[
                  'Domain',
                  'Category',
                  'Value',
                  'Expires',
                  'Traffic',
                  'Status'
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {head}
                  </th>
                ))}
                <th className="w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {filteredDomains.map((domain) => {
                const status = statusFor(domain.expires)
                const expiryLabel = new Date(domain.expires).toLocaleDateString(
                  'en-US',
                  { month: 'short', day: 'numeric', year: 'numeric' }
                )
                return (
                  <tr
                    key={domain.id}
                    className="transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.04] font-mono text-[13px] font-medium text-muted-foreground dark:bg-white/[0.06]">
                          {domain.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[13px] font-medium text-foreground">
                            {domain.name}
                          </span>
                          {domain.premium && (
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-muted-foreground dark:bg-white/[0.06]">
                        {domain.category}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <p className="font-mono text-[13px] tabular-nums text-foreground/90">
                        ${domain.value.toLocaleString()}
                      </p>
                      <p
                        className={cn(
                          'font-mono text-[11.5px] tabular-nums',
                          domain.change >= 0 ?
                            'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                        )}
                      >
                        {domain.change >= 0 ? '+' : ''}
                        {domain.change}%
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-[13px] text-muted-foreground">
                      {expiryLabel}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <span className="h-1 w-16 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.08]">
                          <span
                            className="block h-full rounded-full bg-foreground/30"
                            style={{
                              width: `${Math.min(100, (domain.traffic / 5000) * 100)}%`
                            }}
                          />
                        </span>
                        <span className="font-mono text-xs tabular-nums text-muted-foreground">
                          {domain.traffic.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-1 text-[11px] font-medium',
                          statusStyles[status]
                        )}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <button
                        type="button"
                        aria-label={`View details for ${domain.name}`}
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filteredDomains.length === 0 && (
            <p className="px-6 py-12 text-center text-sm text-muted-foreground">
              No domains match your search.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-black/[0.06] bg-card shadow-sm dark:border-white/[0.08]">
        <div className="border-b border-black/[0.05] px-6 py-5 dark:border-white/[0.06]">
          <h2 className="text-[15px] font-semibold tracking-tight">
            Domain Categories
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
          {categoryCards.map((category) => (
            <div
              key={category.label}
              className="rounded-xl border border-black/[0.05] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.1] hover:shadow-sm dark:border-white/[0.06] dark:hover:border-white/[0.12]"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
                  <category.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-[13.5px] font-semibold text-foreground">
                  {category.label}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {category.count}
                </span>
                <span className="font-mono text-[13px] font-medium tabular-nums text-foreground/90">
                  {category.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Domaincontent
