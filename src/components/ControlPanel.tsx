import React, { useState } from "react";

type Props = {
  selectedExchange: string;
  setSelectedExchange: (val: string) => void;
  selectedProvider: string;
  setSelectedProvider: (val: string) => void;
  selectedLatencyRange: string;
  setSelectedLatencyRange: (val: string) => void;
  showRealTime: boolean;
  setShowRealTime: (val: boolean) => void;
};

const ControlPanel: React.FC<Props> = ({
  selectedExchange,
  setSelectedExchange,
  selectedProvider,
  setSelectedProvider,
  selectedLatencyRange,
  setSelectedLatencyRange,
  showRealTime,
  setShowRealTime,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-16 right-4 z-50">
      <div className="bg-white rounded shadow text-black w-64">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full px-4 py-2 text-left font-semibold bg-gray-200 hover:bg-gray-300 rounded-t"
        >
          ⚙️ Filter Options
        </button>

        {open && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block font-semibold">Exchange</label>
              <select
                className="w-full p-1 border rounded"
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value)}
              >
                <option value="">All</option>
                <option value="Binance">Binance</option>
                <option value="OKX">OKX</option>
                <option value="Bybit">Bybit</option>
                <option value="Deribit">Deribit</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Cloud Provider</label>
              <select
                className="w-full p-1 border rounded"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                <option value="">All</option>
                <option value="AWS">AWS</option>
                <option value="GCP">GCP</option>
                <option value="Azure">Azure</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Latency Range</label>
              <select
                className="w-full p-1 border rounded"
                value={selectedLatencyRange}
                onChange={(e) => setSelectedLatencyRange(e.target.value)}
              >
                <option value="">All</option>
                <option value="low">Low (&lt;20ms)</option>
                <option value="medium">Medium (21–40ms)</option>
                <option value="high">High (&gt;150ms)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showRealTime}
                onChange={(e) => setShowRealTime(e.target.checked)}
              />
              <label>Real-time Mode</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
