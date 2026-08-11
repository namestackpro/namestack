'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { regionMap, Region, sampleListings } from '@/lib/sample-listings'
import { Button } from '@/components/ui/button'

export default function WorldSearchPage() {
  const [selected, setSelected] = useState<Region | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)

  function selectRegion(r: Region) {
    setSelected(r)
  }

  const results =
    selected ?
      sampleListings.filter(
        (s) =>
          s.tld === selected.primaryTld
          || s.countryCode === selected.countryCode
      )
    : []

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">World Search</h1>
        <p className="text-muted-foreground mt-1">
          Spin the globe, select a market, and discover domains tied to regional
          TLDs and local demand.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-gradient-to-b from-black/40 to-white/2 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                Select a region to reveal local TLD opportunities.
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">
                  Auto rotate
                </label>
                <input
                  type="checkbox"
                  checked={autoRotate}
                  onChange={() => setAutoRotate(!autoRotate)}
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div
                className={`w-72 h-72 rounded-full bg-gradient-to-br from-indigo-700/30 to-cyan-700/10 relative overflow-hidden ${autoRotate ? 'animate-spin-slow' : ''}`}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <radialGradient id="g1" cx="50%" cy="30%">
                      <stop
                        offset="0%"
                        stopColor="#7c3aed"
                        stopOpacity="0.35"
                      />
                      <stop
                        offset="100%"
                        stopColor="#0ea5e9"
                        stopOpacity="0.05"
                      />
                    </radialGradient>
                  </defs>
                  <circle
                    cx="100"
                    cy="100"
                    r="96"
                    fill="url(#g1)"
                    stroke="#ffffff10"
                  />
                  {/* Simple markers from regionMap */}
                  {regionMap.map((r, i) => {
                    const x = 100 + (r.coordinates?.lng || 0) / 2
                    const y = 100 - (r.coordinates?.lat || 0) / 4
                    return (
                      <circle
                        key={r.name}
                        cx={x}
                        cy={y}
                        r={3.5}
                        fill="#fffb"
                        onClick={() => selectRegion(r)}
                        className="cursor-pointer"
                      />
                    )
                  })}
                </svg>
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  {regionMap.map((r) => (
                    <button
                      key={r.name}
                      onClick={() => selectRegion(r)}
                      className="text-left p-3 rounded bg-white/3"
                    >
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-sm text-muted-foreground">
                        TLD: {r.primaryTld} · {r.listingCount ?? 0} listings
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {selected ?
              <div>
                <h2 className="text-xl font-semibold">
                  {selected.name} domain opportunities
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {selected.marketNote}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.length === 0 && (
                    <div className="text-muted-foreground">
                      No active listings for this TLD yet. Create an alert to be
                      notified.
                    </div>
                  )}
                  {results.map((r) => (
                    <div key={r.id} className="p-3 rounded bg-white/3">
                      <div className="font-mono font-semibold">{r.domain}</div>
                      <div className="text-sm text-muted-foreground">
                        {r.category} · {r.price} USDC
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Link href={`/marketplace/${encodeURIComponent(r.id)}`}>
                          {' '}
                          <Button variant="outline">View</Button>
                        </Link>
                        <Button>Start escrow</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            : <div className="text-muted-foreground">
                Select a region on the globe or from the list to see regional
                domains.
              </div>
            }
          </div>
        </div>

        <aside>
          <div className="p-4 bg-white/3 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Region summary</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a region to view market stats and TLD opportunities.
                </p>
              </div>
            </div>
            {selected && (
              <div className="mt-4 text-sm">
                <div>
                  Primary TLD: <strong>{selected.primaryTld}</strong>
                </div>
                <div>
                  Listings: <strong>{selected.listingCount}</strong>
                </div>
                <div>
                  Avg price: <strong>{selected.averagePrice} USDC</strong>
                </div>
                <div className="mt-2">
                  <Link
                    href={`/marketplace?tld=${encodeURIComponent(selected.primaryTld)}&country=${selected.countryCode}`}
                  >
                    <Button className="mt-2">
                      View all {selected.primaryTld} domains
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
