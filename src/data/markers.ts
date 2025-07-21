
export type CloudProvider = 'aws' | 'azure' | 'gcp';

export interface Marker {
  lat: number;
  lng: number;
  label: string;
  provider: CloudProvider;
}

const markers: Marker[] = [
  // AWS
  { lat: 47.6062, lng: -122.3321, label: 'AWS - Seattle', provider: 'aws' },
  { lat: 52.3791, lng: 4.9003, label: 'AWS - Amsterdam', provider: 'aws' },
  { lat: -33.8688, lng: 151.2093, label: 'AWS - Sydney', provider: 'aws' },
  { lat: 1.3521, lng: 103.8198, label: 'AWS - Singapore', provider: 'aws' },
  { lat: 19.076, lng: 72.8777, label: 'AWS - Mumbai', provider: 'aws' },

  // Azure
  { lat: 40.7128, lng: -74.006, label: 'Azure - New York', provider: 'azure' },
  { lat: 35.6895, lng: 139.6917, label: 'Azure - Tokyo', provider: 'azure' },
  { lat: 48.8566, lng: 2.3522, label: 'Azure - Paris', provider: 'azure' },
  { lat: -23.5505, lng: -46.6333, label: 'Azure - São Paulo', provider: 'azure' },
  { lat: 55.7558, lng: 37.6173, label: 'Azure - Moscow', provider: 'azure' },

  // GCP
  { lat: 37.7749, lng: -122.4194, label: 'GCP - San Francisco', provider: 'gcp' },
  { lat: 51.5074, lng: -0.1278, label: 'GCP - London', provider: 'gcp' },
  { lat: -34.6037, lng: -58.3816, label: 'GCP - Buenos Aires', provider: 'gcp' },
  { lat: 31.2304, lng: 121.4737, label: 'GCP - Shanghai', provider: 'gcp' },
  { lat: 28.6139, lng: 77.209, label: 'GCP - Delhi', provider: 'gcp' },
];

export default markers;
