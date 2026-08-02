interface Listing {
  domain: string
  price: string
  seller: string
}

// Placeholder sample data - not real listings
export const sampleListings: Listing[] = [
  {
    domain: 'premium.xlm',
    price: '500',
    seller: 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
  },
  {
    domain: 'defi.stellar',
    price: '1200',
    seller: 'GBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
  },
  {
    domain: 'nft.gallery',
    price: '750',
    seller: 'GCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC'
  }
]

export function getListingByDomain(domain: string): Listing | undefined {
  return sampleListings.find((l) => l.domain === domain)
}
