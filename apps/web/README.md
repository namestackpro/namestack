This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment Variables

Copy the example file and adjust if needed:

```bash
cp apps/web/.env.local.example apps/web/.env.local
```

The `.env.local.example` already contains real Stellar testnet values for the contract IDs — you can use it directly without looking up any addresses.

**Required variables in `.env.local`:**

| Variable                             | Description                      | Example                                                    |
| ------------------------------------ | -------------------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_SOROBAN_RPC_URL`        | Soroban RPC endpoint             | `https://soroban-testnet.stellar.org`                      |
| `NEXT_PUBLIC_NETWORK_PASSPHRASE`     | Stellar network passphrase       | `Test SDF Network ; September 2015`                        |
| `NEXT_PUBLIC_ESCROW_CONTRACT_ID`     | Deployed escrow contract address | `CDEBCEAR3GXUV6KO2T3AOWE5D5J4LDO46GMARBYRAPPD3IPF6GTWA7OP` |
| `NEXT_PUBLIC_USDC_TOKEN_CONTRACT_ID` | USDC token contract on testnet   | `CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA` |

### Wallet Requirement

[Freighter](https://freighter.app/) browser extension is required for wallet connection and transaction signing. Install it before running the app.

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
