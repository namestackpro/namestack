import { AlertCircle, ArrowUpRight, BarChart, DollarSign, HelpCircle, Lightbulb, TrendingUp } from "lucide-react";



const aiinsight = () => {

const insight = [
    { id: 1, domain: 'creativespace.com', est_value: '25,090', action: 'Acquire', insight_description: 'This domain matches trending search patterns in design industry with 73% higher engagement rates than similar domains.', icon: <TrendingUp className="h-5 w-5"/>, priority: 'high priority' },
    { id: 2, domain: 'minimalstudio.cv', est_value: '3,100', action: 'List for sale', insight_description: 'Market demand has increased 28% for this keyword set. Current valuation is at a 2-year high point, suggesting an optimal selling window.', icon: <DollarSign className="h-5 w-5"/>, priority: 'medium priority' },
    { id: 3, domain: 'modernstudio.io', est_value: '7,800', action: 'Review', insight_description: 'Potential trademark conflict detected with "ModernSpaces Inc." who recently filed for trademark protection in similar categories.', icon: <AlertCircle className="h-5 w-5"/>, priority: 'low priority' },
    { id: 4, domain: 'cupidlove.io', est_value: '4,800', action: 'Investigate', insight_description: 'Potential trademark conflict detected with "ModernSpaces Inc." who recently filed for trademark protection in similar categories.', icon: <AlertCircle className="h-5 w-5"/>, priority: 'medium priority' },
    { id: 5, domain: 'blairwoldorf.xyz', est_value: '10,800', action: 'Review Offer', insight_description: 'Potential trademark conflict detected with "ModernSpaces Inc." who recently filed for trademark protection in similar categories.', icon: <DollarSign className="h-5 w-5"/>, priority: 'high priority' },

  ];

  const tips= ['Diversify categorieas', 'Explore emerging TLDs', 'Leverage market trends'];

  const intelligence = [
    { id: 1, content: 'Industry Trend', insight_description: ' Design and minimalism-focused domains have seen a 24% increase in search volume over the last quarter.'},
    { id: 2, content: 'Emerging Keywords', insight_description: '"Sustainable," "minimal," and "studio" are showing strong growth potential in premium domain valuations.'},
    { id: 3, content: 'TLD Analysis', insight_description: 'While .com remains dominant, .io domains in the tech space have appreciated 18% faster this year.'},

  ];




  return (



    <div className="w-auto max-md:px-5 px-2">
      {/* latest insight */}
                    <div className='grid max-lg:grid-cols-1 lg:grid-cols-3 gap-3'>
                        <div className=" col-span-2 my-8 w-auto py-6 bg-inherit rounded-2xl shadow-xl border border-green-200">
                            <div className="h-fit px-4">
                                <div className="flex justify-between items-center mb-4 border-b-[1px] border-gray-300 pb-4">
                                    <h1 className="text-base font-bold "> Latest insight</h1>
                                    <span className="text-sm text-gray-600 font-medium cursor-pointer hover:underline">
                                        6 insights
                                    
                                    </span>    
                                </div>

                                <div className="grid grid-cols-1 gap-4 my-4 pt-2">
                                    {/* Example domain cards */}
                                    {insight.map((top, index) => (
                                        <div key={index} className="p-4  hover:shadow-md flex flex-col gap-2.5 transition-all duration-700 hover:bg-gray-600/10 rounded-md">
                                            <div className="  flex items-center gap-2 justify-between mb-1.5 ">
                                                <div className="flex items-center gap-4 w-full ">
                                                    <div className={`h-5 w-5 text-primary rounded-xl flex items-center justify-center `} >
                                                        <div className="h-5 w-5 ">{top.icon}</div>
                                                    </div>
                                                    <div className='w-full flex flex-col gap-1'>
                                                        <div className='flex flex-row justify-between items-center'>
                                                            <h2 className="text-lg font-semibold ">{top.domain}</h2>
                                                            {top.priority === 'high priority' ? <p className="text-sm font-bold text-slate-700 px-4 bg-red-300 rounded-lg py-[1px] w-fit"> {top.priority}</p> : top.priority === 'medium priority' ? <p className="text-sm font-bold text-slate-700 px-4 bg-yellow-200 rounded-lg py-[1px] w-fit"> {top.priority}</p> : <p className="text-sm font-bold text-slate-700 px-4 bg-green-200 rounded-lg py-[1px] w-fit"> {top.priority}</p>}
                                                            
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-muted-foreground ">{top.insight_description}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                

                                            </div>
                                            
                                            <div className="flex justify-between items-center mt-2">
                                                <div>
                                                    <p className="text-xs font-medium text-slate-700 px-3 bg-primary/10 rounded-xl py-[2px]"> {top.action}</p>
                                                </div>
                                                <div>
                                                    <p className='text-sm  text-muted-foreground'> Est.value: {top.est_value}</p>
                                                    

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className=" col-span-1 my-8 w-auto py-6 bg-inherit rounded-2xl shadow-xl border border-gray-200">
                                <div className="h-fit px-4">
                                    <div className="flex justify-between items-center mb-4 border-b-[1px] border-gray-300 pb-4">
                                        <h1 className="text-base font-bold "> AI Recommendations</h1>
                                          
                                    </div>

                                    <div className="gap-4 my-6 flex flex-col px-4 py-3 bg-slate-900 rounded-2xl transition-all duration-700 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
                                        <div className='flex flex-row gap-2'>
                                            <Lightbulb className='h-6 w-6 text-yellow-400'/>
                                            <div className="text-white text-lg font-black">Weekly Portfolio Insight</div>
                                        </div>
                                        <div className="flex flex-col text-white gap-2">
                                            <div className='flex flex-row items-center justify-between w-full px-2'>
                                                <span className="text-white text-3xl font-bold ">87 <span className="text-lg">/100</span></span>
                                                <span className='text-sm font-bold text-green-500 '>+11%</span>
                                            </div>
                                            <div className="w-full bg-gray-600 rounded-full h-2 dark:bg-gray-100">
                                                <div className="bg-gray-100 h-2 rounded-full" style={{width: '87%'}}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-100 my-1">Your portfolio is performing well with strong growth potential, based on domain quality, market trends, and portfolio diversity.</p>
                                        </div>
                                        <div className='text-white text-sm font-medium mt-4 cursor-pointer hover:text-gray-300 flex items-center gap-1 flex-row border border-white hover:border-gray-300 justify-center py-2 rounded-2xl'>
                                            <button className='flex items-center gap-1 flex-row'>View full Analysis <ArrowUpRight className='w-4 h-4'/></button>
                                        </div>
                                    </div>

                                    <div className="gap-2 my-6 mt-10 flex flex-col px-1 py-3 bg-gray-50 rounded-xl shadow-md hover:shadow-md ">
                                        <div>
                                            <div className='flex flex-row gap-2 justify-start items-center w-full border-b-[1px] border-gray-200 pb-4'>
                                                <HelpCircle className='h-5 w-5 text-orange-600'/>
                                                <div className="text-slate-700 text-lg font-black">Optimization Tips</div>
                                            </div>

                                        </div>
                                        <div className='gap-2 lg:gap-3 my-4 flex flex-col'>
                                            {/* list of tips */}
                                            {tips.map((tip, index) => (
                                                <button key={index} className='flex flex-row gap-2.5  items-center mt-1 justify-start w-full hover:bg-gray-600/10 px-2 py-1 rounded-md cursor-pointer'>
                                                    <div className='h-5 w-5 bg-gray-600/10 text-primary rounded-sm flex items-center justify-center mt-1'>
                                                        <BarChart className=' '/>
                                                    </div>
                                                    <div className='flex flex-row gap-2 justify-between w-full'>
                                                        <p className='text-xs lg:text-sm text-slate-700 font-medium'>{tip}</p>
                                                        <div className=' text-primary rounded-sm flex items-center justify-center mt-1'>
                                                            <ArrowUpRight className='w-4 h-4'/>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                            
                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Intelligence*/}
                    <div className=' mx-2 w-auto h-fit'>
                        <div className='my-8 w-auto mx-8 py-6 px-3 bg-inherit rounded-2xl shadow-xl border border-gray-200'>
                            <div className='flex flex-row justify-between items-center mb-4 border-b-[1px] border-gray-300 pb-4'>
                                <h2>Market Intelligence</h2>
                            </div>
                            <div className='grid max-lg:grid-cols-1 lg:grid-cols-3 gap-4 p-4'>
                                {intelligence.map((info) => (
                                    <div key={info.id} className='p-4 m-2 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 hover:scale-[1.01] flex flex-col gap-3 hover:bg-foreground/5'>
                                        <h3 className='text-md font-bold text-foreground mb-2'>{info.content}</h3>
                                        <p className='text-sm text-muted-foreground'>{info.insight_description}</p>
                                        <div className='flex flex-row justify-start items-center gap-1 mt-4 cursor-pointer hover:text-gray-800 text-primary font-medium hover:underline w-fit'>
                                            <button className='text-sm text-muted-foreground'>Learn more </button>
                                            <ArrowUpRight className='h-4 w-4 text-muted-foreground'/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                    </div>
      
    </div>
  )
}


export default aiinsight