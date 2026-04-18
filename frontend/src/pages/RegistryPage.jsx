import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useRegistry } from '../context/RegistryContext';
import { Search, LayoutGrid, Map as MapIcon, MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordinates, getGoogleMapsUrl } from '../lib/geoUtils';

// Fix leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const statusColor = {
  VERIFIED: '#3DAA5C',
  PENDING: '#F59E0B',
  TRANSFERRED: '#7B5EA7',
};

// Phase 2: Cluster map component
const RegistryClusterMap = ({ properties }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

    properties.forEach((prop) => {
      const coords = getCoordinates(prop.location);
      const color = statusColor[prop.status] || '#1C3A3A';
      const mapsUrl = getGoogleMapsUrl(coords[0], coords[1], `${prop.surveyNo} - ${prop.location}`);

      const marker = L.circleMarker(coords, {
        radius: 10,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85,
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family:sans-serif;min-width:180px">
          <p style="font-weight:700;font-size:14px;color:#1C3A3A;margin:0 0 4px">${prop.surveyNo}</p>
          <p style="font-size:12px;color:#555;margin:0 0 2px">📍 ${prop.location}</p>
          <p style="font-size:12px;color:#555;margin:0 0 8px">💰 ${prop.value}</p>
          <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;background:${color}22;color:${color};margin-bottom:8px">${prop.status}</span>
          <a href="${mapsUrl}" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:7px;background:#2A7A6F;color:white;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none;">🧭 Navigate Here</a>
        </div>
      `);
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [properties]);

  return <div ref={mapRef} className="w-full h-[500px] rounded-2xl z-0" />;
};

const RegistryPage = () => {
  const { properties, transactions } = useRegistry();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'

  const filteredProperties = properties.filter(p => 
    p.surveyNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-0.5 w-8 bg-accent-orange"></div>
              <span className="text-sm font-bold tracking-[0.2em] text-primary-main uppercase">Registry</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-primary-main mb-2">Property Records</h1>
            <p className="text-textPrimary/60 font-medium">Browse records as cards or view their geographic distribution on the map.</p>
          </div>

          <div className="flex gap-3 items-center">
            {/* View Toggle */}
            <div className="flex bg-white border border-black/5 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-primary-main text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <LayoutGrid className="w-4 h-4" /> Grid
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-primary-main text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <MapIcon className="w-4 h-4" /> Map View
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by Survey No or Location..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-black/5 rounded-xl shadow-sm focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* PHASE 2: Map View */}
        {viewMode === 'map' ? (
          <div className="mb-16">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-sm mb-4 flex items-center gap-4">
              <MapPin className="w-4 h-4 text-accent-teal" />
              <p className="text-sm font-medium text-gray-600">
                Showing <span className="font-bold text-primary-main">{filteredProperties.length}</span> registered parcels on the national grid. Click any pin for details.
              </p>
              <div className="ml-auto flex gap-4 text-xs">
                {Object.entries(statusColor).map(([status, color]) => (
                  <span key={status} className="flex items-center gap-1.5 font-bold" style={{ color }}>
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: color }}></span>
                    {status}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/5 shadow-xl relative z-0">
              <RegistryClusterMap properties={filteredProperties} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProperties.map((prop, idx) => (
               <PropertyCard key={idx} property={prop} />
            ))}
          </div>
        )}

        {/* LEDGER Section */}
        <div className="mb-10 mt-4">
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
