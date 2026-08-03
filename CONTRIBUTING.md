# Contributing to namestack

Thanks for your interest in contributing. This repo is the application layer for
NameStack — a domain portfolio manager for resellers, with on-chain escrow
settlement powered by the contracts in
[namestack-contracts](https://github.com/namestackpro/namestack-contracts).

## Getting started

1. Fork the repo and clone your fork.
2. Install [pnpm](https://pnpm.io) if you don't have it.
3. Install dependencies from the repo root:
   ```bash
   pnpm install
   ```
4. Copy the env file and fill in any missing values:
   ```bash
   cp apps/web/.env.local.example apps/web/.env.local
   ```
   The example file already has real Stellar testnet contract addresses — no
   lookup needed for those. See `apps/web/README.md` for the full variable list.
5. Install the [Freighter](https://freighter.app) browser extension for wallet
   testing, and switch it to Testnet.
6. Run the dev server:
   ```bash
   pnpm --filter namestack dev
   ```

## Project structure

- `apps/web` — the Next.js dashboard and marketplace
- `apps/worker` — Cloudflare Worker (backend)
- `packages/sdk` — Stellar/Soroban client library used by `apps/web` to talk to the
  escrow contract

## Making changes

- Open an issue first for anything beyond a small fix.
- One logical change per commit, clear commit messages
  (`type(scope): description`, e.g. `feat(web): add domain sorting`).
- Run `pnpm --filter @namestack/sdk typecheck` before opening a PR if you touched
  `packages/sdk`.
- Open PRs against `main`. Direct pushes to `main` are disabled.

## Code style

- TypeScript strict mode, no `any` in `packages/sdk`.
- Soroban token amounts are always `bigint` in application code — never `number`,
  which loses precision on large values.
- Match existing component patterns in `apps/web/src/components` rather than
  introducing new ones for the same purpose.

## Questions

Open an issue, or reach out on Discord: **ciscokwiz**.
