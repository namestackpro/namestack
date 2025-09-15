"use client"

import { Bot, Globe, File, Search, Settings, ChartNoAxesCombined, Moon, Sun, HomeIcon, User2, ChevronUp, PieChart  } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Switch } from "../ui/switch"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Logo from "../logo/logo"
import { UserButton, useUser } from "@clerk/nextjs"


// Menu items.
const items = [
      
  { title: "Dashboard", url: "/dashboard", icon: PieChart, },
  { title: "Domain Vault", url: "/dashboard/domainvault", icon: Globe, },
  { title: "Report & Analytics", url: "/dashboard/report", icon: ChartNoAxesCombined, },
  { title: "AI Tracking", url: "#", icon: Bot,},

]

export function AppSidebar() {
    
    const user = useUser()
    const router = useRouter();
    const pathname = usePathname()
    const [isDarkMode, setIsDarkMode] = useState(false);


    const handleItemClick =(url:string) => {
        router.push(url)
    }


    useEffect(() => {
        if (isDarkMode) {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
        } else {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const userFirstName = user.user?.firstName || 'Champ!';


  return (
    <Sidebar 
        side="left"

    >
       <SidebarHeader>
            <div className="border-b-1 py-3 flex flex-col justify-center items-start ">
                <Logo/>
            </div>
       </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel className=" uppercase text-sm font-bold mt-6 mb-4 px-4 text-primary"> 
                Main
            </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-3 px-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton
                      onClick={() => handleItemClick(item.url)}
                      className={`w-[90%] justify-start px-6 py-5 rounded-md text-sm font-normal ${
                        pathname === item.url
                          ? 'bg-gray-100 text-gray-900 border-blue-300 border font-bold'
                          : 'text-sm font-semibold text-muted-foreground hover:text-gray-700 hover:border-blue-400 hover:border transition-all duration-500 '
                      }`}
                    >
                      <item.icon className={`
                            ${pathname === item.url ? 'text-blue-400':''}
                        `} />
                      {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup className="mt-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem className="flex flex-col gap-3 pb-2">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="flex  gap-4 font-semibold text-base">
                    <UserButton /> <div className="flex flex-row gap-1"><h4 className="text-[#D183C9]">Hi</h4> {userFirstName}</div>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem className="flex flex-col justify-start items-start pr-20 pl-5 py-4 gap-5">
                    <SidebarMenuButton
                        onClick={() => handleItemClick('/dashboard/profile')}   
                        className={`w-full justify-start gap-4 px-3 py-5 rounded-md text-sm hover:bg-gray-50 hover:backdrop-blur-2xl hover:shadow-lg`}
                        
                        >
                        <User2/>
                        <span className='font-semibold'>Account</span>
                      </SidebarMenuButton>

                      <SidebarMenuButton 
                        onClick={() => handleItemClick('/')}
                        className={`w-full justify-start gap-[20px] px-3 py-5 rounded-md text-sm hover:bg-gray-50 hover:backdrop-blur-2xl hover:shadow-lg`}
                        >
                        <div className="ml-[1.5px]">
                            <HomeIcon size={23} />                    
                        </div>
                        <span className='font-semibold'>Home</span>
                      </SidebarMenuButton>
                        
                      <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-4 rounded-full px-3 py-2 hover:bg-gray-50 hover:backdrop-blur-2xl hover:shadow-lg">
                            <Moon size={18} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                            <Switch 
                            checked={!isDarkMode} 
                            onCheckedChange={toggleTheme} 
                            className="data-[state=checked]:bg-primary"
                            />
                            <Sun size={18} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                      </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar