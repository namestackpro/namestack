'use client'

import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import {
  ArrowRight,
  Gauge,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Sparkles
} from 'lucide-react'

const PRIMARY_BTN =
  'inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-white/90 active:scale-[0.98]'
const GHOST_BTN =
  'inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/70 transition duration-300 hover:border-white/30 hover:text-white'

function LogoMark() {
  return (
    <span className="relative flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
      <span
        aria-hidden
        className="absolute right-[2.5px] top-[2px] h-[7px] w-[7px] rotate-45 rounded-[2px] bg-white/25"
      />
      <span className="block h-[11px] w-[11px] rotate-45 rounded-[3px] iris-mesh" />
    </span>
  )
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Namestack
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-[13.5px] font-medium text-white/50 md:flex">
          <Link href="#product" className="transition-colors hover:text-white">
            Product
          </Link>
          <Link
            href="/marketplace"
            className="transition-colors hover:text-white"
          >
            Marketplace
          </Link>
          <Link href="#escrow" className="transition-colors hover:text-white">
            Escrow
          </Link>
          <Link href="#insights" className="transition-colors hover:text-white">
            Insights
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <SignedIn>
            <Link href="/dashboard" className={PRIMARY_BTN}>
              Open dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button type="button" className={PRIMARY_BTN}>
                Get started
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  )
}

function HeroSparkline() {
  return (
    <svg
      viewBox="0 0 680 90"
      className="mt-8 h-[90px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Portfolio value trending upward over the last 90 days"
    >
      <defs>
        <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6e6bf6" />
          <stop offset="50%" stopColor="#4fd1e8" />
          <stop offset="100%" stopColor="#a56bf6" />
        </linearGradient>
        <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6e6bf6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6e6bf6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,70 L80,60 L160,65 L240,42 L320,50 L400,25 L480,32 L560,12 L640,20 L680,8 L680,90 L0,90 Z"
        fill="url(#hero-fill)"
      />
      <path
        d="M0,70 L80,60 L160,65 L240,42 L320,50 L400,25 L480,32 L560,12 L640,20 L680,8"
        fill="none"
        stroke="url(#hero-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="680" cy="8" r="3.5" fill="#4fd1e8" />
    </svg>
  )
}

