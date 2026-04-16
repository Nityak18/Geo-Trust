import React, { useState } from 'react';
import { Filter, Download } from 'lucide-react';
import { useRegistry } from '../context/RegistryContext';

const ExplorerPage = () => {
  const { transactions } = useRegistry();
  
  const [activeTab, setActiveTab] = useState('All');

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Minted') return tx.status === 'VERIFIED';
    if (activeTab === 'Transferred') return tx.status === 'TRANSFERRED';
    if (activeTab === 'Pending') return tx.status === 'PENDING';
    return true;
  });

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-0.5 w-8 bg-accent-teal"></div>
              <span className="text-sm font-bold tracking-[0.2em] text-primary-main uppercase">Network</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-primary-main">Block Explorer</h1>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Filters/Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-black/5 mb-6 max-w-fit">
          {['All', 'Minted', 'Transferred', 'Pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab 
                ? 'bg-primary-main text-white shadow' 
                : 'text-gray-500 hover:text-primary-main hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-main/5 text-xs uppercase tracking-wider text-primary-main/70 border-b border-black/5">
                  <th className="p-4 font-bold">TX Hash</th>
                  <th className="p-4 font-bold">Block</th>
                  <th className="p-4 font-bold">Survey No.</th>
                  <th className="p-4 font-bold">Owner Hash</th>
                  <th className="p-4 font-bold">Value</th>
                  <th className="p-4 font-bold">Timestamp</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-black/5">
                {filteredTransactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-primary-main/5 transition-colors group">
                    <td className="p-4 text-accent-teal font-mono cursor-pointer hover:underline">{tx.hash}</td>
                    <td className="p-4 font-mono text-gray-600">{tx.block}</td>
                    <td className="p-4 font-medium">{tx.surveyNo}</td>
                    <td className="p-4 font-mono text-gray-500 truncate max-w-[120px]" title={tx.owner}>{tx.owner}</td>
                    <td className="p-4 font-bold text-primary-main">{tx.value}</td>
                    <td className="p-4 text-gray-500 text-xs">{tx.time}</td>
                    <td className="p-4">
                      <span className={`badge ${
                        tx.status === 'VERIFIED' ? 'text-status-verified bg-status-verified/10' :
                        tx.status === 'PENDING' ? 'text-status-pending bg-status-pending/10' :
                        'text-status-transferred bg-status-transferred/10'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>Showing 1 to 7 of 1,248 entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Next</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExplorerPage;
