"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { arcsData } from "../data/arcs";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

export default function GlobeScene() {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current) {
        // Access orbit controls safely
        const controls = globeRef.current.controls();
        if (controls) {
          controls.enableZoom = true;
          controls.enablePan = true;
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.0;
        }
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        arcsData={arcsData}
        arcColor={"color"}
        arcStroke={1.5}
        arcAltitude={0.2}
        arcDashLength={0.4}
        arcDashGap={2}
        arcDashInitialGap={() => Math.random() * 5}
        arcDashAnimateTime={1000}
        autoRotate={true}
        autoRotateSpeed={1.0}
        initialAltitude={2.5}
      />
    </div>
  );
}
