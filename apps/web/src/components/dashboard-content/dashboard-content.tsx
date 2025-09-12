

import React from 'react';
import { Button } from '@/components/ui/button'
import { StatsCards } from '../stat-card/stat-card';
import { House, Settings } from 'lucide-react';
import TopdomainViewer from '../topdomainviewer/topdomainviewer';
import PerformanceGraph from '../performancegraph/performancegraph';
import Insight from '../insight/insight';



export function DashboardContent() {

    
    


  return (
    <div className="flex flex-col h-fit w-full">

      {/* Main Content */}
      <div className="flex flex-col py-3 px-2 bg-background overflow-auto ">
        <div >
            <StatsCards />
        </div>
    
        <div className='mt-16 grid max-lg:grid-cols-1 grid-cols-3 gap-5 '>
          <div className=" max-lg:col-span-1 lg:col-span-2 ">
            <div className=" ">
              <TopdomainViewer />
            </div>
            <div className=" ">
              <PerformanceGraph />
            </div>
          </div>

          <div className=' h-full col-span-1'>
            <Insight />
          </div>
        </div>
      </div>
    </div>
  );
}
