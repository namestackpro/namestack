import { Loader } from "lucide-react"


const PerformanceGraph = () => {
  return (
        <div className="my-8 w-full p-6 bg-inherit rounded-2xl shadow-xl border border-gray-200">
            <div className="flex justify-start items-center mb-4 border-b-[1px] border-gray-300 pb-4">
                <h1 className="text-base font-bold "> Portfolio Performance </h1>
                   
            </div>
            
            <div className="flex justify-center items-center h-64 text-gray-500 flex-col gap-4">
                {/* Placeholder for the performance graph */}
                <p>Graph will be displayed here.</p>
                <div className=" animate-spin">
                    <Loader className="h-8 w-8 text-gray-400"/>
                </div>
            </div>


        </div>
  )
}
export default PerformanceGraph