
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {  TrendingDown, TrendingUp, BarChart2,  } from 'lucide-react';
import {  aiStat } from '@/Utils/userDatabase';



const  ReportStatcard = () => {



    const stats = (aiStat.stats)


  
  return (

     <div className='w-[100%] h-fit bg-background'>
        <div className='flex flex-col px-4 py-10 bg-background overflow-auto '>
            <h1 className='text-2xl font-bold text-foreground'>AI Insights</h1>
            <p className='text-sm font-medium text-foreground'>Intelligent analysis and recommendations for your domain portfolio.</p>
        </div>

                    {/* Stat Card */}
                    <div className='flex flex-col py-6 px-4 mx-2 w-full h-fit overflow-auto '>
                        <div className="grid max-lg:grid-cols-1 lg:grid-cols-4 gap-4 mb-6 ">

                            {stats.map((stat, index) => (
                                <Card key={index} className="bg-inherit rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-card/80 border border-gray-200 flex flex-row h-fit ">
                                
                                    <CardContent className=" flex flex-col gap-2.5 w-full h-fit  mt-3 ">
                                        <div className="text-sm font-bold text-muted-foreground  w-fit">{stat.label}</div> 
                                        <div className={`text-3xl font-bold text-black w-fit flex flex-row items-end`}>
                                            {stat.value} <span className="text-lg">/ 100</span>
                                            <div className='flex flex-row gap-1  items-end'>
                                                {stat.gains > 0 ? (
                                                    <TrendingUp className={`h-5 w-5 text-green-500 inline-block ml-2`} />
                                                ) : ( 
                                                    <TrendingDown className={`h-5 w-5 text-red-500 inline-block ml-2`} />
                                                )}
                                                <span className='text-sm '>{stat.gains}</span>
                                            </div>
                                        </div>
                                        
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
    </div>

  
  );
}

export default ReportStatcard
