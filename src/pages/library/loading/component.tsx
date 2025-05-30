import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide, type Mesh } from 'three';

import { useGuiControls } from '@/hooks/use-gui-controls';

const LoadingComponent = () => {
  const meshRef = useRef<Mesh>(null);
  const params = useRef({ speed: 0 }).current;

  useGuiControls('Box Controls', params, [
    { property: 'speed', type: 'number', options: { min: 0, max: 0.2, step: 0.001 } },
  ]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += params.speed;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        side={DoubleSide}
      />
      <ambientLight intensity={2} />
    </mesh>
  );
};

export default LoadingComponent;
