const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

const supporting = [
  { value: '2.3x', label: 'Avg sale multiple' },
  { value: '$4,180', label: 'Renewal cost' },
  { value: '+12', label: 'Watchlist growth' }
]

const PerformanceGraph = () => {
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-card p-6 shadow-sm dark:border-white/[0.08]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">
            Portfolio value trend
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Aggregate valuation, last 6 months
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-medium text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
          +18.4% over 90 days
        </span>
      </div>

      <div className="mt-6">
        <svg
          viewBox="0 0 600 200"
          className="h-44 w-full sm:h-52"
          preserveAspectRatio="none"
          role="img"
          aria-label="Portfolio value trend chart rising from May to October"
        >
          <defs>
            <linearGradient id="trend-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6e6bf6" />
              <stop offset="50%" stopColor="#4fd1e8" />
              <stop offset="100%" stopColor="#a56bf6" />
            </linearGradient>
            <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6e6bf6" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#6e6bf6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[40, 80, 120, 160].map((y) => (
            <line
              key={y}
              x1="0"
              x2="600"
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.06"
              strokeDasharray="3 5"
            />
          ))}

          <path
            d="M0,158 C40,150 60,152 100,128 C140,104 160,118 200,96 C240,74 260,84 300,58 C340,32 360,46 400,30 C440,14 460,24 500,18 C540,12 570,16 600,10 L600,200 L0,200 Z"
            fill="url(#trend-fill)"
          />
          <path
            d="M0,158 C40,150 60,152 100,128 C140,104 160,118 200,96 C240,74 260,84 300,58 C340,32 360,46 400,30 C440,14 460,24 500,18 C540,12 570,16 600,10"
            fill="none"
            stroke="url(#trend-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="600" cy="10" r="4" fill="#4fd1e8" />
          <circle cx="600" cy="10" r="8" fill="#4fd1e8" opacity="0.2" />
        </svg>

        <div className="mt-2 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-black/[0.05] pt-5 dark:border-white/[0.06]">
        {supporting.map((metric) => (
          <div key={metric.label}>
            <p className="font-mono text-[15px] font-medium tabular-nums">
              {metric.value}
            </p>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerformanceGraph
