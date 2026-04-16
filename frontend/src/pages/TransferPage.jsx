import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { useRegistry } from '../context/RegistryContext';

const TransferPage = () => {
  const { register, handleSubmit } = useForm();
  const { executeTransfer } = useRegistry();
  const [txData, setTxData] = useState(null);
  
  const [step, setStep] = useState(2); 

  const onSubmit = (data) => {
    setTxData(data);
    setStep(3); // Moving to review
  };

  const onApprove = () => {
    setStep(4); // Moving to Mint
    setTimeout(() => {
      // Pass the name as the primary owner identifier, and let the backend/context map it
      executeTransfer(txData.tokenId, txData.buyerName || txData.newWallet, txData.value);
      alert("🎉 SUCCESS! The transaction was sent to validators. Check the Explorer or Registry!");
      setStep(2);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-0.5 w-8 bg-accent-orange"></div>
            <span className="text-sm font-bold tracking-[0.2em] text-primary-main uppercase">Transaction</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-primary-main mb-6">Transfer Ownership</h1>
        </div>

        {/* Dynamic Card Header */}
        <div className="bg-accent-orange text-white rounded-t-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/4 translate-x-1/4"></div>
          <p className="text-xs font-bold tracking-widest uppercase mb-2 opacity-80">Step {step} of 4 &mdash; {step === 2 ? 'Sign Transaction' : 'Review & Mint'}</p>
          <h2 className="text-3xl font-serif font-semibold relative z-10">Property Ownership Transfer</h2>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-b-2xl shadow-xl border border-black/5 p-8 border-t-0">
          
          {/* Stepper */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>
            {[
              { num: 1, label: 'VERIFY', status: 'completed' },
              { num: 2, label: 'SIGN', status: step === 2 ? 'active' : (step > 2 ? 'completed' : 'pending') },
              { num: 3, label: 'REVIEW', status: step === 3 ? 'active' : (step > 3 ? 'completed' : 'pending') },
              { num: 4, label: 'MINT', status: step === 4 ? 'active' : 'pending' }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center bg-white px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${
                  s.status === 'completed' ? 'bg-status-verified text-white' : 
                  s.status === 'active' ? 'bg-accent-orange text-white ring-4 ring-accent-orange/20' : 
                  'bg-gray-100 text-gray-400'
                }`}>
                  {s.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[10px] font-bold tracking-wider ${s.status === 'active' ? 'text-accent-orange' : 'text-gray-400'}`}>{s.label}</span>
              </div>
            ))}
          </div>

          {step === 2 ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Token ID */}
                <div>
                  <label className="block text-xs font-bold text-primary-main uppercase tracking-wide mb-2">Property Token ID or Survey No.</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 142 or Survey No. 142" 
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition-shadow"
                    {...register("tokenId")}
                  />
                </div>

                {/* Current Owner */}
                <div>
                  <label className="block text-xs font-bold text-primary-main uppercase tracking-wide mb-2">Current Owner</label>
                  <input 
                    type="text" 
                    placeholder="Ramesh Kumar or 0x..." 
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition-shadow"
                    {...register("currentOwner")}
                  />
                </div>

                {/* Buyer Aadhaar/PAN */}
                <div>
                  <label className="block text-xs font-bold text-primary-main uppercase tracking-wide mb-2">Buyer Aadhaar / PAN (Hash)</label>
                  <input 
                    type="text" 
                    placeholder="ABCDE1234F" 
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition-shadow"
                    {...register("buyerId")}
                  />
                </div>

                {/* Buyer Name */}
                <div>
                  <label className="block text-xs font-bold text-primary-main uppercase tracking-wide mb-2">New Owner Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ananya Rao" 
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition-shadow"
                    {...register("buyerName")}
                  />
                </div>

                {/* New Owner Wallet */}
                <div>
                  <label className="block text-xs font-bold text-primary-main uppercase tracking-wide mb-2">New Owner Wallet Address</label>
                  <input 
                    type="text" 
                    placeholder="0x..." 
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition-shadow font-mono"
                    {...register("newWallet")}
                  />
                </div>

                {/* Transfer Value INR */}
                <div>
                  <label className="block text-xs font-bold text-primary-main uppercase tracking-wide mb-2">Transfer Value (INR)</label>
                  <input 
                    type="text" 
                    placeholder="₹ 0.00" 
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition-shadow"
                    {...register("value")}
                  />
                </div>

                {/* Stamp Duty %} */}
                <div>
                  <label className="block text-xs font-bold text-primary-main uppercase tracking-wide mb-2">Stamp Duty %</label>
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="5.0" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none transition-shadow"
                    {...register("stampDuty")}
                  />
                </div>
              </div>

              <div className="bg-primary-main/5 border border-primary-main/10 rounded-xl p-4 flex gap-4 mt-4">
                <AlertCircle className="w-6 h-6 text-accent-teal shrink-0" />
                <p className="text-sm text-primary-main/80 font-medium">Please ensure both parties have verified their identity offline before signing this transaction. The smart contract state will be immutable once minted.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 justify-end">
                <button type="button" className="px-6 py-3 font-medium text-gray-500 hover:text-primary-main transition-colors">
                  Cancel
                </button>
                <button type="submit" className="btn-primary px-8">
                  Sign Transaction <span className="ml-2 font-serif text-lg leading-none">◌</span>
                </button>
              </div>
            </form>
          ) : step === 3 ? (
            <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }} className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border-4 border-accent-orange/20 border-t-accent-orange rounded-full animate-spin mb-6"></div>
              <h3 className="text-2xl font-serif font-bold text-primary-main mb-2">Reviewing Transaction</h3>
              <p className="text-gray-500 mb-8 max-w-md">Our Web3 portal is formatting your data and verifying zero-knowledge hashes against the contract parameters.</p>
              <button type="button" onClick={onApprove} className="btn-accent px-8">
                Approve & Mint to Block
              </button>
            </motion.div>
          ) : (
             <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }} className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 border-[6px] border-accent-teal/20 border-t-accent-teal rounded-full animate-spin mb-6"></div>
              <h3 className="text-2xl font-serif font-bold text-primary-main mb-2">Minting to Blockchain</h3>
              <p className="text-gray-500 font-mono text-sm max-w-md">Awaiting block confirmation on distributed network... Do not close window.</p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TransferPage;
