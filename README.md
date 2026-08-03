# NameStack

A domain portfolio manager for resellers — track domain health, renewals, and
resale value, with a Stellar-powered escrow marketplace for buying and selling
domains on-chain.

Payments and escrow settle through a Soroban smart contract in
[namestack-contracts](https://github.com/namestackpro/namestack-contracts) —
funds are held on-chain until the buyer confirms receipt, instead of relying on a
third-party escrow service.

## Maintainer

| | |
|---|---|
| **cisco_91** | [GitHub](https://github.com/ciscokwiz) · Discord: **ciscokwiz** |

Questions or security concerns: open an issue, or reach out on Discord.

## Contents

- [Repo structure](#repo-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Known issues](#known-issues)
- [Contributing](#contributing)

## Repo structure

This is a pnpm/Turborepo monorepo:

```
apps/
  web/       Next.js dashboard, domain vault, and escrow marketplace
  worker/    Cloudflare Worker backend
packages/
  sdk/       Stellar/Soroban client library — wallet connection, contract calls,
             error decoding. Used by apps/web.
```

## Getting started

```bash
pnpm install
cp apps/web/.env.local.example apps/web/.env.local
pnpm --filter namestack dev
```

You'll also need the [Freighter](https://freighter.app) browser extension,
switched to Testnet, to connect a wallet and test the marketplace flow.

## Environment variables

See [`apps/web/README.md`](apps/web/README.md) for the full list. The example
file already contains real Stellar testnet contract addresses — no lookup
required to get started.

## Known issues

- **Production build currently fails** on `/dashboard/domainvault` due to a missing
  Clerk `publishableKey` — this is a pre-existing configuration gap unrelated to
  the escrow marketplace feature, tracked in open issues. `pnpm dev` and all
  typechecking work fine in the meantime.
- **No CI workflow yet** for `apps/web` — also tracked, planned alongside branch
  protection setup.
- Dependency vulnerabilities flagged by Dependabot — see [`SECURITY.md`](SECURITY.md).

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for setup, project structure, and PR
guidelines.

## Contributors

<a href="https://github.com/namestackpro/namestack/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=namestackpro/namestack" />
</a>
