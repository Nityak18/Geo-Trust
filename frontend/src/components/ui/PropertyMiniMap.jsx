import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getCoordinates } from '../../lib/geoUtils';

// Fix leaflet's default icon path issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const PropertyMiniMap = ({ location, coords, zoom = 11, height = 'h-32', interactive = false, onCoordsResolved }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Prefer exact stored coords if passed; only fall back to city lookup
    const resolvedCoords = coords || getCoordinates(location);

    // Fire back resolved coordinates so parent can build Google Maps link
    if (onCoordsResolved) onCoordsResolved(resolvedCoords);

    const map = L.map(mapRef.current, {
      center: resolvedCoords,
      zoom: zoom,
      dragging: interactive,
      scrollWheelZoom: false,
      zoomControl: interactive,
      attributionControl: false,
      doubleClickZoom: interactive,
      touchZoom: interactive,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

    // Custom branded marker
    const markerColor = '#2A7A6F';
    const icon = L.divIcon({
      className: '',
      html: `<div style="
        width:26px;height:26px;border-radius:50% 50% 50% 0;
        background:${markerColor};border:3px solid white;
        transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.35);
      "></div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 26],
    });

    L.marker(resolvedCoords, { icon })
      .addTo(map)
      .bindPopup(`<b style="font-family:sans-serif;color:#1C3A3A">${location || 'Property Location'}</b>`)
      .openPopup();

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location, coords, zoom, interactive]);

  return (
    <div ref={mapRef} className={`w-full ${height} rounded-xl overflow-hidden z-0`} />
  );
};

export default PropertyMiniMap;
