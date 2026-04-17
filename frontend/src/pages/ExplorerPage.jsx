import React, { useState } from 'react';
import { Filter, Download, Search } from 'lucide-react';
import { useRegistry } from '../context/RegistryContext';

const ExplorerPage = () => {
  const { transactions } = useRegistry();
  
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Smart Filter + Limit to 6 + Pin Statuses
  const getDisplayTransactions = () => {
    // 1. Initial filter based on search and tabs
    let base = transactions.filter(tx => {
      const searchVal = searchQuery.toLowerCase();
      const matchesSearch = 
        tx.hash.toLowerCase().includes(searchVal) || 
        tx.surveyNo.toLowerCase().includes(searchVal) || 
        tx.owner.toLowerCase().includes(searchVal);

      if (!matchesSearch) return false;
      if (activeTab === 'All') return true;
      if (activeTab === 'Minted') return tx.status === 'VERIFIED';
      if (activeTab === 'Transferred') return tx.status === 'TRANSFERRED';
      if (activeTab === 'Pending') return tx.status === 'PENDING';
      return true;
    });

    // 2. Ensure fixed samples (1 Pending, 1 Verified) are always in the top 6 if they exist
    const pinnedPending = transactions.find(t => t.status === 'PENDING');
    const pinnedVerified = transactions.find(t => t.status === 'VERIFIED');
    
    let result = [...base];
    
    // Insert pins at the start if not already there
    if (pinnedVerified && !result.find(r => r.hash === pinnedVerified.hash)) result.unshift(pinnedVerified);
    if (pinnedPending && !result.find(r => r.hash === pinnedPending.hash)) result.unshift(pinnedPending);

    // 3. Absolute limit of 6 recently updated
    return result.slice(0, 6);
  };

  const filteredTransactions = getDisplayTransactions();

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return;
    
    // Define headers
    const headers = ["TX Hash", "Block", "Survey No", "Owner", "Value", "Timestamp", "Status"];
    
    // Map data to rows
    const rows = filteredTransactions.map(tx => [
      tx.hash,
      tx.block,
      tx.surveyNo,
      tx.owner,
      tx.value,
      tx.time,
      tx.status
    ]);
    
    // Combine into CSV string
    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `geotrust_ledger_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-0.5 w-8 bg-accent-teal"></div>
              <span className="text-sm font-bold tracking-[0.2em] text-primary-main uppercase">Network</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-primary-main">Block Explorer</h1>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => document.getElementById('explorerSearch')?.focus()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all shadow-sm active:scale-95"
            >
              <Filter className="w-4 h-4 text-accent-teal" /> Filter Records
            </button>
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-primary-main text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Compact Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 bg-white/60 backdrop-blur-md p-3 rounded-xl border border-white/40 shadow-sm">
          {/* Tabs */}
          <div className="flex space-x-1 bg-background p-1 rounded-lg border border-black/5 w-full lg:w-auto">
            {['All', 'Minted', 'Transferred', 'Pending'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 lg:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === tab 
                  ? 'bg-primary-main text-white shadow-sm' 
                  : 'text-gray-400 hover:text-primary-main hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Compact Search Box */}
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              id="explorerSearch"
              type="text" 
              placeholder="Search Hash or Survey..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border-none rounded-lg text-xs focus:ring-1 focus:ring-accent-teal/20 outline-none transition-all"
            />
          </div>
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
