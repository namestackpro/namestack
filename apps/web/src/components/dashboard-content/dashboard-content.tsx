import React from 'react'
import { StatsCards } from '../stat-card/stat-card'
import TopdomainViewer from '../topdomainviewer/topdomainviewer'
import PerformanceGraph from '../performancegraph/performancegraph'
import Insight from '../insight/insight'

export function DashboardContent() {
  return (
    <div className="flex h-fit w-full flex-col pb-12 pt-2">
      <div className="px-4 md:px-8">
        <StatsCards />

        <div className="mt-7 grid max-lg:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <PerformanceGraph />
            <TopdomainViewer />
          </div>

          <div className="flex h-full flex-col gap-6 lg:col-span-1">
            <Insight />
          </div>
        </div>
      </div>
    </div>
  )
}
