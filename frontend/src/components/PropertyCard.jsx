import React from 'react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
  const { 
    surveyNo, location, area, type, status, value, id, owner, block, hash, svgType 
  } = property;

  const statusColors = {
    VERIFIED: 'text-status-verified bg-status-verified/10',
    PENDING: 'text-status-pending bg-status-pending/10',
    TRANSFERRED: 'text-status-transferred bg-status-transferred/10',
  };

  const getSvg = () => {
    if (svgType === 'green_polygon') return (
      <svg viewBox="0 0 100 100" className="w-full h-32 drop-shadow-sm">
        <path d="M10 80 L20 20 L70 10 L85 45 L90 85 Z" fill="#3DAA5C" fillOpacity="0.2" stroke="#3DAA5C" strokeWidth="2" />
        <circle cx="10" cy="80" r="2" fill="#E8900A" />
        <circle cx="20" cy="20" r="2" fill="#E8900A" />
        <circle cx="70" cy="10" r="2" fill="#E8900A" />
        <circle cx="85" cy="45" r="2" fill="#E8900A" />
        <circle cx="90" cy="85" r="2" fill="#E8900A" />
      </svg>
    );
    if (svgType === 'orange_floorplan') return (
      <svg viewBox="0 0 100 100" className="w-full h-32 drop-shadow-sm">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#E8900A" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="#E8900A" strokeWidth="2" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="#E8900A" strokeWidth="2" />
      </svg>
    );
    return (
      <svg viewBox="0 0 100 100" className="w-full h-32 drop-shadow-sm">
        <path d="M30 90 L10 40 L50 10 L90 40 L70 90 Z" fill="#7B5EA7" fillOpacity="0.2" stroke="#7B5EA7" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card relative overflow-hidden group cursor-pointer border border-black/5 bg-white shadow-sm"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-primary-main">{surveyNo}</h3>
            <p className="text-xs text-gray-500 font-medium">{location}</p>
          </div>
          <div className={`badge ${statusColors[status]}`}>
            ● {status}
          </div>
        </div>
        
        <div className="bg-background rounded-xl p-3 mb-4 flex justify-center items-center">
          {getSvg()}
        </div>
        
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="font-medium">{area}</span>
          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600 font-medium">{type}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 text-xs font-mono">{id}</span>
          <span className="font-bold text-lg text-primary-main">{value}</span>
        </div>
      </div>

      {/* On-Chain Metadata Overlay on Hover */}
      <div className="absolute inset-0 bg-primary-dark/95 backdrop-blur-sm p-5 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex flex-col justify-center gap-3">
        <h4 className="text-accent-orange font-bold text-sm tracking-widest uppercase mb-2 border-b border-white/10 pb-2">On-Chain Data</h4>
        
        <div className="flex justify-between text-xs">
          <span className="text-white/60">Owner Hash</span>
          <span className="font-mono text-accent-teal truncate max-w-[120px]">{owner}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/60">Block Number</span>
          <span className="font-mono">{block}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/60">Transaction</span>
          <span className="font-mono text-accent-teal truncate max-w-[120px]">{hash}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/60">Timestamp</span>
          <span className="font-mono">14 Oct 2026</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/60">IPFS CID</span>
          <span className="font-mono truncate max-w-[120px]">QmYwAPJzv5...</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
