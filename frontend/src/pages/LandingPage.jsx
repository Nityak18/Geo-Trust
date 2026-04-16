import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, ChevronRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-accent-orange/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 w-[500px] h-[500px] rounded-full bg-accent-teal/5 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-main/5 border border-primary-main/10 mb-6 group">
                <ShieldCheck className="w-4 h-4 text-accent-teal" />
                <span className="text-xs font-bold tracking-[0.15em] text-primary-main uppercase">
                  Blockchain Land Registry System
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-main leading-[1.1] mb-6">
                Secure Land Ownership on the <span className="italic text-accent-orange font-light">Chain</span>
              </h1>
              
              <p className="text-lg md:text-xl text-textPrimary/80 mb-10 leading-relaxed font-medium">
                Transparent, immutable, and modernized property registration. Protecting your legacy with Ethereum-backed smart contracts and real-time verification.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/transfer" className="btn-primary group">
                  <span className="mr-2">🏛</span> Register Property
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/verify" className="btn-outline group">
                  <Search className="w-4 h-4 mr-2 group-hover:text-accent-orange transition-colors" /> Verify Deed
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-3 text-sm font-medium text-textPrimary/60">
                <CheckCircle className="w-5 h-5 text-status-verified" />
                <span>Ownership Verified on Blockchain</span>
              </div>
            </motion.div>
            
            {/* Right Column Interactive Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl z-20 animate-bounce" style={{animationDuration: '3s'}}>
                <p className="text-xs font-medium text-textPrimary flex flex-col gap-1">
                  <span className="font-bold tracking-wider text-xs uppercase opacity-50">ChainDeed Online</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-status-verified animate-pulse"></span>
                    Connected to Ethereum Mainnet
                  </span>
                  <span className="text-[10px] text-textPrimary/50">128 validators active.</span>
                </p>
              </div>

              {/* Floating Property Card */}
              <div className="glass-card p-6 w-[400px] mx-auto transform hover:-translate-y-2 transition-transform duration-500 relative z-10 border border-primary-main/10 shadow-2xl bg-surface">
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-primary-main/50 uppercase mb-1">Active Record</p>
                    <h3 className="text-xl font-bold font-serif text-primary-main">Survey No. 201</h3>
                    <p className="text-sm text-textPrimary/70 inline-flex items-center gap-1 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21C16 16.8 19 12.8467 19 9.5C19 5.35786 15.866 2 12 2C8.13401 2 5 5.35786 5 9.5C5 12.8467 8 16.8 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Dharwad, Karnataka
                    </p>
                  </div>
                  <div className="badge bg-status-verified/10 text-status-verified">
                    ● VERIFIED
                  </div>
                </div>

                {/* SVG Polygon Land Plot Visualization */}
                <div className="bg-primary-main/5 rounded-xl p-4 mb-6 relative overflow-hidden group">
                  <svg viewBox="0 0 100 100" className="w-full h-40 drop-shadow-md">
                    {/* Plot Polygon */}
                    <path 
                      d="M10 80 L20 20 L70 10 L85 45 L90 85 Z" 
                      fill="#3DAA5C" 
                      fillOpacity="0.2" 
                      stroke="#3DAA5C" 
                      strokeWidth="2"
                      className="transition-all duration-[3000ms] ease-in-out group-hover:fillOpacity-0.4"
                    />
                    {/* Vertices */}
                    <circle cx="10" cy="80" r="2.5" fill="#E8900A" />
                    <circle cx="20" cy="20" r="2.5" fill="#E8900A" />
                    <circle cx="70" cy="10" r="2.5" fill="#E8900A" />
                    <circle cx="85" cy="45" r="2.5" fill="#E8900A" />
                    <circle cx="90" cy="85" r="2.5" fill="#E8900A" />
                  </svg>
                  <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold shadow-sm">
                    4.2 Acres
                  </div>
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono shadow-sm">
                    ID: KA-201
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Owner</span>
                    <span className="text-sm font-semibold">Ananya R.</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Block #</span>
                    <span className="text-sm font-mono text-accent-orange font-bold">8,413</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">TX Hash</span>
                    <span className="text-sm font-mono text-accent-teal hover:underline cursor-pointer">0x8f4...e2a9</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-500">Value</span>
                    <span className="text-lg font-bold text-primary-main">₹85 Lakhs</span>
                  </div>
                </div>
                
                {/* Simulated scan line effect */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl overflow-hidden">
                  <div className="w-full h-1 bg-accent-teal/30 absolute shadow-[0_0_8px_rgba(42,122,111,0.5)] animate-[scan_4s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Registry Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-main inline-block relative">
              Live Registry Statistics
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-accent-orange rounded-full"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏛', value: '20,62,339', label: 'Parcels Registered on Chain', color: 'text-primary-main' },
              { icon: '₹', value: '₹3,404Cr', label: 'Property Value Secured', color: 'text-accent-orange' },
              { icon: '✅', value: '70%', label: 'Dispute Resolution Rate', color: 'text-accent-teal' },
              { icon: '⚡', value: '8s', label: 'Average Block Confirmation', color: 'text-status-transferred' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-background rounded-2xl p-6 text-center shadow-sm border border-black/5"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className={`text-3xl font-bold font-serif mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm font-medium text-textPrimary/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Workflow Timeline Preview */}
          <div className="mt-32">
            <h3 className="text-2xl font-serif font-bold text-center text-primary-main mb-12">How Registration Works</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-0.5 bg-gray-200 -z-10"></div>
              
              {[
                { step: 1, title: 'Identity Verification', sub: 'Aadhaar / PAN zero-knowledge proof' },
                { step: 2, title: 'Smart Contract Minting', sub: 'ERC-721 token generated' },
                { step: 3, title: 'Immutable Record', sub: 'Stored on Ethereum & IPFS' }
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center text-center relative px-4">
                  <div className="w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center font-bold text-xl mb-4 shadow-lg border-4 border-white">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
