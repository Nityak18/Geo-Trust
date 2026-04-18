import React, { createContext, useContext, useState, useEffect } from 'react';

const RegistryContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useRegistry = () => useContext(RegistryContext);

export const RegistryProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Live Data from MongoDB API
  const fetchRegistryData = async () => {
    setIsLoading(true);
    try {
      const [propRes, txRes] = await Promise.all([
        fetch(`${API_BASE_URL}/properties`),
        fetch(`${API_BASE_URL}/transactions`)
      ]);

      const props = await propRes.json();
      const txs = await txRes.json();

      setProperties(props);
      setTransactions(txs);
    } catch (err) {
      console.warn('API Error, falling back to cached local storage:', err);
      // Fallback to local storage if API is down
      const savedProps = localStorage.getItem('gt_properties');
      const savedTxs = localStorage.getItem('gt_transactions');
      if (savedProps) setProperties(JSON.parse(savedProps));
      if (savedTxs) setTransactions(JSON.parse(savedTxs));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistryData();
  }, []);

  // Update Cache when state changes
  useEffect(() => {
    if (properties.length > 0) localStorage.setItem('gt_properties', JSON.stringify(properties));
    if (transactions.length > 0) localStorage.setItem('gt_transactions', JSON.stringify(transactions));
  }, [properties, transactions]);

  const executeTransfer = async (tokenId, newOwner, valueIN, extraMetadata = {}) => {
    // 1. Prepare Simulated Blockchain Data
    const fakeHash = '0x' + Math.random().toString(16).substring(2, 12) + '...deed';
    const now = new Date();
    const timeString = now.toLocaleString('en-IN', { 
      day: '2-digit', month: 'short', year: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
    });

    const transactionData = {
      hash: fakeHash,
      block: 'Pending',
      surveyNo: tokenId,
      owner: newOwner,
      value: valueIN,
      time: timeString,
      status: 'PENDING',
      landType: extraMetadata.landType || 'Unknown',
      area: extraMetadata.area || 'Unknown'
    };

    // 2. Instant UI Update (Optimistic)
    setTransactions(prev => [transactionData, ...prev]);

    // 3. Wait for "Consensus" (8 seconds)
    setTimeout(async () => {
      const finalBlock = (Math.floor(Math.random() * 1000) + 8500).toString();
      const finalTx = { ...transactionData, status: 'TRANSFERRED', block: finalBlock };
      
      const propertyData = {
        surveyNo: tokenId.includes('Survey') ? tokenId : `Survey No. ${tokenId}`,
        location: extraMetadata.location || 'Migrated Web3 Record',
        area: extraMetadata.area || 'Unknown',
        type: extraMetadata.landType || 'Residential',
        status: 'TRANSFERRED',
        value: valueIN,
        owner: newOwner,
        block: finalBlock,
        hash: fakeHash,
        coords: extraMetadata.coords || null,
        svgType: extraMetadata.landType === 'Residential' ? 'orange_floorplan' : 
                 extraMetadata.landType === 'Commercial' ? 'purple_polygon' : 'green_polygon'
      };

      try {
        // 4. PERSIST TO LIVE DATABASE
        const response = await fetch(`${API_BASE_URL}/transfer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ property: propertyData, transaction: finalTx })
        });

        if (response.ok) {
          fetchRegistryData(); // Refresh state from DB
        }
      } catch (err) {
        console.error('Failed to persist transfer to live DB:', err);
        // Manual state update if API fails
        setTransactions(prev => prev.map(tx => tx.hash === fakeHash ? finalTx : tx));
        setProperties(prev => {
          const exists = prev.find(p => p.surveyNo.includes(tokenId));
          if (exists) {
            return prev.map(p => p.surveyNo.includes(tokenId) ? propertyData : p);
          }
          return [propertyData, ...prev];
        });
      }
    }, 8000);
  };

  return (
    <RegistryContext.Provider value={{ properties, transactions, executeTransfer, isLoading }}>
      {children}
    </RegistryContext.Provider>
  );
};
