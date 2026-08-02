import {
  Account,
  Address,
  BASE_FEE,
  Contract,
  nativeToScVal,
  rpc,
  scValToNative,
  TransactionBuilder,
  xdr
} from '@stellar/stellar-sdk'

import { client, NETWORK_PASSPHRASE } from './client.js'
import { getPublicKey, signTransaction } from './wallet.js'

const escrowContractId = process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ID

if (
  !escrowContractId
  || escrowContractId === 'PLACEHOLDER_ESCROW_CONTRACT_ID'
) {
  throw new Error(
    'NEXT_PUBLIC_ESCROW_CONTRACT_ID is not configured yet — set it to the deployed escrow contract address'
  )
}

export const ESCROW_CONTRACT_ID = escrowContractId

export const USDC_TOKEN_CONTRACT_ID =
  'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA'

export const USDC_DECIMALS = 7

const POLL_INTERVAL_MS = 1_000
const POLL_TIMEOUT_MS = 30_000

const CONTRACT_ERROR_NAMES: Record<number, string> = {
  1: 'NotInitialized',
  2: 'AlreadyInitialized',
  3: 'EscrowNotFound',
  4: 'InvalidStatus',
  5: 'Unauthorized',
  6: 'InvalidReleaseTarget'
}

export function toTokenSmallestUnit(amount: string, decimals: number): bigint {
  if (decimals < 0) {
    throw new Error(`decimals must be non-negative, got ${decimals}`)
  }
  if (amount.startsWith('-')) {
    throw new Error(`amount must not be negative, got "${amount}"`)
  }
  const [whole, fraction = ''] = amount.split('.')
  if (fraction.length > decimals) {
    throw new Error(
      `amount "${amount}" has more than ${decimals} decimal places for this token`
    )
  }
  const scaledFraction = fraction.padEnd(decimals, '0')
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(scaledFraction)
}

export interface CreateEscrowParams {
  seller: string
  domainRef: string
  amount: string
  token?: string
  decimals?: number
}

export async function createEscrow({
  seller,
  domainRef,
  amount,
  token = USDC_TOKEN_CONTRACT_ID,
  decimals = USDC_DECIMALS
}: CreateEscrowParams): Promise<bigint> {
  const buyer = await getPublicKey()
  const amountSmallestUnit = toTokenSmallestUnit(amount, decimals)

  const result = await invokeContract('create_escrow', [
    new Address(buyer).toScVal(),
    new Address(seller).toScVal(),
    new Address(token).toScVal(),
    nativeToScVal(amountSmallestUnit, { type: 'i128' }),
    nativeToScVal(domainRef)
  ])

  if (!result.returnValue) {
    throw new Error('create_escrow returned no escrow_id')
  }
  return BigInt(result.returnValue.u64().toString())
}

export async function confirmReceipt(escrowId: bigint): Promise<void> {
  await invokeContract('confirm_receipt', [
    nativeToScVal(escrowId, { type: 'u64' })
  ])
}

export async function raiseDispute(escrowId: bigint): Promise<void> {
  const caller = await getPublicKey()

  await invokeContract('raise_dispute', [
    nativeToScVal(escrowId, { type: 'u64' }),
    new Address(caller).toScVal()
  ])
}

export async function resolveDispute(
  escrowId: bigint,
  releaseTo: string
): Promise<void> {
  await invokeContract('resolve_dispute', [
    nativeToScVal(escrowId, { type: 'u64' }),
    new Address(releaseTo).toScVal()
  ])
}

export type EscrowStatus = 'Funded' | 'Released' | 'Refunded' | 'Disputed'

export interface Escrow {
  buyer: string
  seller: string
  token: string
  amount: bigint
  domain_ref: string
  status: EscrowStatus
  created_ledger: number
}

const ESCROW_STATUSES: readonly EscrowStatus[] = [
  'Funded',
  'Released',
  'Refunded',
  'Disputed'
]

const READ_ONLY_ACCOUNT =
  'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'

export async function getEscrow(escrowId: bigint): Promise<Escrow> {
  const transaction = new TransactionBuilder(
    new Account(READ_ONLY_ACCOUNT, '0'),
    {
      fee: BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE
    }
  )
    .addOperation(
      new Contract(ESCROW_CONTRACT_ID).call(
        'get_escrow',
        nativeToScVal(escrowId, { type: 'u64' })
      )
    )
    .setTimeout(30)
    .build()

  const simulation = await client.simulateTransaction(transaction)
  if (rpc.Api.isSimulationError(simulation)) {
    throw new Error(`get_escrow simulation failed: ${simulation.error}`)
  }
  if (!simulation.result) {
    throw new Error('get_escrow simulation returned no result')
  }

  return normalizeEscrow(scValToNative(simulation.result.retval))
}

function normalizeEscrow(decoded: unknown): Escrow {
  if (typeof decoded !== 'object' || decoded === null) {
    throw new Error(`get_escrow returned unexpected value: ${String(decoded)}`)
  }
  const { buyer, seller, token, amount, domain_ref, status, created_ledger } =
    decoded as Record<string, unknown>

  if (
    typeof buyer !== 'string'
    || typeof seller !== 'string'
    || typeof token !== 'string'
  ) {
    throw new Error('get_escrow returned unexpected address value')
  }
  if (typeof amount !== 'bigint') {
    throw new Error('get_escrow returned unexpected amount value')
  }
  if (typeof domain_ref !== 'string') {
    throw new Error('get_escrow returned unexpected domain_ref value')
  }
  const rawStatus = Array.isArray(status) ? status[0] : status
  if (
    typeof rawStatus !== 'string'
    || !ESCROW_STATUSES.includes(rawStatus as EscrowStatus)
  ) {
    throw new Error(
      `get_escrow returned unexpected status value: ${String(rawStatus)}`
    )
  }
  if (typeof created_ledger !== 'number') {
    throw new Error('get_escrow returned unexpected created_ledger value')
  }

  return {
    buyer,
    seller,
    token,
    amount,
    domain_ref,
    status: rawStatus as EscrowStatus,
    created_ledger
  }
}

async function invokeContract(
  method: string,
  args: xdr.ScVal[]
): Promise<rpc.Api.GetSuccessfulTransactionResponse> {
  const sourceAccount = await client.getAccount(await getPublicKey())

  const transaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE
  })
    .addOperation(new Contract(ESCROW_CONTRACT_ID).call(method, ...args))
    .setTimeout(30)
    .build()

  const simulation = await client.simulateTransaction(transaction)
  if (rpc.Api.isSimulationError(simulation)) {
    throw new Error(`${method} simulation failed: ${simulation.error}`)
  }

  const prepared = rpc.assembleTransaction(transaction, simulation).build()
  const signedXdr = await signTransaction(prepared.toXDR())

  const sendResponse = await client.sendTransaction(
    TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE)
  )
  if (sendResponse.status === 'ERROR') {
    throw new Error(
      `${method} send failed: ${sendResponse.errorResult?.toXDR('base64') ?? 'unknown error'}`
    )
  }

  const result = await pollTransaction(sendResponse.hash)
  if (result.status === 'SUCCESS') {
    return result
  }
  if (result.status === 'FAILED') {
    throw new Error(
      `${method} transaction ${sendResponse.hash} failed: ${describeTransactionFailure(result)}`
    )
  }
  throw new Error(`${method} transaction ${sendResponse.hash} did not succeed`)
}

function describeTransactionFailure(
  result: rpc.Api.GetFailedTransactionResponse
): string {
  const parts = [`tx result: ${result.resultXdr.result().switch().name}`]

  const errorValue = lastContractError(result.diagnosticEventsXdr ?? [])
  if (errorValue) {
    parts.push(errorValue)
  }

  return parts.join(' — ')
}

function lastContractError(
  diagnosticEvents: xdr.DiagnosticEvent[]
): string | null {
  for (const diagnostic of [...diagnosticEvents].reverse()) {
    const data = diagnostic.event().body().v0().data()
    if (data.switch().name !== 'scvError') {
      continue
    }
    const error = data.error()
    if (error.switch().name === 'sceContract') {
      const code = error.contractCode()
      const name = CONTRACT_ERROR_NAMES[code]
      return name === undefined ?
          `contract error ${code}`
        : `contract error ${code} (${name})`
    }
    return `host error: ${error.switch().name}(${error.code().name})`
  }
  return null
}

async function pollTransaction(
  hash: string
): Promise<rpc.Api.GetTransactionResponse> {
  const deadline = Date.now() + POLL_TIMEOUT_MS
  for (;;) {
    const response = await client.getTransaction(hash)
    if (response.status !== 'NOT_FOUND') {
      return response
    }
    if (Date.now() >= deadline) {
      throw new Error(`timed out waiting for transaction ${hash}`)
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
  }
}
