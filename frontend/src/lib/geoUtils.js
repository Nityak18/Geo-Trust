// Shared geographic utilities for Geo-Trust
// Maps location strings → exact [lat, lng] coordinates

export const LOCATION_COORDS = {
  'belagavi': [15.8497, 74.4977],
  'hubli': [15.3647, 75.1240],
  'dharwad': [15.4589, 75.0078],
  'bangalore': [12.9716, 77.5946],
  'bengaluru': [12.9716, 77.5946],
  'mysuru': [12.2958, 76.6394],
  'mysore': [12.2958, 76.6394],
  'karnataka': [15.3173, 75.7139],
  'pune': [18.5204, 73.8567],
  'mumbai': [19.0760, 72.8777],
  'nagpur': [21.1458, 79.0882],
  'nashik': [19.9975, 73.7898],
  'maharashtra': [19.7515, 75.7139],
  'jaipur': [26.9124, 75.7873],
  'jodhpur': [26.2389, 73.0243],
  'udaipur': [24.5854, 73.7125],
  'rajasthan': [27.0238, 74.2179],
  'hyderabad': [17.3850, 78.4867],
  'warangal': [17.9689, 79.5941],
  'telangana': [18.1124, 79.0193],
  'chennai': [13.0827, 80.2707],
  'coimbatore': [11.0168, 76.9558],
  'madurai': [9.9252, 78.1198],
  'tamil nadu': [11.1271, 78.6569],
  'delhi': [28.7041, 77.1025],
  'new delhi': [28.6139, 77.2090],
  'ncr': [28.7041, 77.1025],
  'kolkata': [22.5726, 88.3639],
  'howrah': [22.5958, 88.2636],
  'west bengal': [22.9868, 87.8550],
  'ahmedabad': [23.0225, 72.5714],
  'surat': [21.1702, 72.8311],
  'vadodara': [22.3072, 73.1812],
  'gujarat': [22.2587, 71.1924],
  'lucknow': [26.8467, 80.9462],
  'agra': [27.1767, 78.0081],
  'varanasi': [25.3176, 82.9739],
  'uttar pradesh': [26.8467, 80.9462],
  'bhopal': [23.2599, 77.4126],
  'indore': [22.7196, 75.8577],
  'madhya pradesh': [22.9734, 78.6569],
  'patna': [25.5941, 85.1376],
  'bihar': [25.0961, 85.3131],
  'chandigarh': [30.7333, 76.7794],
  'amritsar': [31.6340, 74.8723],
  'punjab': [31.1471, 75.3412],
  'kochi': [9.9312, 76.2673],
  'thiruvananthapuram': [8.5241, 76.9366],
  'kerala': [10.8505, 76.2711],
};

/**
 * Resolves a location string to [lat, lng] coordinates.
 * Returns center of India as fallback.
 */
export const getCoordinates = (location = '') => {
  if (!location) return [20.5937, 78.9629];
  const lower = location.toLowerCase();
  for (const [key, coords] of Object.entries(LOCATION_COORDS)) {
    if (lower.includes(key)) return coords;
  }
  return [20.5937, 78.9629]; // Fallback: center of India
};

/**
 * Generates a Google Maps navigation URL (works on mobile & desktop).
 * On mobile, this will open the Google Maps app directly.
 */
export const getGoogleMapsUrl = (lat, lng, label = '') => {
  const encoded = encodeURIComponent(label || `${lat},${lng}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_name=${encoded}`;
};

/**
 * Short label from coordinates for display in UI.
 */
export const formatCoords = (lat, lng) => {
  return `${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E`;
};
