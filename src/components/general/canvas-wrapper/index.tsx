import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { useFullscreen } from '@/hooks/use-full-screen';

const CanvasWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useFullscreen<HTMLDivElement>();
  const isDebug = window.location.hash.includes('debug');

  return (
    <div
      ref={containerRef}
      className="w-full h-full border-8 border-r-4 border-slate-900 shadow-2xl transform -translate-y-2"
    >
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{
          fov: 75,
          near: 0.1,
          position: [3, 3, 3],
          // **omit** `aspect` here so R3F updates it on resize
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        {children}
        {isDebug && <Stats />}
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
