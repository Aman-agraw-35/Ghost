// src/components/GlobeScene.tsx
'use client';
import Legend from "./Legend";
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { GlobeMethods } from 'react-globe.gl';
import { Loader } from './Loader';

const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => <Loader />,
});

const markers = [
  // AWS
  { lat: 47.6062, lng: -122.3321, label: "AWS - Seattle", provider: "aws" },
  { lat: 52.3791, lng: 4.9003, label: "AWS - Amsterdam", provider: "aws" },
  { lat: -33.8688, lng: 151.2093, label: "AWS - Sydney", provider: "aws" },
  { lat: 1.3521, lng: 103.8198, label: "AWS - Singapore", provider: "aws" },
  { lat: 19.0760, lng: 72.8777, label: "AWS - Mumbai", provider: "aws" },

  // Azure
  { lat: 40.7128, lng: -74.0060, label: "Azure - New York", provider: "azure" },
  { lat: 35.6895, lng: 139.6917, label: "Azure - Tokyo", provider: "azure" },
  { lat: 48.8566, lng: 2.3522, label: "Azure - Paris", provider: "azure" },
  { lat: -23.5505, lng: -46.6333, label: "Azure - São Paulo", provider: "azure" },
  { lat: 55.7558, lng: 37.6173, label: "Azure - Moscow", provider: "azure" },

  // GCP
  { lat: 37.7749, lng: -122.4194, label: "GCP - San Francisco", provider: "gcp" },
  { lat: 51.5074, lng: -0.1278, label: "GCP - London", provider: "gcp" },
  { lat: -34.6037, lng: -58.3816, label: "GCP - Buenos Aires", provider: "gcp" },
  { lat: 31.2304, lng: 121.4737, label: "GCP - Shanghai", provider: "gcp" },
  { lat: 28.6139, lng: 77.2090, label: "GCP - Delhi", provider: "gcp" },
];


const GlobeScene = () => {
  const globeRef = useRef<GlobeMethods | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current?.pointOfView) {
        globeRef.current.pointOfView({ lat: 20, lng: 80, altitude: 2 }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getPointColor = (d: any) => {
    switch (d.provider) {
      case "aws":
        return "#FF9900"; // AWS orange
      case "azure":
        return "#007FFF"; // Azure blue
      case "gcp":
        return "#34A853"; // GCP green
      default:
        return "gray";
    }
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 z-0">
      <Legend />
      <Globe
        ref={globeRef as any}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.1}
        width={dimensions.width}
        height={dimensions.height}
        pointsData={markers}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointLabel={(d) => d.label}
        pointColor={getPointColor}
        pointAltitude={0.01}
        pointRadius={0.4}
      />
    </div>
  );
};

export default GlobeScene;
