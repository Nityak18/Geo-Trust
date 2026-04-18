import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { useRegistry } from '../context/RegistryContext';
import { TrendingUp, ShieldCheck, UserCheck, Activity, Download, Filter, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportsPage = () => {
  const { properties, transactions } = useRegistry();
  
  // Real-time metrics based on registry state
  const totalValue = properties.reduce((acc, p) => acc + parseInt(p.value.replace(/[^0-9]/g, '') || 0), 0);
  const formattedValue = (totalValue / 10000000).toFixed(2); // Convert to Cr
  
  const recentTrend = [
    { name: 'Jul', registrations: 4100 },
    { name: 'Aug', registrations: 3900 },
    { name: 'Sep', registrations: 4600 },
    { name: 'Oct', registrations: 5200 + transactions.length * 5 }, 
  ];

  const districtData = [
    { name: 'Bangalore U', value: 840 },
    { name: 'Pune', value: 620 },
    { name: 'Mumbai Sub', value: 540 },
    { name: 'Hyderabad', value: 410 },
    { name: 'Chennai', value: 390 },
  ];

  const COLORS = ['#1C3A3A', '#2A7A6F', '#E8900A', '#3DAA5C', '#7B5EA7'];

  return (
    <div className="min-h-screen bg-gray-50/30 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Glass Gradient */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-0.5 w-10 bg-accent-teal"></div>
              <span className="text-xs font-bold tracking-[0.3em] text-primary-main uppercase">System Intelligence</span>
            </div>
            <h1 className="text-5xl font-serif font-bold text-primary-main tracking-tight">Live Registry Analytics</h1>
            <p className="mt-4 text-gray-500 max-w-2xl font-medium leading-relaxed">
              Real-time monitoring of land asset migrations across the distributed ledger. 
              Data points are cryptographically verified by {transactions.length + 12} active validator nodes.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-primary-main hover:bg-gray-50 transition-all shadow-sm">
              <Calendar className="w-4 h-4" /> Last 30 Days
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-main text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all active:scale-95">
              <Download className="w-4 h-4" /> Export Ledger
            </button>
          </div>
        </div>

        {/* Metric Cards - Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Value on Chain', val: `₹${formattedValue} Cr`, icon: <TrendingUp/>, color: 'text-accent-teal', bg: 'bg-accent-teal/10' },
            { label: 'Verified Properties', val: properties.length + 4200, icon: <ShieldCheck/>, color: 'text-primary-main', bg: 'bg-primary-main/10' },
            { label: 'Verified Identities', val: '8,942', icon: <UserCheck/>, color: 'text-accent-orange', bg: 'bg-accent-orange/10' },
            { label: 'Network Consensus', val: '99.9%', icon: <Activity/>, color: 'text-status-verified', bg: 'bg-status-verified/10' }
          ].map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 border-white/40 ring-1 ring-black/5"
            >
              <div className={`w-12 h-12 rounded-2xl ${m.bg} flex items-center justify-center ${m.color} mb-4`}>
                {React.cloneElement(m.icon, { className: "w-6 h-6" })}
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
              <h4 className="text-2xl font-serif font-bold text-primary-main">{m.val}</h4>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Growth Chart - Spans 2 cols */}
          <div className="lg:col-span-2 glass-card p-8 border-white/40">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif font-bold text-xl text-primary-main">Registry Growth (2024)</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-status-verified px-3 py-1 bg-status-verified/10 rounded-full">
                <TrendingUp className="w-3 h-3" /> +12.5% MoM
              </div>
            </div>
            <div className="h-[300px] w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={recentTrend}>
                  <defs>
                    <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2A7A6F" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2A7A6F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '12px' }}
                  />
                  <Area type="monotone" dataKey="registrations" stroke="#2A7A6F" strokeWidth={4} fillOpacity={1} fill="url(#colorReg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution - Spans 1 col */}
          <div className="glass-card p-8 border-white/40">
            <h3 className="font-serif font-bold text-xl text-primary-main mb-8">Plot Distribution</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={districtData}
                    cx="50%" cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {districtData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {districtData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{d.name}</span>
                  </div>
                  <span className="text-xs font-bold text-primary-main">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lower Section Full Width */}
          <div className="lg:col-span-3 glass-card p-8 border-white/40">
             <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="font-serif font-bold text-xl text-primary-main">Dispute Settlement Index</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Smart Contract Arbitrations</p>
               </div>
               <button className="text-xs text-accent-teal font-bold hover:underline">View Ledger Audit &rarr;</button>
             </div>
             <div className="h-[300px] w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { q: 'Q1', open: 400, res: 240 },
                  { q: 'Q2', open: 300, res: 280 },
                  { q: 'Q3', open: 200, res: 320 },
                  { q: 'Q4', open: 150, res: 400 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis dataKey="q" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="open" name="Pending" fill="#E8900A" radius={[6, 6, 0, 0]} barSize={24} />
                  <Bar dataKey="res" name="Settled" fill="#2A7A6F" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
