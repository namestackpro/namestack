import { DollarSign, BarChart2, Clock, Star } from "lucide-react"

export const statData = {
    stats: [
        
        { value: '$1,258,470', label: 'Portfolio Value', color: 'text-green-500', description: 'this month', gains: 5.5, icon: DollarSign },
        { value: '2,547', label: 'Total Domains', color: 'text-muted-foreground', description: 'Registered across 15 TLDs', icon: BarChart2 },
        { value: '56', label: 'Expiring Soon', color: 'text-muted-foreground', description: 'In the next 30 days', icon: Clock},
        { value: '89%', label: 'AI Score', color: 'text-muted-foreground', description: 'Average quality score', icon: Star  },
    ]
};

export const aiStat ={
    stats: [
      { value: 87, label: 'Portfolio Value', color: 'text-green-500', gains: 5},
      { value: 92, label: 'ROI Potential', color: 'text-muted-foreground', gains: 3 },
      { value: 78, label: 'Market Alignment', color: 'text-muted-foreground', gains: -2},
      { value: 94, label: 'Risk Assessment', color: 'text-muted-foreground', gains: 1 },
    ]
};

export const Transactions = {
    
    recent: [
        { id: 1, description: 'Domain Renewal - techstartup.com', amount: -12.99, date: '2024-01-15', type: 'renewal' },
        { id: 2, description: 'Wallet Top-up', amount: 500.00, date: '2024-01-14', type: 'deposit' },
        { id: 3, description: 'Domain Purchase - aiplatform.io', amount: -2500.00, date: '2024-01-12', type: 'purchase' },
        { id: 4, description: 'Domain Renewal - myapp.com', amount: -15.99, date: '2024-01-10', type: 'renewal' },
    ]
};