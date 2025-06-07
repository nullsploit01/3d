import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide, type Mesh, ShaderMaterial, Uniform } from 'three';

import { useGuiControls } from '@/hooks/use-gui-controls';

const LoadingComponent = () => {
  const meshRef = useRef<Mesh>(null);
  const params = useRef({ speed: 0 }).current;

  const gltf = useGLTF('/models/street_lamp_01_1k.gltf/street_lamp_01_1k.gltf');
  if (gltf.scene) {
    gltf.scene.rotation.set(0, 1, 0);
    gltf.scene.position.y = -20;
    gltf.scene.position.x = -5;
  }

  useGuiControls('Box Controls', params, [
    { property: 'speed', type: 'number', options: { min: 0, max: 0.2, step: 0.001 } },
  ]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += params.speed;
    const material = meshRef.current.material as ShaderMaterial;
    if (material.uniforms?.uTime) {
      material.uniforms.uTime.value += delta;
    }
  });

  return (
    <>
      <ambientLight intensity={20} />
      <primitive object={gltf.scene} scale={7.5} />
    </>
  );
};

export default LoadingComponent;
