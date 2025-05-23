// Box.tsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

import { useGuiControls } from '@/hooks/use-gui-controls';

export function Box() {
  const meshRef = useRef<Mesh>(null);
  const params = useRef({ speed: 0.01, color: '#8AC8AC' }).current;

  useGuiControls('Box Controls', params, [
    { property: 'speed', type: 'number', options: { min: 0, max: 0.2, step: 0.001 } },
    { property: 'color', type: 'color' },
  ]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += params.speed;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
}
