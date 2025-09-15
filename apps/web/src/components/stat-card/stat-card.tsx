
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, DollarSign, Star, GitGraph, BarChart, TrendingDown, TrendingUp, BarChart2,  } from 'lucide-react';
import { statData } from '@/Utils/userDatabase';
import { usePathname } from 'next/navigation';



export function StatsCards() {

  const location = usePathname()




  const stats = (statData.stats)
 


  return (
    
    
    <div className="grid max-lg:grid-cols-1 lg:grid-cols-4 gap-6 mb-2 ">

      {stats.map((stat, index) => (
        <Card key={index} className="bg-inherit rounded-2xl shadow-lg  transition-all duration-700 hover:scale-105 hover:shadow-xl hover:bg-card/80 border border-gray-200 flex flex-row items-center justify-center max-lg:justify-start max-lg:gap-10 max-lg:px-8 gap-2 px-4 lg:py-4 dark:bg-gray-500 dark:border-gray-700 ">
          <div className="p-[3px] bg-primary/10 text-primary rounded-xl m-1 flex items-center justify-center">
            {<stat.icon/>}

          </div>
          <CardContent className="p-2 h-full flex flex-col justify-center items-start gap-1.5 w-fit">
            <div className="text-sm font-bold text-muted-foreground">{stat.label}</div> 
            <div className={`text-lg font-bold text-black dark:text-white`}>{stat.value}</div>
            <div>
              {stat.gains !== undefined ? (
                <div className="flex items-center text-xs font-medium flex-row gap-[2px] w-fit">
                  {stat.gains > 0 ? (
                    <TrendingUp className={`h-4 w-4 text-green-500`} />
                  ) : (
                    <TrendingDown className={`h-4 w-4 text-red-500`} />
                  )}
                  <p className={stat.color}>{stat.gains > 0 ? '+':''}{stat.gains}%</p>
                  <span className={stat.color}> {stat.description}</span>

                </div>)
                : (
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <span className="text-muted-foreground">{stat.description}</span>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

  
  );
}
