'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { sampleListings, Listing } from '@/lib/sample-listings'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function DomainCard({ l }: { l: Listing }) {
  return (
    <article className="bg-gradient-to-br from-transparent via-white/2 to-transparent rounded-xl border border-white/5 p-4 backdrop-blur-sm shadow-sm transition hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xl font-semibold tracking-tight">
            {l.domain}
          </div>
          <div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-white/5 px-2 py-1 text-xs">
              {l.tld}
            </span>
            <span className="rounded-full bg-white/5 px-2 py-1 text-xs">
              {l.category}
            </span>
            {l.country && (
              <span className="rounded-full bg-white/5 px-2 py-1 text-xs">
                {l.country}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold">{l.price} USDC</div>
          <div className="text-sm text-muted-foreground">
            Est. {l.estimatedValue} USDC
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground h-14 overflow-hidden">
        {l.aiInsight}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-emerald-600/20 px-2 py-1 text-emerald-200">
            Score {l.qualityScore}
          </span>
          {l.sellerVerified && (
            <span className="rounded-full bg-cyan-600/20 px-2 py-1 text-cyan-200">
              Verified
            </span>
          )}
          {l.escrowAvailable && (
            <span className="rounded-full bg-violet-600/20 px-2 py-1 text-violet-200">
              Escrow-ready
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/marketplace/${encodeURIComponent(l.id)}`}
            className="rounded-md bg-white/5 px-3 py-1 text-sm transition hover:bg-white/10"
          >
            View details
          </Link>
          <button className="rounded-md bg-primary/90 px-3 py-1 text-sm text-white transition hover:bg-primary">
            Start escrow
          </button>
        </div>
      </div>
    </article>
  )
}

export default function MarketplacePage() {
  const [q, setQ] = useState('')
  const [tldFilter, setTldFilter] = useState<string | null>(null)
  const [regionFilter, setRegionFilter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const value = q.trim().toLowerCase()
    return sampleListings.filter((l) => {
      if (tldFilter && l.tld !== tldFilter) return false
      if (regionFilter && l.region !== regionFilter) return false
      if (!value) return true
      return (
        l.domain.toLowerCase().includes(value)
        || l.tld.toLowerCase().includes(value)
        || l.category.toLowerCase().includes(value)
        || (l.country || '').toLowerCase().includes(value)
        || (l.sellerAlias || l.seller).toLowerCase().includes(value)
        || l.tags.join(' ').toLowerCase().includes(value)
      )
    })
  }, [q, tldFilter, regionFilter])

  const quickChips = [
    '.ai',
    '.cv',
    'fintech',
    'travel',
    'short names',
    'brandable'
  ]

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 grid gap-4 md:grid-cols-3 md:items-center">
        <div>
          <h1 className="text-3xl font-semibold">Domain Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Discover premium domains, compare asset signals, and purchase
            securely through Stellar-powered escrow.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 justify-start md:justify-center">
          <Button variant="outline">Connect Wallet</Button>
          <Link href="/marketplace/world-search">
            <Button variant="secondary">Explore by region</Button>
          </Link>
          <Link href="/dashboard/escrows">
            <Button>Manage escrows</Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 justify-end text-sm text-muted-foreground">
          <div className="text-center">
            2,480
            <br />
            <span className="text-foreground">domains listed</span>
          </div>
          <div className="text-center">
            96
            <br />
            <span className="text-foreground">countries covered</span>
          </div>
          <div className="text-center">
            $4.8M
            <br />
            <span className="text-foreground">listed value</span>
          </div>
          <div className="text-center">
            128
            <br />
            <span className="text-foreground">active escrow deals</span>
          </div>
        </div>
      </header>

      <section className="mb-6">
        <div className="max-w-4xl">
          <label className="sr-only">Search domains</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              aria-label="Search domains"
              placeholder="Search domains, keywords, TLDs, categories, sellers..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q && (
              <Button variant="ghost" onClick={() => setQ('')}>
                Clear
              </Button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickChips.map((c) => (
              <button
                key={c}
                onClick={() => setQ(c)}
                className="rounded-full bg-white/5 px-3 py-1 text-sm transition hover:bg-white/10"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>
                Refine by TLD, region, and status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-xs text-muted-foreground mb-2">TLD</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    '.com',
                    '.ai',
                    '.io',
                    '.cv',
                    '.co',
                    '.dev',
                    '.app',
                    '.xyz',
                    '.stellar',
                    '.xlm'
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTldFilter(tldFilter === t ? null : t)}
                      className={`rounded-full px-2 py-1 text-sm transition ${tldFilter === t ? 'bg-primary text-white' : 'bg-white/5'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-xs text-muted-foreground mb-2">Region</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Global',
                    'North America',
                    'Latin America',
                    'Europe',
                    'Africa',
                    'Asia-Pacific',
                    'Middle East'
                  ].map((r) => (
                    <button
                      key={r}
                      onClick={() =>
                        setRegionFilter(regionFilter === r ? null : r)
                      }
                      className={`rounded-full px-2 py-1 text-sm transition ${regionFilter === r ? 'bg-primary text-white' : 'bg-white/5'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setTldFilter(null)
                    setRegionFilter(null)
                    setQ('')
                  }}
                >
                  Clear all
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              {filtered.length} results
            </div>
            <div>
              <select className="rounded-md border bg-background px-3 py-2 text-sm">
                <option>Recommended</option>
                <option>Price low to high</option>
                <option>Price high to low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.length === 0 ?
              <div className="col-span-full rounded-xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-muted-foreground">
                No matching domains found. Try removing filters or searching
                another keyword.
              </div>
            : filtered.map((l) => <DomainCard key={l.id} l={l} />)}
          </div>
        </main>
      </div>
    </div>
  )
}
