'use client'

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
