import React from "react";

type LegendItem = {
  color: string;
  label: "AWS" | "Azure" | "GCP";
};

const legendItems: LegendItem[] = [
  { color: "orange", label: "AWS" },
  { color: "blue", label: "Azure" },
  { color: "green", label: "GCP" },
];

const Legend: React.FC = () => {
  return (
    <div className="absolute bottom-4 left-4 bg-white p-4 text-black rounded shadow-md z-10">
      <h2 className="font-bold mb-2">Legend</h2>
      <ul>
        {legendItems.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full inline-block"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
