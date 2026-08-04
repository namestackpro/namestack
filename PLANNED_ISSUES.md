# Planned Issues — NameStack

This document tracks the scoped, ready-to-pick-up work across both NameStack
repositories, organized by area. It exists so contributors (via the Stellar Wave
Program or otherwise) have a clear picture of what's planned, not just a raw issue
list with no context.

## namestack-contracts

| Issue | Complexity | Area |
|---|---|---|
| Add doc comments to all public contract functions | Trivial | Docs |
| Add full-lifecycle integration test suite against testnet in CI | Medium | Testing |
| Add `get_admin` / `get_arbitrator` / `get_fee_config` read functions | Medium | Transparency |
| Add emergency-pause admin function for escrow creation | High | Safety |

**Context:** the contract is deployed and tested end-to-end on testnet (create →
confirm, create → dispute → resolve, correct fee splits — all verified against real
transactions). What's missing is defense-in-depth: read functions so anyone can
verify the contract's config without needing to trust the maintainer's word, an
automated test suite that runs in CI rather than relying on manual testnet checks,
and a pause mechanism in case a critical bug is found post-deployment.

## namestack (app)

| Issue | Complexity | Area |
|---|---|---|
| Clean up unused-variable ESLint warnings across ~8 files | Trivial | Housekeeping |
| Add unit tests for `packages/sdk` escrow functions (mocked contract calls) | Medium | Testing |
| Reduce unused JavaScript flagged by Lighthouse (~685 KiB) | Medium | Performance |
| Add GitHub Actions CI workflow for `apps/web` (#20) | Medium | Infrastructure |
| Add loading skeleton states to marketplace/escrow pages | Trivial | UX |
| Replace hardcoded sample listings with a real listings data source | Medium | Feature |
| Build wallet-based "My Escrows" auto-lookup (replace manual ID entry) | High | Feature |

**Context:** the escrow marketplace flow works end-to-end (tested with a real
Freighter wallet against the live testnet contract), and a critical Next.js RCE
vulnerability was already found and patched. The `packages/sdk` layer has no
automated tests yet — only typechecking — which is the highest-value testing gap.
The "My Escrows" page currently requires typing in an escrow ID manually; the
natural next step is looking escrows up by connected wallet address instead, which
needs either an indexer or a lightweight backend query, hence the higher complexity
rating.

## Sequencing notes for contributors

- The **wallet-based escrow lookup** feature (High, app repo) doesn't depend on any
  contract change — the contract's `get_escrow` function and existing events are
  sufficient; this is purely an app-layer indexing/query problem.
- The **emergency-pause function** (High, contracts repo) is independent of
  everything else and can be picked up any time.
- Testing issues (both repos) are good candidates to tackle before feature work,
  since they'll catch regressions in anything built afterward.
