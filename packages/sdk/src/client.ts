import { Networks, rpc } from '@stellar/stellar-sdk'

const RPC_URL = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL

if (!RPC_URL) {
  throw new Error(
    'NEXT_PUBLIC_SOROBAN_RPC_URL is not set — check your .env.local'
  )
}

export const NETWORK_PASSPHRASE =
  process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE ?? Networks.TESTNET

export const client = new rpc.Server(RPC_URL)
