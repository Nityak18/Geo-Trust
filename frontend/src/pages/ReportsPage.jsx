import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

const ReportsPage = () => {
  const timeData = [
    { name: 'Jan', registrations: 1200 },
    { name: 'Feb', registrations: 1900 },
    { name: 'Mar', registrations: 2400 },
    { name: 'Apr', registrations: 2100 },
    { name: 'May', registrations: 2800 },
    { name: 'Jun', registrations: 3400 },
    { name: 'Jul', registrations: 4100 },
    { name: 'Aug', registrations: 3900 },
    { name: 'Sep', registrations: 4600 },
    { name: 'Oct', registrations: 5200 },
  ];

  const districtData = [
    { name: 'Bangalore U', value: 840 },
    { name: 'Pune', value: 620 },
    { name: 'Mumbai Sub', value: 540 },
    { name: 'Hyderabad', value: 410 },
    { name: 'Chennai', value: 390 },
  ];

  const disputeData = [
    { name: 'Q1', open: 400, resolved: 240 },
    { name: 'Q2', open: 300, resolved: 280 },
    { name: 'Q3', open: 200, resolved: 320 },
    { name: 'Q4', open: 150, resolved: 380 },
  ];

  const COLORS = ['#1C3A3A', '#2A7A6F', '#E8900A', '#3DAA5C', '#7B5EA7'];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-0.5 w-8 text-status-transferred bg-[#7B5EA7]"></div>
            <span className="text-sm font-bold tracking-[0.2em] text-primary-main uppercase">Analytics</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-primary-main">Registry Reports & Analytics</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Line Chart / Area Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
            <h3 className="font-serif font-bold text-xl text-primary-main mb-6">Total Registrations Over Time</h3>
            <div className="h-80 w-full text-sm">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="registrations" stroke="#E8900A" strokeWidth={3} fillOpacity={1} fill="url(#colorReg)" />
                  <defs>
                    <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E8900A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#E8900A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
            <h3 className="font-serif font-bold text-xl text-primary-main mb-6">Value Distribution by District (Cr)</h3>
            <div className="h-80 w-full flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={districtData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {districtData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 w-full">
          <h3 className="font-serif font-bold text-xl text-primary-main mb-6">Dispute Resolution Trend</h3>
          <div className="h-80 w-full text-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={disputeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Bar dataKey="open" name="Open Disputes" fill="#E8900A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved Disputes" fill="#3DAA5C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportsPage;
