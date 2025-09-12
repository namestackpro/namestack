




const TopdomainViewer = () => {


    // Sample data for top-performing domains
    const topPerformers = [
    { id: 1, domain: 'techstartup.com', amount: 1250.99, date: '2024-01-15', gains: 12.5, status: 'Active', score: 95 },
    { id: 2, domain: 'kosiso.cv', amount: 5010, date: '2024-01-14', gains: -5.2, status: 'Expiring', score: 65 },
    { id: 3, domain: 'aiplatform.io', amount: 2500.80, date: '2024-01-12', gains: -2.1, status: 'Active', score: 88  },
    { id: 4, domain: 'myapp.com', amount: 1589.99, date: '2024-01-10', gains: 4.3, status: 'Expiring', score: 91 },
  ];


  return (
    <div className="my-8 w-full p-6 py-10 bg-inherit rounded-2xl shadow-xl border border-gray-200">
        <div className="h-fit px-4">
            <div className="flex justify-between items-center mb-4 border-b-[1px] border-gray-300 pb-4">
                <h1 className="text-base font-bold "> Your Top Domains</h1>
                <span className="text-sm text-gray-600 font-medium cursor-pointer hover:underline">
                    View all
                
                </span>    
            </div>


            <div className="grid grid-cols-1 gap-4 pt-2">
                {/* Example domain cards */}
                {topPerformers.map((top, index) => (
                    <div key={index} className="p-4 border border-gray-200 shadow-md rounded-lg hover:shadow-md flex flex-col gap-2.5 transition-all duration-700 hover:scale-[1.05] hover:border hover:border-red-200">
                        <div className="  flex items-center gap-2 justify-between mb-1.5 ">
                            <div className="flex items-center gap-4">
                                <div className={`h-11 w-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center `} >
                                    <span className={`font-bold text-lg `}>{top.domain.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                    <h2 className="text-md font-semibold ">{top.domain}</h2>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Expires: {top.date}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <p className="text-sm font-bold text-black"> ${Math.abs(top.amount).toFixed(2)}</p>
                                <div className={`text-sm font-medium ${ top.gains > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {top.gains > 0 ? '+':''}{top.gains}%
                                </div>

                            </div>

                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                            <div>
                                <p className="text-xs font-bold text-slate-700"> Score: <span className={`text-xs font-bold ${top.score > 70 ? 'text-green-600' : 'text-red-600'}`}> {top.score}%</span></p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-700"> Status: <span className={`text-xs font-bold ${top.status == 'Active' ? 'text-green-500':'text-orange-600'}`}> {top.status}</span></p>
                                

                            </div>
                        </div>
                    </div>
                ))}
            
            </div>
        </div>
    </div>
  )
}
export default TopdomainViewer