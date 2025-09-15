
import React from 'react';
import { Globe, UserCircle, ChartNoAxesCombined, Bot } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';

const DashboardHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const portfolioItems = [
    { title: user?.firstName || 'User', icon: UserCircle, path: '/dashboard', color: 'text-gray-500' },
    { title: 'Domain Vault', icon: Globe, path: '/dashboard/domainvault', color: 'text-green-500' },
    { title: 'Report & Analytics', icon: ChartNoAxesCombined, path: '/dashboard/report', color: 'text-blue-500' },
    { title: 'AI Domain Tracker', icon: Bot, path: '/dashboard/renewals', color: 'text-purple-500' },

  ];

  const currentItem = portfolioItems.find(item => item.path === pathname);
  const Title = currentItem?.title || 'User Dashboard';
  const Icon = currentItem?.icon || UserCircle;
  const Color = currentItem?.color || 'text-gray-500';

  const isMainDashboard = pathname === '/dashboard';
  const userFirstName = user?.firstName || 'User';

  return (
    <div className="w-auto h-full">
        <div className="flex items-center justify-end px-2 max-md:px-5 py-[0.88rem] w-full">
        
        

            <div className={`flex items-center justify-center gap-3 pr-8 max-md:pr-4 ${isMainDashboard ? 'ml-auto' : ''}`}>
                {!isMainDashboard && <Icon className={`h-6 w-7 ${Color}`} />}
                <span className="text-foreground font-semibold text-base max-md:text-sm">
                    {isMainDashboard ? `Welcome, ${userFirstName}` : Title}
                </span>
                

                {/* Clerk User Menu */}
                {isMainDashboard && <div className="ml-auto flex items-center gap-2">
                <UserButton afterSignOutUrl="/" />
                </div>}
            </div>
        </div>
    </div>
  );
};

export default DashboardHeader;
