import React, { createContext, useContext, useState } from 'react';

const RegistryContext = createContext();

export const useRegistry = () => useContext(RegistryContext);

export const RegistryProvider = ({ children }) => {
  const [properties, setProperties] = useState([
    {
      surveyNo: 'Survey No. 142',
      location: 'Belagavi, Karnataka',
      area: '2.4 Acres',
      type: 'Agricultural',
      status: 'VERIFIED',
      value: '₹48.2 Lakhs',
      id: 'KA-01-2847-0023',
      owner: '0x3a4...9f1b',
      block: '8,412',
      hash: '0xb412...88df',
      svgType: 'green_polygon'
    },
    {
      surveyNo: 'Plot 77B',
      location: 'Pune Suburban, MH',
      area: '1,200 sq.ft',
      type: 'Residential',
      status: 'PENDING',
      value: '₹72.5 Lakhs',
      id: 'MH-04-1122-0077',
      owner: '0x1c9...2a34',
      block: 'Pending',
      hash: '0x... (mempool)',
      svgType: 'orange_floorplan'
    },
    {
      surveyNo: 'Khasra 481',
      location: 'Jaipur North, RJ',
      area: '0.8 Acres',
      type: 'Commercial',
      status: 'TRANSFERRED',
      value: '₹1.2 Crore',
      id: 'RJ-09-0034-0481',
      owner: '0x8f2...7c6d',
      block: '8,104',
      hash: '0x7e81...22b1',
      svgType: 'purple_polygon'
    }
  ]);

  const [transactions, setTransactions] = useState([
    { hash: '0x8f4c...e2a9', block: '8,413', surveyNo: '201', owner: '0x33b...11a2', value: '₹85.0 L', time: '14 Oct 2026, 02:32:01 pm', status: 'VERIFIED' },
    { hash: '0xb412...88df', block: '8,412', surveyNo: '142', owner: '0x3a4...9f1b', value: '₹48.2 L', time: '14 Oct 2026, 12:10:45 pm', status: 'VERIFIED' },
    { hash: '0x7e81...22b1', block: '8,104', surveyNo: '481', owner: '0x8f2...7c6d', value: '₹1.2 Cr', time: '13 Oct 2026, 09:45:12 am', status: 'TRANSFERRED' },
    { hash: '0x2a44...9f00', block: '7,988', surveyNo: '88', owner: '0x1c9...2a34', value: '₹35.5 L', time: '12 Oct 2026, 04:20:00 pm', status: 'VERIFIED' },
  ]);

  const executeTransfer = (tokenId, newOwner, valueIN) => {
    // Generate a simulated transaction hash
    const fakeHash = '0x' + Math.random().toString(16).substring(2, 12) + '...deed';
    
    const now = new Date();
    const timeString = now.toLocaleString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });

    const newTx = {
      hash: fakeHash,
      block: 'Pending',
      surveyNo: tokenId.substring(0, 10),
      owner: newOwner,
      value: valueIN,
      time: timeString,
      status: 'PENDING'
    };

    // Prepend the new pending transaction to Explorer logs instantly
    setTransactions(prev => [newTx, ...prev]);

    // Mimic the 8 second block validation wait
    setTimeout(() => {
      // 1. Flip explorer PENDING to TRANSFERRED
      setTransactions(prev => prev.map(tx => {
        if (tx.hash === fakeHash) {
          return { ...tx, status: 'TRANSFERRED', block: (Math.floor(Math.random() * 1000) + 8500).toString() };
        }
        return tx;
      }));

      // 2. Change the Property Owner internally (if card exists)
      setProperties(prev => {
        let isExisting = false;
        const updated = prev.map(p => {
          if (p.surveyNo.includes(tokenId) || tokenId.includes(p.surveyNo.split(' ')[2] || 'NONE')) {
            isExisting = true;
            return {
              ...p,
              owner: newOwner,
              status: 'TRANSFERRED',
              value: valueIN,
              hash: fakeHash,
              block: (Math.floor(Math.random() * 1000) + 8500).toString()
            };
          }
          return p;
        });

        // Add a new mock card if we didn't find the survey number
        if (!isExisting) {
          updated.unshift({
            surveyNo: 'Survey No. ' + tokenId,
            location: 'Newly Migrated Web3 Record',
            area: 'Unknown Acres',
            type: 'Agricultural',
            status: 'TRANSFERRED',
            value: valueIN,
            id: 'NEW-ID-' + Math.floor(Math.random()*1000),
            owner: newOwner,
            block: (Math.floor(Math.random() * 1000) + 8500).toString(),
            hash: fakeHash,
            svgType: 'green_polygon'
          });
        }
        return updated;
      });

    }, 8000); // Wait exactly 8 seconds to process "validators"
  };

  return (
    <RegistryContext.Provider value={{ properties, transactions, executeTransfer }}>
      {children}
    </RegistryContext.Provider>
  );
};
