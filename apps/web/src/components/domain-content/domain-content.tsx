'use client'

import React, { useEffect, useState } from 'react'
import {
  Search,
  Filter,
  ArrowUpRight,
  Globe,
  Star,
  Clock,
  Tag,
} from 'lucide-react'
import { useRouter } from 'next/navigation'



const Domaincontent = () => {

    const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState("")

  

  const navigate = useRouter()
  const domains = [
    {
      id: 1,
      name: 'designcraft.com',
      value: 8250,
      change: 12.5,
      expires: '2025-05-12',
      traffic: 1250,
      premium: true,
      category: 'Design',
    },
    {
      id: 2,
      name: 'modernspace.io',
      value: 6800,
      change: -8.2,
      expires: '2024-11-30',
      traffic: 580,
      premium: false,
      category: 'Architecture',
    },
    {
      id: 3,
      name: 'simplestudio.co',
      value: 10500,
      change: 2.1,
      expires: '2024-09-15',
      traffic:3100,
      premium: true,
      category: 'Design',
    },
    {
      id: 4,
      name: 'minimaldesign.com',
      value: 7200,
      change: 15.7,
      expires: '2025-02-28',
      traffic: 1580,
      premium: false,
      category: 'Design',
    },
    {
      id: 5,
      name: 'cleantechnology.com',
      value: 12500,
      change: 5.3,
      expires: '2025-08-17',
      traffic: 3200,
      premium: true,
      category: 'Technology',
    },
    {
      id: 6,
      name: 'futureinteriors.co',
      value: 5400,
      change: -1.8,
      expires: '2024-12-05',
      traffic: 850,
      premium: false,
      category: 'Interior',
    },
    {
      id: 7,
      name: 'digitalproduct.io',
      value: 8900,
      change: 9.4,
      expires: '2025-03-22',
      traffic: 1750,
      premium: true,
      category: 'Technology',
    },
    {
      id: 8,
      name: 'smartliving.com',
      value: 14200,
      change: 7.6,
      expires: '2026-01-10',
      traffic: 2850,
      premium: true,
      category: 'Lifestyle',
    },
  ]
  const filters = [
    {
      id: 'all',
      label: 'All Domains',
    },
    {
      id: 'premium',
      label: 'Premium',
    },
    {
      id: 'expiring',
      label: 'Expiring Soon',
    },
    {
      id: 'trending',
      label: 'Trending Up',
    },
  ]

 const filteredDomains = domains.filter((domain) => {
  const q = searchTerm.trim().toLowerCase();
  const matchesSearch =
    q.length === 0 ||
    domain.name.toLowerCase().includes(q);

  // ----- filter match -----
  let matchesFilter = true;
  if (activeFilter === "premium") {
    matchesFilter = domain.premium;
  } else if (activeFilter === "expiring") {
    const expiryDate = new Date(domain.expires);
    const now = new Date();
    const diffDays = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    matchesFilter = diffDays < 90;
  } else if (activeFilter === "trending") {
    matchesFilter = domain.change > 7;
  } 

  return matchesSearch && matchesFilter;
});

  const handleAddDomain = (path: string)=>{
    if (path == 'add-domain'){
        navigate.push('/domain-upload')
    }
  }



  return (
    <div className=" w-full px-2 py-10 bg-background ">
                        <div className="mb-12 pl-4">
                            <h1 className="text-2xl font-bold text-gray-900  tracking-tight">
                            Domains
                            </h1>
                            <p className="mt-2 text-lg text-gray-500">
                            Manage and monitor your domain portfolio.
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id='searchBar'
                                    name='searchBar'
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    placeholder="Search domains..."
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                            <button  className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
                                <Filter size={16} className="mr-2" />
                                Filters
                            </button>
                            <button onClick={()=>handleAddDomain('add-domain')} className="px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center">
                                Add Domain
                            </button>
                            </div>
                        </div>
                        <div className={`flex overflow-x-auto pb-2 mb-6 space-x-2 `}>
                            {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${activeFilter === filter.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {filter.label}
                            </button>
                            ))}
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="font-medium text-gray-900">Your Domains</h2>
                            <span className="text-sm text-gray-500">
                                {filteredDomains.length} domains
                            </span>
                            </div>
                            <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Domain
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Value
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expires
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Traffic
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {filteredDomains.map((domain) => (
                                    <tr key={domain.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-900 font-medium mr-3">
                                                {domain.name.substring(0, 1).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 flex items-center">
                                                {domain.name}
                                                {domain.premium && (
                                                    <Star
                                                    size={14}
                                                    className="ml-1.5 text-amber-400 fill-amber-400"
                                                    />
                                                )}
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                            {domain.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                            ${domain.value.toLocaleString()}
                                            </div>
                                            <div
                                            className={`text-xs ${domain.change >= 0 ? 'text-green-600' : 'text-red-500'}`}
                                            >
                                            {domain.change >= 0 ? '+' : ''}
                                            {domain.change}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(domain.expires).toISOString().split("T")[0]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                            <div className="w-24 bg-gray-100 rounded-full h-1 mr-2">
                                                <div
                                                className="bg-gray-400 h-1 rounded-full"
                                                style={{
                                                    width: `${Math.min(100, (domain.traffic / 5000) * 100)}%`,
                                                }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {domain.traffic.toLocaleString()}
                                            </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button className="text-gray-500 hover:text-gray-900">
                                            <ArrowUpRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="font-medium text-gray-900">Domain Categories</h2>
                            </div>
                            <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center mb-3">
                                    <div className="p-2 rounded-lg bg-gray-100 text-gray-500 mr-3">
                                    <Globe size={18} />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Design</h3>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">3 domains</span>
                                    <span className="text-sm font-medium text-gray-900">
                                    $24,950
                                    </span>
                                </div>
                                </div>
                                <div className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center mb-3">
                                    <div className="p-2 rounded-lg bg-gray-100 text-gray-500 mr-3">
                                    <Globe size={18} />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Technology</h3>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">2 domains</span>
                                    <span className="text-sm font-medium text-gray-900">
                                    $21,400
                                    </span>
                                </div>
                                </div>
                                <div className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center mb-3">
                                    <div className="p-2 rounded-lg bg-gray-100 text-gray-500 mr-3">
                                    <Globe size={18} />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Architecture</h3>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">1 domain</span>
                                    <span className="text-sm font-medium text-gray-900">
                                    $6,800
                                    </span>
                                </div>
                                </div>
                                <div className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center mb-3">
                                    <div className="p-2 rounded-lg bg-gray-100 text-gray-500 mr-3">
                                    <Globe size={18} />
                                    </div>
                                    <h3 className="font-medium text-gray-900">Lifestyle</h3>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">2 domains</span>
                                    <span className="text-sm font-medium text-gray-900">
                                    $19,600
                                    </span>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
  )
}



export default Domaincontent