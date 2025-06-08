import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
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

  // useEffect(() => {
  //   gltf.scene.traverse((child: any) => {
  //     if (child.isMesh) {
  //       child.material = new ShaderMaterial({
  //         vertexShader,
  //         fragmentShader,
  //         uniforms: {
  //           uColor: new Uniform([1.0, 0, 10.0]),
  //         },
  //         side: DoubleSide,
  //       });
  //     }
  //   });
  // }, [gltf.scene]);

  return (
    <>
      <mesh ref={meshRef} position={[0, 2.5, 0]}>
        <icosahedronGeometry args={[0.1, 2]} />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          side={DoubleSide}
          uniforms={{ uColor: new Uniform([10, 1, 1]) }}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          side={DoubleSide}
          uniforms={{ uColor: new Uniform([10, 1, 1]) }}
        />
      </mesh>
      <mesh position={[-3, 0, 0]}>
        <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          side={DoubleSide}
          uniforms={{ uColor: new Uniform([10, 1, 1]) }}
        />
      </mesh>
      {/* <primitive object={gltf.scene} scale={7.5} /> */}
      {/* <ambientLight intensity={10} /> */}
    </>
  );
};

export default LoadingComponent;
