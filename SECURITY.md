# Security Policy

## Scope

This repo is the application layer for NameStack — the Next.js dashboard,
marketplace UI, and the `packages/sdk` Stellar client library. It does not hold
funds itself and contains no fund-custody logic; that lives entirely in the
[namestack-contracts](https://github.com/namestackpro/namestack-contracts) repo
and its own audit status.

Security concerns relevant to this repo include:

- Wallet connection and transaction-signing flows (`packages/sdk/src/wallet.ts`)
- Correct construction of contract calls and correct decimal/unit handling for
  token amounts (`packages/sdk/src/escrow.ts`)
- Standard web app concerns: XSS, dependency vulnerabilities, environment variable
  handling

## Reporting a vulnerability

If you find a security issue, please report it privately rather than opening a
public issue.

**Contact:** Discord **ciscokwiz**, or open a private security advisory via
GitHub's "Report a vulnerability" feature under this repo's Security tab.

Please include:

- A description of the issue and its potential impact
- Steps to reproduce
- Any suggested fix, if you have one

We'll acknowledge reports within a reasonable timeframe and keep you updated as
the issue is addressed. Please give us time to release a fix before disclosing
publicly.

## Dependencies

This repo has known dependency vulnerabilities flagged by GitHub's Dependabot,
visible under the Security tab. If you're picking up dependency-update work,
check there first — no formal triage/tracking has been set up yet, so treat any
listed vulnerability as unaddressed until an issue references it.
