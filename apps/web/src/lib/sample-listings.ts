export type Listing = {
  id: string
  domain: string
  tld: string
  price: number
  estimatedValue: number
  seller: string
  sellerAlias?: string
  sellerVerified?: boolean
  category: string
  region: string
  country?: string
  countryCode?: string
  tags: string[]
  status: 'Available' | 'In escrow' | 'Sold'
  escrowAvailable: boolean
  qualityScore: number
  valuationUpside: number
  createdAt: string
  description?: string
  aiInsight?: string
  length: number
  demandScore: number
  renewalRisk: 'Low' | 'Medium' | 'High'
  featured?: boolean
}

export const sampleListings: Listing[] = [
  {
    id: 'cv-islandstay',
    domain: 'islandstay.cv',
    tld: '.cv',
    price: 850,
    estimatedValue: 1400,
    seller: 'GCI36CN2X6QZSXOUK3K6PO5F3YOCVCU3PQYOFU65NARLJZIQDSLRZUSP',
    sellerAlias: 'Atlantic Domains',
    sellerVerified: true,
    category: 'Travel',
    region: 'Africa',
    country: 'Cabo Verde',
    countryCode: 'CV',
    tags: ['travel', 'hospitality', 'island', 'local'],
    status: 'Available',
    escrowAvailable: true,
    qualityScore: 88,
    valuationUpside: 64,
    createdAt: '2026-08-01',
    description:
      'A strong country-code travel domain for lodging, tourism, and booking brands in Cabo Verde.',
    aiInsight:
      'Strong tourism relevance and local TLD alignment for Cabo Verde hospitality businesses.',
    length: 10,
    demandScore: 82,
    renewalRisk: 'Low',
    featured: true
  },
  {
    id: 'cv-praiahotels',
    domain: 'praiahotels.cv',
    tld: '.cv',
    price: 1200,
    estimatedValue: 2100,
    seller: 'GCVSELLER1',
    sellerAlias: 'Cabo Ventures',
    sellerVerified: false,
    category: 'Travel',
    region: 'Africa',
    country: 'Cabo Verde',
    countryCode: 'CV',
    tags: ['travel', 'hotels', 'booking'],
    status: 'Available',
    escrowAvailable: true,
    qualityScore: 85,
    valuationUpside: 75,
    createdAt: '2026-07-28',
    aiInsight: 'High intent for accommodation and tourism marketplaces.',
    length: 11,
    demandScore: 78,
    renewalRisk: 'Low',
    featured: false
  },
  {
    id: 'cv-kosisomedia',
    domain: 'kosisomedia.cv',
    tld: '.cv',
    price: 320,
    estimatedValue: 900,
    seller: 'GCVSELLER2',
    sellerAlias: 'IslandDeals',
    sellerVerified: true,
    category: 'Creator',
    region: 'Africa',
    country: 'Cabo Verde',
    countryCode: 'CV',
    tags: ['media', 'creator', 'local'],
    status: 'Available',
    escrowAvailable: true,
    qualityScore: 74,
    valuationUpside: 181,
    createdAt: '2026-06-12',
    aiInsight: 'Good for local media publishers and creative portfolios.',
    length: 11,
    demandScore: 62,
    renewalRisk: 'Medium'
  },
  {
    id: 'cv-fintech',
    domain: 'fintech.cv',
    tld: '.cv',
    price: 2400,
    estimatedValue: 4800,
    seller: 'GCVFIN1',
    sellerAlias: 'Atlantic Finance',
    sellerVerified: true,
    category: 'Finance',
    region: 'Africa',
    country: 'Cabo Verde',
    countryCode: 'CV',
    tags: ['finance', 'payments', 'banking'],
    status: 'In escrow',
    escrowAvailable: true,
    qualityScore: 91,
    valuationUpside: 100,
    createdAt: '2026-07-02',
    aiInsight: 'Strong fintech branding potential for regional payments.',
    length: 7,
    demandScore: 88,
    renewalRisk: 'Low'
  },
  {
    id: 'com-shortbrand',
    domain: 'lume.com',
    tld: '.com',
    price: 12500,
    estimatedValue: 22000,
    seller: 'GCOMSELLER1',
    sellerAlias: 'PremiumBrands',
    sellerVerified: true,
    category: 'Brandable',
    region: 'North America',
    country: 'United States',
    countryCode: 'US',
    tags: ['brandable', 'short', 'startup'],
    status: 'Available',
    escrowAvailable: true,
    qualityScore: 95,
    valuationUpside: 76,
    createdAt: '2026-05-20',
    aiInsight: 'Excellent short brand with high memorability.',
    length: 4,
    demandScore: 94,
    renewalRisk: 'Low',
    featured: true
  },
  {
    id: 'ai-datahub',
    domain: 'datahub.ai',
    tld: '.ai',
    price: 4800,
    estimatedValue: 7600,
    seller: 'GAISELLER1',
    sellerAlias: 'AI Estates',
    sellerVerified: true,
    category: 'AI',
    region: 'Europe',
    country: 'United Kingdom',
    countryCode: 'UK',
    tags: ['ai', 'data', 'ml'],
    status: 'Available',
    escrowAvailable: true,
    qualityScore: 89,
    valuationUpside: 58,
    createdAt: '2026-08-03',
    aiInsight: 'Strong for ML tooling and enterprise data products.',
    length: 7,
    demandScore: 85,
    renewalRisk: 'Low'
  },
  {
    id: 'io-devops',
    domain: 'orbit.io',
    tld: '.io',
    price: 2200,
    estimatedValue: 3600,
    seller: 'GIOSELLER1',
    sellerAlias: 'Orbital Markets',
    sellerVerified: false,
    category: 'Tech',
    region: 'Europe',
    country: 'Germany',
    countryCode: 'DE',
    tags: ['devops', 'infra'],
    status: 'Available',
    escrowAvailable: true,
    qualityScore: 81,
    valuationUpside: 64,
    createdAt: '2026-04-17',
    aiInsight: 'Good for tooling and developer platforms.',
    length: 6,
    demandScore: 70,
    renewalRisk: 'Medium'
  },
  {
    id: 'stellar-pay',
    domain: 'stellarpay.stellar',
    tld: '.stellar',
    price: 1600,
    estimatedValue: 3000,
    seller: 'GSTELLAR1',
    sellerAlias: 'ChainDomains',
    sellerVerified: true,
    category: 'Crypto/Web3',
    region: 'Global',
    country: '',
    countryCode: '',
    tags: ['crypto', 'payments', 'soroban'],
    status: 'Available',
    escrowAvailable: true,
    qualityScore: 84,
    valuationUpside: 87,
    createdAt: '2026-03-30',
    aiInsight: 'Good fit for blockchain payment rails and wallets.',
    length: 12,
    demandScore: 73,
    renewalRisk: 'Medium',
    featured: true
  }
  // more varied listings to reach ~40 items (for brevity only a selection is included)
]

