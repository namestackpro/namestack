import React from 'react'
import Link from 'next/link'
import { getListingByDomain } from '@/lib/sample-listings'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Props = { params: { id: string } }

export default function ListingPage({ params }: Props) {
  const id = params.id
  const listing = getListingByDomain(id)

  if (!listing) {
    return (
      <div className="p-6">
        <h2 className="text-2xl">Listing not found</h2>
        <p className="text-muted-foreground mt-2">
          Try browsing the <Link href="/marketplace">marketplace</Link>.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{listing.domain}</h1>
          <div className="text-sm text-muted-foreground mt-1">
            {listing.category} · {listing.country || listing.region}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-semibold">{listing.price} USDC</div>
          <div className="text-sm text-muted-foreground">
            Est. {listing.estimatedValue} USDC · Score {listing.qualityScore}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <main className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Domain Intelligence</CardTitle>
              <CardDescription>
                AI valuation, comparables, and market signals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {listing.aiInsight}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/3 rounded">
                  Brandability
                  <br />
                  <strong>{Math.round(listing.qualityScore * 0.9)}</strong>
                </div>
                <div className="p-3 bg-white/3 rounded">
                  Demand
                  <br />
                  <strong>{listing.demandScore}</strong>
                </div>
                <div className="p-3 bg-white/3 rounded">
                  Renewal risk
                  <br />
                  <strong>{listing.renewalRisk}</strong>
                </div>
                <div className="p-3 bg-white/3 rounded">
                  Valuation upside
                  <br />
                  <strong>{listing.valuationUpside}%</strong>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Transfer expectations</CardTitle>
              <CardDescription>What happens after purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 text-sm text-muted-foreground">
                <li>Buyer funds escrow</li>
                <li>Seller transfers domain to buyer's registrar</li>
                <li>Buyer confirms ownership</li>
                <li>Funds are released to seller</li>
              </ol>
            </CardContent>
          </Card>
        </main>

        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Purchase</CardTitle>
              <CardDescription>Secure checkout via escrow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Price {listing.price} USDC
              </div>
              <div className="mt-3 text-sm">
                Estimated escrow fee: <strong>10 USDC</strong>
              </div>
              <div className="mt-2">
                <Button className="w-full">Start Secure Escrow</Button>
              </div>
              <div className="mt-2">
                <Button variant="ghost" className="w-full">
                  Add to watchlist
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Seller</CardTitle>
              <CardDescription>
                {listing.sellerAlias || listing.seller}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                Verified: {listing.sellerVerified ? 'Yes' : 'No'}
              </div>
              <div className="text-sm mt-2">Completed deals: 12</div>
              <div className="text-sm">Response time: 6h</div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
;('use client')

import { useState } from 'react'
import { use } from 'react'
import { notFound } from 'next/navigation'
import { connect, createEscrow } from '@namestack/sdk'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { getListingByDomain } from '@/lib/sample-listings'

interface ListingPageProps {
  params: Promise<{ id: string }>
}

export default function ListingPage({ params }: ListingPageProps) {
  const resolvedParams = use(params)
  const domain = resolvedParams.id
  const listing = getListingByDomain(domain)

  if (!listing) {
    notFound()
  }

  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isBuying, setIsBuying] = useState(false)
  const [escrowId, setEscrowId] = useState<bigint | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async (): Promise<string | null> => {
    setIsConnecting(true)
    setError(null)
    try {
      const address = await connect()
      setWalletAddress(address)
      return address
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
      return null
    } finally {
      setIsConnecting(false)
    }
  }

  const handleBuy = async () => {
    let address = walletAddress
    if (!address) {
      address = await handleConnect()
      if (!address) return
    }

    setIsBuying(true)
    setError(null)
    setEscrowId(null)

    try {
      const id = await createEscrow({
        seller: listing.seller,
        domainRef: listing.domain,
        amount: listing.price
      })
      setEscrowId(id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Purchase failed')
    } finally {
      setIsBuying(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardContent className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              ← Back to Marketplace
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-mono">
              {listing.domain}
            </CardTitle>
            <CardDescription>Premium domain listing</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-3xl font-bold text-foreground">
                  {listing.price} USDC
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seller</p>
                <p className="text-sm font-mono text-foreground truncate max-w-[200px]">
                  {listing.seller}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              {walletAddress ?
                <p className="text-sm text-muted-foreground">
                  Connected:{' '}
                  <span className="font-mono">
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                  </span>
                </p>
              : <p className="text-sm text-muted-foreground">
                  Wallet not connected
                </p>
              }
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            {escrowId && (
              <div className="rounded-md bg-green-500/10 border border-green-500/20 p-4 text-sm text-green-700 dark:text-green-400">
                <p className="font-medium">Purchase successful!</p>
                <p className="font-mono mt-1">
                  Escrow ID: {escrowId.toString()}
                </p>
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={handleBuy}
              disabled={isConnecting || isBuying}
            >
              {isConnecting ?
                'Connecting...'
              : isBuying ?
                'Creating Escrow...'
              : walletAddress ?
                `Buy Now — ${listing.price} USDC`
              : 'Connect Wallet to Buy'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
