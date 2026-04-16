import React, { useState } from 'react';
import { Search, FileText, CheckCircle } from 'lucide-react';
import { useRegistry } from '../context/RegistryContext';
import { motion } from 'framer-motion';

const VerifyPage = () => {
  const { properties, transactions } = useRegistry();
  const [query, setQuery] = useState('');
  const [propertyHistory, setPropertyHistory] = useState([]);
  
  const mockDatabase = {
    '201': { survey: '201', owner: 'Ananya R.', value: '₹85,00,000', id: 'KA-01-2847-0023', block: '8,413', tx: '0xLandReg789...456Deed', time: '2026-04-12 14:32:01 UTC', status: 'VERIFIED' },
    '142': { survey: '142', owner: 'Ramesh Kumar', value: '₹48,20,000', id: 'KA-01-2847-0024', block: '8,412', tx: '0xb412...88df', time: '2026-04-14 12:10:00 UTC', status: 'VERIFIED' },
    '77B': { survey: '77B', owner: 'Priya S.', value: '₹72,50,000', id: 'MH-04-1122-0077', block: 'Pending', tx: '0x... (mempool)', time: 'Pending', status: 'PENDING' },
    '481': { survey: '481', owner: 'Vikram Singh', value: '₹1,20,00,000', id: 'RJ-09-0034-0481', block: '8,104', tx: '0x7e81...22b1', time: '2026-04-13 09:45:00 UTC', status: 'TRANSFERRED' }
  };

  const [result, setResult] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if(query.trim()) {
      // 1. First, search through our real-time global Registry properties
      const liveProperty = properties.find(p => 
        p.surveyNo.includes(query) || 
        p.id.includes(query) || 
        (p.hash && p.hash.includes(query))
      );

      if (liveProperty) {
        setResult({
          survey: liveProperty.surveyNo.replace('Survey No. ', ''),
          owner: liveProperty.owner,
          value: liveProperty.value,
          id: liveProperty.id,
          block: liveProperty.block,
          tx: liveProperty.hash,
          time: liveProperty.time || '2026-04-15 10:45',
          status: liveProperty.status
        });
        
        // Find all history for this survey across ALL transactions
        const history = transactions.filter(tx => 
          tx.surveyNo.includes(query) || 
          liveProperty.surveyNo.includes(tx.surveyNo)
        );
        setPropertyHistory(history);
      } else {
        const foundKey = Object.keys(mockDatabase).find(k => query.includes(k)) || '201';
        setResult(mockDatabase[foundKey]);
        setPropertyHistory([mockDatabase[foundKey]]); 
      }
      
      setIsSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-main mb-4">Verify Deed</h1>
          <p className="text-textPrimary/70 font-medium max-w-2xl mx-auto">
            Cryptographically verify the authenticity of a property title by checking its immutable record on the Ethereum blockchain.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative flex items-center shadow-xl mb-12">
          <input 
            type="text" 
            placeholder="Enter TX Hash (0x...) or Survey Number..."
            className="w-full bg-white border-2 border-transparent text-lg focus:border-accent-orange py-5 pl-6 pr-32 rounded-2xl outline-none font-mono placeholder:font-sans"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="absolute right-3 top-3 bottom-3 bg-accent-orange hover:bg-[#d6850a] text-white px-6 rounded-xl font-bold flex items-center transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </button>
        </form>

        {isSearched && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-black/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="bg-primary-dark p-6 text-white flex justify-between items-center">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Blockchain Record Found</p>
                <h3 className="font-serif text-2xl font-bold text-accent-orange">Survey No. {result?.survey}</h3>
              </div>
              <div className={`border px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 tracking-wide ${
                result?.status === 'VERIFIED' ? 'bg-status-verified/20 text-status-verified border-status-verified/50' :
                result?.status === 'PENDING' ? 'bg-status-pending/20 text-status-pending border-status-pending/50' :
                'bg-status-transferred/20 text-status-transferred border-status-transferred/50'
              }`}>
                {result?.status === 'VERIFIED' && <CheckCircle className="w-4 h-4" />} {result?.status}
              </div>
            </div>

            <div className="p-8 grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Current Owner</dt>
                  <dd className="text-lg font-bold text-primary-main">{result?.owner}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Property Value</dt>
                  <dd className="text-lg font-bold text-primary-main">{result?.value}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Parcel ID</dt>
                  <dd className="text-lg font-mono text-gray-800 bg-gray-100 inline-block px-2 py-1 rounded">{result?.id}</dd>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Timestamp</dt>
                  <dd className="text-md font-mono text-gray-800">{result?.time}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Block Number</dt>
                  <dd className="text-md font-mono text-accent-orange">{result?.block}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Smart Contract Hash</dt>
                  <dd className="text-md font-mono text-accent-teal max-w-full overflow-hidden text-ellipsis">{result?.tx}</dd>
                </div>
              </div>
            </div>

            {/* History Timeline */}
            <div className="bg-gray-50 p-8 border-t border-gray-100">
               <div className="flex items-center gap-2 mb-8">
                 <div className="p-2 bg-accent-orange/10 rounded-lg">
                    <Search className="w-5 h-5 text-accent-orange" />
                 </div>
                 <h4 className="font-serif font-bold text-xl text-primary-main">Property Lifecycle History</h4>
               </div>

               <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200"></div>

                  {propertyHistory.map((h, i) => (
                    <div key={i} className="relative pl-12">
                       {/* Dot */}
                       <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-accent-teal border-4 border-white shadow-sm ring-1 ring-accent-teal/20"></div>
                       
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-bold text-primary-main">{h.status === 'TRANSFERRED' ? 'Change of Ownership' : 'Birth Instance / Minting'}</p>
                            <p className="text-xs text-gray-500 font-mono mt-1">Owner: {h.owner}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-xs font-bold text-accent-orange uppercase tracking-widest">{h.time}</p>
                             <p className="text-[10px] text-gray-400 font-mono transition-opacity group-hover:opacity-100">Block #{h.block}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Raw On-Chain Metadata */}
            <div className="bg-primary-dark p-8 border-t border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-400" />
                <h4 className="font-bold text-primary-main">Raw On-Chain Metadata (IPFS)</h4>
              </div>
              <pre className="bg-primary-dark text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto shadow-inner leading-relaxed">
{`{
  "title": "Title Deed: Survey No. ${result?.survey}",
  "type": "object",
  "properties": {
    "survey_no": "${result?.survey}",
    "owner_hash": "e3b0c44298fc1c149afbf4c...",
    "registration_office": "Verified Sub-Registrar",
    "timestamp_validated": "${result?.time}"
  }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
