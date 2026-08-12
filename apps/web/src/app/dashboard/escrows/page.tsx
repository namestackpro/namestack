'use client'

import React, { useMemo, useState } from 'react'
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
    const value = q.toLowerCase().trim()
    if (!value) return mockEscrows
    return mockEscrows.filter(
      (e) =>
        e.id.toLowerCase().includes(value)
        || e.domain.toLowerCase().includes(value)
        || e.buyer.toLowerCase().includes(value)
        || e.seller.toLowerCase().includes(value)
    )
  }, [q])

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Escrow Command Center</h1>
          <p className="text-muted-foreground mt-1">
            Track domain transfers, manage buyer and seller actions, and resolve
            escrow milestones with transparent on-chain status.
          </p>
        </div>
        <Button>Connect Wallet</Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <label className="sr-only">Search escrows</label>
            <input
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              placeholder="Enter escrow ID, domain, buyer, or seller..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            {filtered.map((escrow) => (
              <button
                key={escrow.id}
                onClick={() => setSelected(escrow)}
                className={`w-full rounded-xl p-4 text-left transition ${selected?.id === escrow.id ? 'bg-primary/10 border border-primary/20' : 'bg-white/5'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{escrow.id}</span>
                  <span className="text-xs text-muted-foreground">
                    {escrow.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {escrow.domain} · {escrow.amount} USDC
                </p>
              </button>
            ))}
          </div>
        </aside>

        <main>
          {selected ?
            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{selected.id}</h2>
                    <p className="text-muted-foreground">
                      {selected.domain} · {selected.amount} USDC
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>
                      Status:{' '}
                      <span className="font-semibold text-foreground">
                        {selected.status}
                      </span>
                    </div>
                    <div className="mt-1">Created: {selected.createdAt}</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Buyer
                  </p>
                  <p className="mt-2 font-mono">{selected.buyer}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Seller
                  </p>
                  <p className="mt-2 font-mono">{selected.seller}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Amount
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {selected.amount} USDC
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">Escrow lifecycle</h3>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
                  <li>Escrow Created</li>
                  <li
                    className={
                      selected.status === 'Funded' ?
                        'text-foreground'
                      : undefined
                    }
                  >
                    Buyer Funded
                  </li>
                  <li>Seller Transfers Domain</li>
                  <li>Buyer Confirms Receipt</li>
                  <li>Funds Released</li>
                </ol>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {selected.status === 'Funded' ?
                  <>
                    <Button>Confirm Domain Receipt</Button>
                    <Button variant="destructive">Raise Dispute</Button>
                  </>
                : selected.status === 'Disputed' ?
                  <div className="rounded-xl bg-amber-600/10 p-4 text-sm text-muted-foreground">
                    Escrow under review — no release action available until
                    dispute resolution.
                  </div>
                : <div className="rounded-xl bg-white/5 p-4 text-sm text-muted-foreground">
                    Select another escrow to manage or search by ID.
                  </div>
                }
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h4 className="font-semibold">Activity feed</h4>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>Escrow {selected.id} funded — 2026-08-02</li>
                  <li>Buyer requested transfer confirmation — 2026-08-03</li>
                </ul>
              </div>
            </div>
          : <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-muted-foreground">
              No escrow selected. Search by escrow ID or choose an active escrow
              to view details.
            </div>
          }
        </main>
      </div>
    </div>
  )
}
