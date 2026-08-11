'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { sampleListings, Listing } from '@/lib/sample-listings'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function DomainCard({ l }: { l: Listing }) {
  return (
    <article className="bg-gradient-to-br from-transparent via-white/2 to-transparent rounded-xl border border-white/5 p-4 backdrop-blur-sm shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xl font-semibold tracking-tight">
            {l.domain}
          </div>
          <div className="mt-1 flex gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 rounded-full bg-white/3 text-xs">
              {l.tld}
            </span>
            <span className="px-2 py-1 rounded-full bg-white/3 text-xs">
              {l.category}
            </span>
            {l.country && (
              <span className="px-2 py-1 rounded-full bg-white/3 text-xs">
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
      <p className="mt-3 text-sm text-muted-foreground h-12 overflow-hidden">
        {l.aiInsight}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="px-2 py-1 rounded-full bg-emerald-600/20 text-emerald-200">
            Score {l.qualityScore}
          </span>
          {l.sellerVerified && (
            <span className="px-2 py-1 rounded-full bg-cyan-600/20 text-cyan-200">
              Verified
            </span>
          )}
          {l.escrowAvailable && (
            <span className="px-2 py-1 rounded-full bg-violet-600/20 text-violet-200">
              Escrow-ready
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/marketplace/${encodeURIComponent(l.id)}`}
            className="text-sm px-3 py-1 rounded-md bg-white/5"
          >
            View
          </Link>
          <button className="text-sm px-3 py-1 rounded-md bg-primary/80">
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
        <div className="flex items-center gap-3 justify-start md:justify-center">
          <Button variant="outline">Connect Wallet</Button>
          <Link href="/marketplace/world-search">
            <Button variant="secondary">Explore by region</Button>
          </Link>
          <Link href="/dashboard/escrows">
            <Button>Manage escrows</Button>
          </Link>
        </div>
        <div className="flex gap-3 justify-end text-sm text-muted-foreground">
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
          <div className="flex gap-2">
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
          <div className="mt-3 flex gap-2 flex-wrap">
            {quickChips.map((c) => (
              <button
                key={c}
                onClick={() => setQ(c)}
                className="px-3 py-1 rounded-full bg-white/3 text-sm"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>
                Refine by TLD, region, price, category, and status.
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
                      className={`px-2 py-1 rounded text-sm ${tldFilter === t ? 'bg-primary text-white' : 'bg-white/3'}`}
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
                    'Asia-Pacific'
                  ].map((r) => (
                    <button
                      key={r}
                      onClick={() =>
                        setRegionFilter(regionFilter === r ? null : r)
                      }
                      className={`px-2 py-1 rounded text-sm ${regionFilter === r ? 'bg-primary text-white' : 'bg-white/3'}`}
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

        <main className="md:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {filtered.length} results
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded-md bg-transparent border px-2 py-1 text-sm">
                <option>Recommended</option>
                <option>Price low to high</option>
                <option>Price high to low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                No matching domains found. Try removing filters or searching
                another keyword.
              </div>
            )}
            {filtered.map((l) => (
              <DomainCard key={l.id} l={l} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
;('use client')

import Link from 'next/link'
import { connect } from '@namestack/sdk'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { sampleListings } from '@/lib/sample-listings'

export default function MarketplacePage() {
  const handleConnectWallet = async () => {
    try {
      const address = await connect()
      console.log('Connected wallet:', address)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
            <p className="text-muted-foreground mt-1">
              Discover and purchase premium domain names
            </p>
          </div>
          <Button onClick={handleConnectWallet} size="lg">
            Connect Wallet
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleListings.map((listing) => (
            <Card
              key={listing.domain}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-xl font-mono">
                  {listing.domain}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-2xl font-bold text-foreground">
                      {listing.price} USDC
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Seller</p>
                  <p className="text-sm font-mono text-foreground truncate max-w-[200px]">
                    {listing.seller}
                  </p>
                </div>
                <Link
                  href={`/marketplace/${listing.domain}`}
                  className="mt-auto"
                >
                  <Button className="w-full" variant="default">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {sampleListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No listings available</p>
          </div>
        )}
      </div>
    </div>
  )
}
