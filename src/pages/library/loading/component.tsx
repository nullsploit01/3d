import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Color, DoubleSide, Mesh, ShaderMaterial, Uniform, Vector3 } from 'three';

import { useGuiControls } from '@/hooks/use-gui-controls';

const LoadingComponent = () => {
  const params = useRef({
    speed: 0.2,
    lightColor: '#FF8C00',
    lightPosition: new Vector3(0, 2.5, 0),
  }).current;
  useGuiControls('Box Controls', params, [{ property: 'lightColor', type: 'color' }]);
  const { viewport } = useThree();

  const torusKnotGeometryRef = useRef<Mesh>(null);
  const icosahedronGeometryRef = useRef<Mesh>(null);
  const tetrahedronGeometryRef = useRef<Mesh>(null);

  const lightModel = useGLTF(
    '/models/lights/modern_ceiling_lamp_01_2k.gltf/modern_ceiling_lamp_01_2k.gltf',
  );

  const lightShaderMaterial = new ShaderMaterial({
    uniforms: {
      uLightColor: new Uniform(new Color(params.lightColor)),
      uLightPosition: new Uniform(params.lightPosition),
    },
    side: DoubleSide,
    fragmentShader,
    vertexShader,
  });

  useFrame(({ pointer, clock }) => {
    if (lightShaderMaterial.uniforms.uLightColor) {
      lightShaderMaterial.uniforms.uLightColor.value = new Color(params.lightColor);
    }

    if (torusKnotGeometryRef.current) {
      torusKnotGeometryRef.current.rotation.y = clock.getElapsedTime() * params.speed;
    }

    if (icosahedronGeometryRef.current) {
      icosahedronGeometryRef.current.rotation.x = clock.getElapsedTime() * params.speed;
    }

    if (tetrahedronGeometryRef.current) {
      tetrahedronGeometryRef.current.rotation.z = clock.getElapsedTime() * params.speed;
    }

    if (lightModel.scene) {
      lightModel.scene.traverse((child: any) => {
        if (child.isMesh) {
          const mesh = child;
          if (mesh.material && 'color' in mesh.material) {
            mesh.material.color = new Color(params.lightColor);
            const x = (pointer.x * viewport.width) / 2;
            const y = (pointer.y * viewport.height) / 2;
            mesh.position.x = (x % viewport.width) * 0.2;
            mesh.position.z = (y % viewport.height) * 0.2;

            params.lightPosition.set(mesh.position.x, mesh.position.y, mesh.position.z);
          }
        }
      });
    }
  });

  return (
    <>
      <mesh position={params.lightPosition}>
        <primitive object={lightModel.scene} scale={2.5} />
        <ambientLight intensity={1} />
      </mesh>
      <group>
        <mesh ref={icosahedronGeometryRef} position={[3, 0, 0]} material={lightShaderMaterial}>
          <icosahedronGeometry args={[1, 0]} />
        </mesh>
        <mesh ref={torusKnotGeometryRef} position={[0, 0, 0]} material={lightShaderMaterial}>
          <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
        </mesh>
        <mesh ref={tetrahedronGeometryRef} position={[-3, 0, 0]} material={lightShaderMaterial}>
          <tetrahedronGeometry args={[1, 0]} />
        </mesh>
      </group>
    </>
  );
};

export default LoadingComponent;
