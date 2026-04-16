import React from 'react';
import PropertyCard from '../components/PropertyCard';
import { useRegistry } from '../context/RegistryContext';

const RegistryPage = () => {
  const { properties, transactions } = useRegistry();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-0.5 w-8 bg-accent-orange"></div>
            <span className="text-sm font-bold tracking-[0.2em] text-primary-main uppercase">Registry</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-primary-main mb-2">Property Records</h1>
          <p className="text-textPrimary/60 font-medium">Hover across the cards to reveal on-chain verified metadata.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {properties.map((prop, idx) => (
             <PropertyCard key={idx} property={prop} />
          ))}
        </div>

        {/* LEDGER Section */}
        <div className="mb-10 mt-20">
           <div className="flex items-center gap-4 mb-4">
            <div className="h-0.5 w-8 bg-accent-teal"></div>
            <span className="text-sm font-bold tracking-[0.2em] text-primary-main uppercase">Ledger</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-primary-main mb-6">Blockchain Transaction Log</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background text-xs uppercase tracking-wider text-primary-main/60 border-b border-black/5">
                    <th className="p-4 font-bold">Block</th>
                    <th className="p-4 font-bold">TX Hash</th>
                    <th className="p-4 font-bold">Property ID</th>
                    <th className="p-4 font-bold">Action</th>
                    <th className="p-4 font-bold">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-black/5">
                  {transactions.slice(0, 5).map((tx, idx) => (
                    <tr key={idx} className="hover:bg-primary-main/5 transition-colors">
                      <td className="p-4 font-mono text-accent-orange">{tx.block}</td>
                      <td className="p-4 font-mono text-accent-teal">{tx.hash}</td>
                      <td className="p-4">{tx.surveyNo}</td>
                      <td className="p-4"><span className={`badge ${
                         tx.status === 'VERIFIED' ? 'text-status-verified bg-status-verified/10' :
                         tx.status === 'PENDING' ? 'text-status-pending bg-status-pending/10' :
                         'text-status-transferred bg-status-transferred/10'
                      } text-[10px]`}>{tx.status}</span></td>
                      <td className="p-4 text-gray-500">{tx.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegistryPage;
