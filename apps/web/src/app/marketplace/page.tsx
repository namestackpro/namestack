'use client'

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
