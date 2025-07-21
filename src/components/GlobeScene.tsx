"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { GlobeMethods } from "react-globe.gl";
import Legend from "./Legend";
import { Loader } from "./Loader";
import markers, { Marker } from "../data/markers";
import ControlPanel from "./ControlPanel";

type ArcData = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  latency: number;
};

export default function GlobeScene() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [latencyArcs, setLatencyArcs] = useState<ArcData[]>([]);
  const [selectedExchange, setSelectedExchange] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedLatencyRange, setSelectedLatencyRange] = useState("");
  const [showRealTime, setShowRealTime] = useState(true);

  useEffect(() => {
    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const Globe = dynamic(() => import("react-globe.gl"), {
    ssr: false,
    loading: () => <Loader />,
  });

  useEffect(() => {
    const fetchLatency = async () => {
      try {
        const res = await fetch("/api/latency");
        const data = await res.json();

        console.log("Fetched Latency Data:", data);

        const serie_0 = data?.serie_0;
        const timestamps = data?.timestamps;

        if (!serie_0 || !serie_0.p50 || !Array.isArray(serie_0.p50)) {
          console.error("Invalid latency data structure:", data);
          return;
        }

        const latencies = serie_0.p50;

        const arcs = latencies.map((value: string, i: number) => {
          const latency = parseFloat(value);
          const color =
            latency < 20
              ? "green"
              : latency < 40
              ? "yellow"
              : latency < 70
              ? "orange"
              : "red";

          const marker = markers[i % markers.length];

          return {
            startLat: 37.7749,
            startLng: -122.4194,
            endLat: marker.lat,
            endLng: marker.lng,
            latency,
            timestamp: timestamps?.[i] ?? null,
            color,
          };
        });

        setLatencyArcs(arcs.slice(-100));
      } catch (err) {
        console.error("Frontend fetch error:", err);
      }
    };

    fetchLatency();
    const interval = setInterval(fetchLatency, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current?.pointOfView) {
        globeRef.current.pointOfView({ lat: 20, lng: 80, altitude: 2 }, 1000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPointColor = (d: object) => {
    const marker = d as Marker;
    switch (marker.provider) {
      case "aws":
        return "#FF9900";
      case "azure":
        return "#007FFF";
      case "gcp":
        return "#34A853";
      default:
        return "gray";
    }
  };

  return (
    <div className="w-full h-full relative top-0 left-0 z-0">
      <ControlPanel
        selectedExchange={selectedExchange}
        setSelectedExchange={setSelectedExchange}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        selectedLatencyRange={selectedLatencyRange}
        setSelectedLatencyRange={setSelectedLatencyRange}
        showRealTime={showRealTime}
        setShowRealTime={setShowRealTime}
      />
      <Legend />
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.1}
        width={dimensions.width}
        height={dimensions.height}
        pointsData={markers}
        pointLat={(d: object) => (d as Marker).lat}
        pointLng={(d: object) => (d as Marker).lng}
        pointLabel={(d: object) => (d as Marker).label}
        pointColor={getPointColor}
        pointAltitude={0.01}
        pointRadius={0.4}
        arcsData={latencyArcs}
        arcStartLat={(d: object) => (d as ArcData).startLat}
        arcStartLng={(d: object) => (d as ArcData).startLng}
        arcEndLat={(d: object) => (d as ArcData).endLat}
        arcEndLng={(d: object) => (d as ArcData).endLng}
        arcColor={(d: object) => (d as ArcData).color}
        arcDashLength={0.3}
        arcDashGap={1}
        arcDashInitialGap={() => Math.random() * 2}
        arcDashAnimateTime={1000}
        arcStroke={1}
        arcAltitude={0.2}
      />
    </div>
  );
}
