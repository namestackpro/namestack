import {
  getAddress,
  requestAccess,
  signTransaction as freighterSignTransaction
} from '@stellar/freighter-api'

import { NETWORK_PASSPHRASE } from './client.js'

export async function connect(): Promise<string> {
  const { address, error } = await requestAccess()
  if (error || !address) {
    throw new Error(
      `Freighter connection failed: ${error?.message ?? 'no address returned'}`
    )
  }
  return address
}

export async function getPublicKey(): Promise<string> {
  const { address, error } = await getAddress()
  if (error || !address) {
    throw new Error(
      `Freighter getPublicKey failed: ${error?.message ?? 'no address returned — call connect() first'}`
    )
  }
  return address
}

export async function signTransaction(transactionXdr: string): Promise<string> {
  const { signedTxXdr, error } = await freighterSignTransaction(
    transactionXdr,
    {
      networkPassphrase: NETWORK_PASSPHRASE
    }
  )
  if (error || !signedTxXdr) {
    throw new Error(
      `Freighter signing failed: ${error?.message ?? 'no signed transaction returned'}`
    )
  }
  return signedTxXdr
}