export type Region = {
  name: string
  countryCode?: string
  region: string
  primaryTld: string
  relatedTlds?: string[]
  demandSignal?: string
  averagePrice?: number
  listingCount?: number
  coordinates?: { lat: number; lng: number }
  marketNote?: string
}

export const regionMap: Region[] = [
  {
    name: 'Cabo Verde',
    countryCode: 'CV',
    region: 'Africa',
    primaryTld: '.cv',
    relatedTlds: ['.com', '.travel'],
    demandSignal: 'Travel and local business',
    averagePrice: 740,
    listingCount: 12,
    coordinates: { lat: 16.5388, lng: -23.0418 },
    marketNote:
      '.cv domains are well-suited for Cabo Verde businesses, tourism brands, diaspora communities, and creator portfolios.'
  },
  {
    name: 'United States',
    countryCode: 'US',
    region: 'North America',
    primaryTld: '.us',
    relatedTlds: ['.com', '.app', '.dev'],
    demandSignal: 'Startup and SaaS',
    averagePrice: 2800,
    listingCount: 34,
    coordinates: { lat: 37.0902, lng: -95.7129 }
  },
  {
    name: 'United Kingdom',
    countryCode: 'UK',
    region: 'Europe',
    primaryTld: '.uk',
    relatedTlds: ['.com', '.co.uk'],
    demandSignal: 'Enterprise and finance',
    averagePrice: 2100,
    listingCount: 18,
    coordinates: { lat: 55.3781, lng: -3.436 }
  },
  {
    name: 'India',
    countryCode: 'IN',
    region: 'Asia-Pacific',
    primaryTld: '.in',
    relatedTlds: ['.com', '.io'],
    demandSignal: 'Large domestic market & startups',
    averagePrice: 420,
    listingCount: 22,
    coordinates: { lat: 20.5937, lng: 78.9629 }
  },
  {
    name: 'Brazil',
    countryCode: 'BR',
    region: 'Latin America',
    primaryTld: '.br',
    relatedTlds: ['.com', '.com.br'],
    demandSignal: 'Local commerce and marketplaces',
    averagePrice: 640,
    listingCount: 10,
    coordinates: { lat: -14.235, lng: -51.9253 }
  }
]

export function getListingByDomain(domainOrId: string): Listing | undefined {
  return sampleListings.find(
    (l) => l.id === domainOrId || l.domain === domainOrId
  )
}

export function countListings() {
  return sampleListings.length
}
