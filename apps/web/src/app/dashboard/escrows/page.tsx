'use client'

import React, { useMemo, useState } from 'react'
import { sampleListings } from '@/lib/sample-listings'
import { Button } from '@/components/ui/button'

type Escrow = {
  id: string
  domain: string
  amount: number
  buyer: string
  seller: string
  status:
    | 'Funded'
    | 'Released'
    | 'Refunded'
    | 'Disputed'
    | 'Awaiting buyer'
    | 'Awaiting seller'
  createdAt: string
}

const mockEscrows: Escrow[] = [
  {
    id: 'esc-101',
    domain: 'islandstay.cv',
    amount: 850,
    buyer: 'GBUYER1',
    seller: 'GCVSELLER1',
    status: 'Funded',
    createdAt: '2026-08-02'
  },
  {
    id: 'esc-104',
    domain: 'fintech.cv',
    amount: 2400,
    buyer: 'GBUYER2',
    seller: 'GCVFIN1',
    status: 'Disputed',
    createdAt: '2026-07-05'
  },
  {
    id: 'esc-110',
    domain: 'lume.com',
    amount: 12500,
    buyer: 'GBUYER3',
    seller: 'GCOMSELLER1',
    status: 'Released',
    createdAt: '2026-06-20'
  }
]

export default function EscrowCommandCenter() {
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState<Escrow | null>(mockEscrows[0])

  const filtered = useMemo(() => {
    const v = q.toLowerCase().trim()
    if (!v) return mockEscrows
    return mockEscrows.filter(
      (e) =>
        e.id.toLowerCase().includes(v)
        || e.domain.toLowerCase().includes(v)
        || e.buyer.toLowerCase().includes(v)
        || e.seller.toLowerCase().includes(v)
    )
  }, [q])

  return (
    <div className="p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Escrow Command Center</h1>
          <p className="text-muted-foreground mt-1">
            Track domain transfers, manage buyer and seller actions, and resolve
            escrow milestones with transparent on-chain status.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Connect Wallet</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside>
          <div className="mb-4">
            <label className="sr-only">Search escrows</label>
            <input
              placeholder="Enter escrow ID, domain, buyer, or seller..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-md bg-transparent border px-3 py-2"
            />
          </div>

          <div className="space-y-2">
            {filtered.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelected(e)}
                className={`w-full text-left p-3 rounded ${selected?.id === e.id ? 'bg-primary/20' : 'bg-white/3'}`}
              >
                <div className="flex justify-between">
                  <div className="font-semibold">{e.id}</div>
                  <div className="text-sm">{e.status}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {e.domain} · {e.amount} USDC
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className="lg:col-span-2">
          {!selected && (
            <div className="text-muted-foreground">
              No escrow selected. Search or pick one from the list.
            </div>
          )}
          {selected && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{selected.id}</h2>
                  <div className="text-sm text-muted-foreground">
                    {selected.domain} · {selected.amount} USDC
                  </div>
                </div>
                <div className="text-sm">
                  <div>
                    Status: <strong>{selected.status}</strong>
                  </div>
                  <div>Created: {selected.createdAt}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded bg-white/3">
                  <div className="text-sm text-muted-foreground">Buyer</div>
                  <div className="font-mono mt-1">{selected.buyer}</div>
                </div>
                <div className="p-4 rounded bg-white/3">
                  <div className="text-sm text-muted-foreground">Seller</div>
                  <div className="font-mono mt-1">{selected.seller}</div>
                </div>
                <div className="p-4 rounded bg-white/3">
                  <div className="text-sm text-muted-foreground">Amount</div>
                  <div className="font-semibold mt-1">
                    {selected.amount} USDC
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold">Escrow lifecycle</h3>
                <ol className="mt-2 text-sm text-muted-foreground list-decimal pl-5">
                  <li>Escrow Created</li>
                  <li
                    className={
                      selected.status === 'Funded' ?
                        'text-foreground'
                      : 'text-muted-foreground'
                    }
                  >
                    Buyer Funded
                  </li>
                  <li>Seller Transfers Domain</li>
                  <li>Buyer Confirms Receipt</li>
                  <li>Funds Released</li>
                </ol>
              </div>

              <div className="flex gap-2">
                {selected.status === 'Funded' && (
                  <>
                    <Button>Confirm Domain Receipt</Button>
                    <Button variant="destructive">Raise Dispute</Button>
                  </>
                )}
                {selected.status === 'Disputed' && (
                  <div className="p-3 rounded bg-amber-600/10">
                    Escrow under review — no release action available.
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold">Activity</h4>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>Escrow {selected.id} funded — 2026-08-02</li>
                  <li>Buyer requested transfer confirmation — 2026-08-03</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
;('use client')

import { useState } from 'react'
import {
  connect,
  getEscrow,
  confirmReceipt,
  raiseDispute
} from '@namestack/sdk'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Escrow {
  buyer: string
  seller: string
  token: string
  amount: bigint
  domain_ref: string
  status: 'Funded' | 'Released' | 'Refunded' | 'Disputed'
  created_ledger: number
}

export default function EscrowsPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [escrowIdInput, setEscrowIdInput] = useState('')
  const [isLookingUp, setIsLookingUp] = useState(false)
  const [isActing, setIsActing] = useState(false)
  const [escrow, setEscrow] = useState<Escrow | null>(null)
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

  const handleLookup = async () => {
    if (!escrowIdInput.trim()) return
    const id = BigInt(escrowIdInput.trim())

    setIsLookingUp(true)
    setError(null)
    setEscrow(null)

    try {
      const result = await getEscrow(id)
      setEscrow(result)
      setEscrowId(id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to look up escrow')
    } finally {
      setIsLookingUp(false)
    }
  }

  const handleAction = async (action: 'confirm' | 'dispute') => {
    if (!escrow || !walletAddress || !escrowId) return

    setIsActing(true)
    setError(null)

    try {
      if (action === 'confirm') {
        await confirmReceipt(escrowId)
      } else {
        await raiseDispute(escrowId)
      }
      const updated = await getEscrow(escrowId)
      setEscrow(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${action}`)
    } finally {
      setIsActing(false)
    }
  }

  const isBuyer = walletAddress && escrow && walletAddress === escrow.buyer
  const isSeller = walletAddress && escrow && walletAddress === escrow.seller
  const status = escrow?.status

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Escrows</h1>
            <p className="text-muted-foreground mt-1">
              Look up and manage your escrow transactions
            </p>
          </div>
          {!walletAddress ?
            <Button onClick={handleConnect} size="lg" disabled={isConnecting}>
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          : <p className="text-sm text-muted-foreground">
              Connected:{' '}
              <span className="font-mono">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
              </span>
            </p>
          }
        </div>

        {!walletAddress && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">
                Connect your wallet to look up and manage escrows
              </p>
              <Button onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            </CardContent>
          </Card>
        )}

        {walletAddress && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Look Up Escrow</CardTitle>
                <CardDescription>
                  Enter an escrow ID to view its details and take actions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="escrow-id"
                    className="mb-1 block text-sm font-medium text-foreground"
                  >
                    Escrow ID
                  </label>
                  <Input
                    id="escrow-id"
                    type="number"
                    placeholder="e.g. 123"
                    value={escrowIdInput}
                    onChange={(e) => setEscrowIdInput(e.target.value)}
                    disabled={isLookingUp}
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={handleLookup}
                  disabled={isLookingUp || !escrowIdInput.trim()}
                  className="mt-10 sm:mt-0"
                >
                  {isLookingUp ? 'Looking Up...' : 'Look Up'}
                </Button>
              </CardContent>
            </Card>

            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive mb-6">
                {error}
              </div>
            )}

            {escrow && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-mono">
                    Escrow #{escrowId?.toString() ?? '—'}
                  </CardTitle>
                  <CardDescription>
                    Domain:{' '}
                    <span className="font-mono">{escrow.domain_ref}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Buyer</p>
                      <p className="text-sm font-mono text-foreground truncate">
                        {escrow.buyer}
                        {isBuyer && (
                          <span className="ml-2 text-xs text-green-600">
                            (you)
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seller</p>
                      <p className="text-sm font-mono text-foreground truncate">
                        {escrow.seller}
                        {isSeller && (
                          <span className="ml-2 text-xs text-green-600">
                            (you)
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="text-xl font-bold text-foreground">
                        {Number(escrow.amount) / 10 ** 7} USDC
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Token</p>
                      <p className="text-sm font-mono text-foreground truncate">
                        {escrow.token}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-lg font-semibold text-foreground capitalize">
                        {status?.toLowerCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Created Ledger
                      </p>
                      <p className="text-sm font-mono text-foreground">
                        {escrow.created_ledger}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex flex-col gap-3">
                    {status === 'Funded' && isBuyer && (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleAction('confirm')}
                          disabled={isActing}
                          className="flex-1"
                        >
                          {isActing ? 'Confirming...' : 'Confirm Receipt'}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleAction('dispute')}
                          disabled={isActing}
                          className="flex-1"
                        >
                          {isActing ? 'Raising...' : 'Raise Dispute'}
                        </Button>
                      </div>
                    )}
                    {status === 'Funded' && isSeller && !isBuyer && (
                      <Button
                        variant="destructive"
                        onClick={() => handleAction('dispute')}
                        disabled={isActing}
                        className="w-full"
                      >
                        {isActing ? 'Raising...' : 'Raise Dispute'}
                      </Button>
                    )}
                    {status === 'Disputed' && (
                      <div className="rounded-md bg-yellow-500/10 border border-yellow-500/20 p-4 text-sm text-yellow-700 dark:text-yellow-400">
                        <p className="font-medium">
                          This escrow is under dispute
                        </p>
                        <p className="mt-1">
                          Resolution is handled by an arbitrator. No actions
                          available.
                        </p>
                      </div>
                    )}
                    {status === 'Released' && (
                      <div className="rounded-md bg-green-500/10 border border-green-500/20 p-4 text-sm text-green-700 dark:text-green-400">
                        <p className="font-medium">Escrow released</p>
                        <p className="mt-1">
                          Funds have been transferred to the seller.
                        </p>
                      </div>
                    )}
                    {status === 'Refunded' && (
                      <div className="rounded-md bg-blue-500/10 border border-blue-500/20 p-4 text-sm text-blue-700 dark:text-blue-400">
                        <p className="font-medium">Escrow refunded</p>
                        <p className="mt-1">
                          Funds have been returned to the buyer.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
