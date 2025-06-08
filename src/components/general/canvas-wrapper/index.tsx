import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import GUI from 'lil-gui';
import React, { createContext, useEffect, useRef, useState } from 'react';

export const GuiContext = createContext<GUI | null>(null);

const CanvasWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [gui, setGui] = useState<GUI | null>(null);

  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const guiInstance = new GUI({ autoPlace: false });
    setGui(guiInstance);

    const dom = guiInstance.domElement;
    dom.style.position = 'absolute';
    dom.style.top = '8px';
    dom.style.right = '8px';
    dom.style.zIndex = '100';
    container.appendChild(dom);

    return () => {
      guiInstance.destroy();
    };
  }, []);

  return (
    <GuiContext.Provider value={gui}>
      <div
        ref={wrapperRef}
        className="
          relative           
          overflow-visible    
          w-full h-full       
          border-8 border-r-4 border-slate-900
          shadow-2xl transform -translate-y-2
        "
      >
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ fov: 75, near: 0.1, position: [0, 0, 7] }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          {children}
          <OrbitControls enableDamping />
        </Canvas>
      </div>
    </GuiContext.Provider>
  );
};

export default CanvasWrapper;
