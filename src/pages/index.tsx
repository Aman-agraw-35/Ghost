import dynamic from 'next/dynamic';

const GlobeScene = dynamic(() => import('@/components/GlobeScene'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <GlobeScene />
    </main>
  );
}
