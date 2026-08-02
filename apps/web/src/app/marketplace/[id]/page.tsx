'use client'

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
