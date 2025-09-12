import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"


export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  
  return (
    <SidebarProvider>
        <div>
            <button onClick={toggleSidebar} className="border-2 border-green-400 h-15 w-15 flex justify-center items-center">
                <Menu height={24} width={24} />
            </button>
        </div>
    </SidebarProvider>
  )
}


export default CustomTrigger