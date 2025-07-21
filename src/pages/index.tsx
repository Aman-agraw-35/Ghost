import Header from '@/components/Header';
import GlobeScene from '@/components/GlobeScene';
import LatencyChart from '@/components/LatencyChart';

export default function Home() {
  return (
    <main className="w-screen min-h-screen bg-black text-white overflow-y-auto flex flex-col">
      <Header />
  

      {/* Globe Section */}
      <section className="w-full h-screen">
        <GlobeScene />
      </section>
          {/* Latency Chart Section */}
      <section className="w-full h-screen z-5 bg-[#111] border-t border-gray-700 p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Global Latency (Last 4 Days)</h2>
        <LatencyChart />
      </section>
    </main>
  );
}