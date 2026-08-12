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

export default async function ListingPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
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
    <div className="min-h-screen p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{listing.domain}</h1>
          <p className="text-muted-foreground mt-1">
            {listing.category} · {listing.country || listing.region}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold">{listing.price} USDC</p>
          <p className="text-sm text-muted-foreground">
            Est. {listing.estimatedValue} USDC · Score {listing.qualityScore}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.75fr_1fr]">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Domain Intelligence</CardTitle>
              <CardDescription>
                AI valuation note, market demand, and brand signals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {listing.aiInsight}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Brandability
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {Math.round(listing.qualityScore * 0.9)}
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Demand
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {listing.demandScore}
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Renewal risk
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {listing.renewalRisk}
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Upside
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {listing.valuationUpside}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Transfer expectations</CardTitle>
              <CardDescription>What happens after purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
                <li>Buyer funds escrow</li>
                <li>Seller transfers domain to buyer&apos;s registrar</li>
                <li>Buyer confirms ownership</li>
                <li>Funds are released to seller</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase</CardTitle>
              <CardDescription>Secure escrow checkout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  Domain price: <strong>{listing.price} USDC</strong>
                </div>
                <div>
                  Estimated escrow fee: <strong>10 USDC</strong>
                </div>
                <div>
                  Network fee estimate: <strong>2 USDC</strong>
                </div>
                <div>
                  Total: <strong>{listing.price + 12} USDC</strong>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Button>Connect Wallet</Button>
                <Button variant="secondary">Start Secure Escrow</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seller</CardTitle>
              <CardDescription>
                {listing.sellerAlias || listing.seller}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                Verification:{' '}
                {listing.sellerVerified ? 'Verified' : 'Unverified'}
              </div>
              <div className="text-sm">Completed deals: 12</div>
              <div className="text-sm">Response time: 6h</div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
