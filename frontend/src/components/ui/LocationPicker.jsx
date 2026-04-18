// LocationPicker.jsx
// Interactive map where users click to drop a pin at the exact plot location.
// Uses Nominatim (OpenStreetMap) for free address search — no API key needed.
import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, Crosshair, Navigation } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom branded pin HTML
const makePinIcon = () => L.divIcon({
  className: '',
  html: `<div style="
    width:28px;height:28px;border-radius:50% 50% 50% 0;
    background:#E8900A;border:3px solid white;
    transform:rotate(-45deg);
    box-shadow:0 3px 10px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
});

const LocationPicker = ({ onLocationConfirmed }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [pickedAddress, setPickedAddress] = useState('');
  const [pickedCoords, setPickedCoords] = useState(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    // Default center: India
    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Attribution (required by OSM)
    L.control.attribution({ prefix: false })
      .addAttribution('© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>')
      .addTo(map);

    // Zoom hint label
    const hintDiv = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div');
        div.innerHTML = `<div style="background:white;padding:6px 10px;border-radius:8px;font-size:11px;font-family:sans-serif;font-weight:600;color:#1C3A3A;box-shadow:0 2px 8px rgba(0,0,0,0.15)">
          📍 Click anywhere on the map to drop the plot pin
        </div>`;
        return div;
      }
    });
    new hintDiv({ position: 'topright' }).addTo(map);

    // Click to place/move marker
    map.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      placeMarker(map, lat, lng);

      // Reverse geocode to get address from coordinates (Nominatim)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        setPickedAddress(address);
      } catch {
        setPickedAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const placeMarker = (map, lat, lng) => {
    if (markerRef.current) markerRef.current.remove();
    const marker = L.marker([lat, lng], { icon: makePinIcon(), draggable: true }).addTo(map);
    
    // Allow dragging to fine-tune
    marker.on('dragend', async (e) => {
      const pos = e.target.getLatLng();
      setPickedCoords([pos.lat, pos.lng]);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${pos.lat}&lon=${pos.lng}&format=json`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        setPickedAddress(data.display_name || `${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`);
      } catch {
        setPickedAddress(`${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`);
      }
    });

    markerRef.current = marker;
    setPickedCoords([lat, lng]);
    map.panTo([lat, lng]);
  };

  // Address search using Nominatim
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapInstanceRef.current) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const results = await res.json();
      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lon);
        mapInstanceRef.current.setView([parsedLat, parsedLng], 15);
        placeMarker(mapInstanceRef.current, parsedLat, parsedLng);
        setPickedAddress(display_name);
      }
    } catch (err) {
      console.error('Geocoding error:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleConfirm = () => {
    if (!pickedCoords) return;
    onLocationConfirmed({
      coords: pickedCoords,
      address: pickedAddress,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Address Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plot location (e.g. 'Survey 142, Belagavi')"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={searching}
          className="px-4 py-2.5 bg-primary-main text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-60"
        >
          {searching ? '...' : 'Go'}
        </button>
      </form>

      {/* Instruction */}
      <p className="text-xs text-gray-500 flex items-center gap-1.5">
        <Crosshair className="w-3.5 h-3.5 text-accent-orange flex-shrink-0" />
        Search for the area, then <strong>click the exact plot</strong> to drop the orange pin. You can drag it to fine-tune.
      </p>

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full h-64 rounded-xl border border-black/10 shadow-sm z-0 relative overflow-hidden"
      />

      {/* Picked location info + confirm */}
      {pickedCoords && (
        <div className="bg-accent-teal/5 border border-accent-teal/20 rounded-xl p-3 flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <Crosshair className="w-3.5 h-3.5 text-accent-teal shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-mono text-primary-main font-bold">
                {pickedCoords[0].toFixed(6)}°N, {pickedCoords[1].toFixed(6)}°E
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{pickedAddress}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent-teal text-white text-sm font-bold rounded-xl hover:bg-accent-teal/80 transition-all active:scale-95"
          >
            <Navigation className="w-4 h-4" />
            Confirm Exact Plot Location
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
