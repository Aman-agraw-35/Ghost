import Header from '@/components/Header';
import GlobeScene from '@/components/GlobeScene';

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col">
      <Header />
      <div className="flex-1">
        <GlobeScene />
      </div>
    </main>
  );
}
