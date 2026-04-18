import React, { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { getCoordinates, getGoogleMapsUrl, formatCoords } from '../lib/geoUtils';

const PropertyMiniMap = lazy(() => import('./ui/PropertyMiniMap'));

const PropertyCard = ({ property }) => {
  const { surveyNo, location, area, type, status, value, id, owner, block, hash, coords } = property;
  const [resolvedCoords, setResolvedCoords] = useState(coords || null); // prefer stored exact coords

  // Use exact stored coords if available; only use geoUtils fallback if not
  const effectiveCoords = coords || resolvedCoords;

  const statusColors = {
    VERIFIED: 'text-status-verified bg-status-verified/10',
    PENDING: 'text-status-pending bg-status-pending/10',
    TRANSFERRED: 'text-status-transferred bg-status-transferred/10',
  };

  const handleNavigate = (e) => {
    e.stopPropagation();
    const c = effectiveCoords || getCoordinates(location);
    const url = getGoogleMapsUrl(c[0], c[1], `${surveyNo} - ${location}`);
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card relative overflow-hidden group cursor-pointer border border-black/5 bg-white shadow-sm"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-primary-main">{surveyNo}</h3>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-accent-teal shrink-0" />{location}
            </p>
          </div>
          <div className={`badge ${statusColors[status]}`}>
            ● {status}
          </div>
        </div>
        
        {/* Mini Map */}
        <div className="rounded-xl overflow-hidden mb-3 border border-black/5 relative z-0">
          <Suspense fallback={
            <div className="h-32 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gray-300" />
            </div>
          }>
          <PropertyMiniMap 
              location={location} 
              zoom={coords ? 15 : 11}  // zoom in tighter when we have exact coords
              height="h-32" 
              interactive={false}
              onCoordsResolved={(c) => { if (!coords) setResolvedCoords(c); }}
            />
          </Suspense>

          {/* Navigate button overlaid on the map */}
          <button
            onClick={handleNavigate}
            className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary-main shadow-md hover:bg-accent-teal hover:text-white transition-all border border-white/60"
          >
            <Navigation className="w-3 h-3" />
            Navigate
          </button>
        </div>
        
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="font-medium">{area}</span>
          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600 font-medium">{type}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 text-xs font-mono">{id}</span>
          <span className="font-bold text-lg text-primary-main">{value}</span>
        </div>

        {/* Subtle coords display */}
        {effectiveCoords && (
          <p className="text-[10px] text-gray-400 font-mono mt-1.5 text-center">
            {formatCoords(effectiveCoords[0], effectiveCoords[1])}
          </p>
        )}
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
          <span className="text-white/60">Location</span>
          <span className="font-mono text-white/80 truncate max-w-[140px]">{location}</span>
        </div>
        {effectiveCoords && (
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Coordinates</span>
            <span className="font-mono text-white/80">{formatCoords(effectiveCoords[0], effectiveCoords[1])}</span>
          </div>
        )}
        {coords && (
          <div className="flex justify-between text-xs">
            <span className="text-white/60">Precision</span>
            <span className="text-status-verified font-bold text-[10px]">EXACT GPS ✓</span>
          </div>
        )}

        {/* Navigate CTA inside hover overlay */}
        <button
          onClick={handleNavigate}
          className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-teal text-white rounded-xl font-bold text-xs tracking-wider hover:bg-accent-teal/80 transition-all active:scale-95"
        >
          <Navigation className="w-4 h-4" />
          Open in Google Maps
        </button>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
