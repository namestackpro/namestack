import Link from 'next/link'

const Logo = () => {
  return (
    <Link
      href="/dashboard"
      aria-label="Namestack dashboard"
      className="flex flex-row items-center justify-center gap-2.5 p-3"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[11px] border border-black/[0.06] bg-card shadow-sm dark:border-white/[0.08] dark:bg-white/[0.05]">
        <span
          aria-hidden
          className="absolute right-[6px] top-[5px] h-[9px] w-[9px] rotate-45 rounded-[3px] bg-white/40 dark:bg-white/20"
        />
        <span className="block h-[13px] w-[13px] rotate-45 rounded-[4px] iris-mesh" />
      </span>
      <span className="flex flex-row items-end justify-center text-[19px] font-semibold tracking-tight text-foreground">
        Namestack
      </span>
    </Link>
  )
}
export default Logo
