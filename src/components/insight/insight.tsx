import { TrendingUp, DollarSign, AlertCircle } from "lucide-react";



const Insight = () => {

    const insight = [
    { id: 1, domain: 'creativespace.com', est_value: '25,090', action: 'Acquire', insight_description: 'This domain matches trending search patterns in design industry.', icon: <TrendingUp className="h-5 w-5"/>, },
    { id: 2, domain: 'minimalstudio.cv', est_value: '3,100', action: 'List for sale', insight_description: 'Market demand has increased 28% for this keyword set.', icon: <DollarSign className="h-5 w-5"/>, },
    { id: 3, domain: 'modernstudio.io', est_value: '7,800', action: 'Review', insight_description: 'Potential trademark conflict detected.', icon: <AlertCircle className="h-5 w-5"/>, },
  ];


  return (

    <div className="my-8 w-full p-6 bg-inherit rounded-2xl shadow-xl border border-gray-200">
        <div className="h-fit px-4 w-fit">
            <div className="flex justify-between items-center mb-4 border-b-[1px] border-gray-300 pb-4">
                <h1 className="text-base font-bold "> Insight</h1>
                  
            </div>

            <div className="gap-4 my-6 flex flex-col px-4 py-3 bg-slate-900 rounded-2xl transition-all duration-700 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
                <div className="text-white text-lg font-bold">Porfolio Health</div>
                <div className="flex flex-col text-white gap-2">
                    <span className="text-white text-3xl font-bold ">87 <span className="text-lg">/100</span></span>
                    <div className="w-full bg-gray-600 rounded-full h-2 dark:bg-gray-100">
                        <div className="bg-gray-100 h-2 rounded-full" style={{width: '87%'}}></div>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-100">Your portfolio is performing well with strong growth potential, based on domain quality, market trends, and portfolio diversity.</p>
                </div>
            </div>


            <div className="grid grid-cols-1 gap-4 my-4 pt-2">
                {/* Example domain cards */}
                {insight.map((top, index) => (
                    <div key={index} className="p-4 border border-gray-200 shadow-md rounded-lg hover:shadow-md flex flex-col gap-2.5 transition-all duration-700 hover:border hover:border-blue-300 hover:bg-primary/10">
                        <div className="  flex items-center gap-2 justify-between mb-1.5 ">
                            <div className="flex items-center gap-2">
                                <div className={`h-5 w-5 text-primary rounded-xl flex items-center justify-center `} >
                                    <div className="h-5 w-5">{top.icon}</div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold ">{top.domain}</h2>
                                    <div>
                                        <p className="text-sm text-muted-foreground ">{top.insight_description}</p>
                                    </div>
                                </div>
                            </div>

                            

                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                            <div>
                                <p className="text-sm font-bold text-slate-700 px-3 py-1 bg-primary/10 rounded-xl "> {top.action}</p>
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


  )
}
export default Insight