function HeroMockup() {
  const cells = [
    { value: '142', label: 'Domains', tone: 'text-white' },
    { value: '18', label: 'Renewal risk', tone: 'text-[#eab766]' },
    { value: '4', label: 'Escrow active', tone: 'text-[#34d399]' },
    { value: '87', label: 'Health score', tone: 'text-white' }
  ]

  return (
    <div className="relative mx-auto mt-24 max-w-4xl px-6">
      <div className="rounded-[28px] border border-white/[0.08] bg-[#0a0a0c] p-8 text-left shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)] md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
              Portfolio value
            </p>
            <p className="mt-2 font-mono text-4xl font-medium tracking-tight text-white md:text-[42px]">
              $248,420
            </p>
          </div>
          <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 font-mono text-xs font-medium text-emerald-400">
            +18.4% · 90 days
          </span>
        </div>

        <HeroSparkline />

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.07] sm:grid-cols-4">
          {cells.map((cell) => (
            <div key={cell.label} className="bg-[#0a0a0c] p-5">
              <p className={`font-mono text-lg font-medium ${cell.tone}`}>
                {cell.value}
              </p>
              <p className="mt-1.5 text-xs text-white/40">{cell.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -left-8 top-12 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d0f]/90 p-4 shadow-2xl backdrop-blur-xl lg:flex">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">Escrow settled</p>
          <p className="mt-0.5 font-mono text-[11px] text-white/40">
            Soroban · ledger-verified
          </p>
        </div>
      </div>

      <div className="absolute -right-8 bottom-24 hidden rounded-2xl border border-white/10 bg-[#0d0d0f]/90 p-4 shadow-2xl backdrop-blur-xl lg:block">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
            <Sparkles className="h-4 w-4 text-[#a56bf6]" />
          </span>
          <div>
            <p className="font-mono text-xs font-medium text-white">
              craftlabs.ai
            </p>
            <p className="mt-0.5 text-[11px] text-white/40">
              AI signal · <span className="text-emerald-400">+31% demand</span>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -left-6 bottom-10 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d0f]/90 p-4 shadow-2xl backdrop-blur-xl lg:flex">
        <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
          <circle
            cx="17"
            cy="17"
            r="13"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="3"
          />
          <circle
            cx="17"
            cy="17"
            r="13"
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            strokeDasharray="81.7"
            strokeDashoffset="10.6"
            strokeLinecap="round"
            transform="rotate(-90 17 17)"
          />
        </svg>
        <div>
          <p className="font-mono text-sm font-medium text-white">87/100</p>
          <p className="mt-0.5 text-[11px] text-white/40">Portfolio health</p>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-28 pt-36 text-center">
      <div
        aria-hidden
        className="iris-mesh pointer-events-none absolute left-1/2 top-[-360px] h-[720px] w-[720px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-6">
        <p className="animate-rise font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
          Domain portfolio intelligence
        </p>
        <h1 className="animate-rise-delay-1 mt-7 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.035em] text-white md:text-6xl lg:text-[68px]">
          Turn your domain portfolio into an intelligent asset desk.
        </h1>
        <p className="animate-rise-delay-2 mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/50">
          Namestack tracks renewals, domain health, valuation movement, and AI
          opportunity signals — and settles every sale through on-chain escrow
          on Stellar.
        </p>
        <div className="animate-rise-delay-3 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <SignedOut>
            <SignInButton mode="modal">
              <button type="button" className={PRIMARY_BTN}>
                Get started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className={PRIMARY_BTN}>
              Open dashboard
            </Link>
          </SignedIn>
          <Link href="/marketplace" className={GHOST_BTN}>
            Explore marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <HeroMockup />
    </section>
  )
}

function MetricsStrip() {
  const metrics = [
    { value: '$248K', label: 'tracked portfolio value' },
    { value: '142', label: 'domains monitored' },
    { value: '18', label: 'renewal risks found' },
    { value: '4', label: 'escrow deals active' }
  ]

  return (
    <section
      aria-label="Platform metrics"
      className="border-y border-white/[0.06]"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/[0.06]">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-6 py-12 text-center lg:py-14">
            <p className="font-mono text-3xl font-medium tracking-tight text-white">
              {metric.value}
            </p>
            <p className="mt-2 text-[13px] text-white/40">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionHead({
  eyebrow,
  title,
  sub
}: {
  eyebrow: string
  title: string
  sub?: string
}) {
  return (
    <div className="mx-auto mb-16 max-w-xl text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.03em] text-white md:text-[42px]">
        {title}
      </h2>
      {sub && (
        <p className="mx-auto mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-white/50">
          {sub}
        </p>
      )}
    </div>
  )
}

function Features() {
  const features = [
    {
      icon: Gauge,
      title: 'Portfolio intelligence',
      copy: 'Real-time valuation across your entire stack, benchmarked against comparable sales — so every holding carries a defensible number.'
    },
    {
      icon: Sparkles,
      title: 'AI opportunity signals',
      copy: 'Undervalued domains and pricing windows surfaced before the market moves, ranked by conviction and ready to act on.'
    },
    {
      icon: ShieldAlert,
      title: 'Renewal & risk monitoring',
      copy: 'Exposure scoring flags risk weeks ahead. You never lose a domain to a missed date or a quiet decline.'
    },
    {
      icon: Lock,
      title: 'On-chain escrow marketplace',
      copy: 'Stellar/Soroban-backed settlement. Funds and domains only move after both sides verify — no trust required.'
    }
  ]

  return (
    <section id="product" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="Capabilities"
          title="Built for the domain asset desk."
          sub="Valuation, risk, signals, and settlement — designed as one system, not four tabs."
        />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="bg-black p-10 md:p-12">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03]">
                <feature.icon className="h-[18px] w-[18px] text-white/70" />
              </span>
              <h3 className="mt-7 text-lg font-semibold tracking-tight text-white">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-white/45">
                {feature.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Workflow() {
  const steps = [
    { num: '01', title: 'Connect', copy: 'Bulk upload or registrar sync.' },
    { num: '02', title: 'Monitor', copy: 'Health and renewal exposure, live.' },
    {
      num: '03',
      title: 'Discover',
      copy: 'AI-ranked pricing and demand signals.'
    },
    { num: '04', title: 'Sell', copy: 'Escrow-settled, on-chain.' }
  ]

  return (
    <section id="insights" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="Workflow"
          title="Upload to sale, one line."
          sub="From registrar export to escrow settlement without leaving the desk."
        />
        <div className="flex flex-col gap-10 md:flex-row md:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className={`relative flex-1 md:px-8 md:first:pl-0 ${
                index > 0 ?
                  'md:before:absolute md:before:left-0 md:before:top-[7px] md:before:h-px md:before:w-8 md:before:bg-white/10'
                : ''
              }`}
            >
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/30">
                {step.num}
              </p>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Escrow() {
  const flow = ['Funds locked', 'Transfer verified', 'Funds released']

  return (
    <section id="escrow" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#050506] px-6 py-20 text-center md:px-16">
          <div
            aria-hidden
            className="iris-mesh pointer-events-none absolute left-1/2 top-[-420px] h-[700px] w-[700px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
              Stellar / Soroban escrow
            </p>
            <h2 className="mx-auto mt-5 max-w-xl text-balance text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
              Trust, built into every sale.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-white/50">
              Buyers and sellers never move first. Funds lock in escrow, the
              transfer verifies on-chain, and settlement releases automatically
              — both sides protected until the domain actually moves.
            </p>

            <div className="mx-auto mt-14 flex max-w-xl items-start">
              {flow.map((step, index) => (
                <div key={step} className="contents">
                  {index > 0 && (
                    <span
                      aria-hidden
                      className="mt-[7px] hidden h-px flex-1 bg-white/10 sm:block"
                    />
                  )}
                  <div className="flex-1 px-2">
                    <span className="mx-auto block h-4 w-4 rounded-full bg-gradient-to-br from-[#6e6bf6] to-[#4fd1e8] shadow-[0_0_18px_rgba(110,107,246,0.5)]" />
                    <p className="mt-4 text-[12.5px] font-medium text-white/60">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col items-center gap-5">
              <Link href="/marketplace" className={PRIMARY_BTN}>
                Browse marketplace
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="font-mono text-[11px] tracking-[0.08em] text-white/30">
                Settlement on Soroban · ledger-verified · both parties protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="py-32 text-center">
      <div className="mx-auto max-w-xl px-6">
        <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
          Start your desk.
        </h2>
        <p className="mt-5 text-[15px] text-white/50">
          Value, risk, and opportunity — tracked in one place. Escrow when
          you&apos;re ready to sell.
        </p>
        <div className="mt-9 flex justify-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button type="button" className={PRIMARY_BTN}>
                Get started
                <ArrowRight className="h-4 w-4" />
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className={PRIMARY_BTN}>
              Open dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </SignedIn>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-sm font-semibold tracking-tight text-white">
            Namestack
          </span>
        </div>
        <nav
          aria-label="Footer"
          className="flex items-center gap-7 text-[13px] text-white/40"
        >
          <Link href="#product" className="transition-colors hover:text-white">
            Product
          </Link>
          <Link
            href="/marketplace"
            className="transition-colors hover:text-white"
          >
            Marketplace
          </Link>
          <Link href="#escrow" className="transition-colors hover:text-white">
            Escrow
          </Link>
        </nav>
        <p className="text-[12px] text-white/30">
          © 2026 Namestack · Built on Stellar
        </p>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans text-[#f5f5f7] antialiased selection:bg-white/20">
      <SiteHeader />
      <main>
        <Hero />
        <MetricsStrip />
        <Features />
        <Workflow />
        <Escrow />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
