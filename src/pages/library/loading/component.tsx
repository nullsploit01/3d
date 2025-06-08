import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Color, DoubleSide, ShaderMaterial, Uniform } from 'three';

import { useGuiControls } from '@/hooks/use-gui-controls';

const LoadingComponent = () => {
  const params = useRef({ speed: 0, lightColor: '#FF8C00' }).current;
  useGuiControls('Box Controls', params, [{ property: 'lightColor', type: 'color' }]);

  const lightModel = useGLTF(
    '/models/lights/modern_ceiling_lamp_01_2k.gltf/modern_ceiling_lamp_01_2k.gltf',
  );

  const lightShaderMaterial = new ShaderMaterial({
    uniforms: {
      uLightColor: new Uniform(new Color(params.lightColor)),
    },
    side: DoubleSide,
    fragmentShader,
    vertexShader,
  });

  useFrame(() => {
    if (lightShaderMaterial.uniforms.uLightColor) {
      lightShaderMaterial.uniforms.uLightColor.value = new Color(params.lightColor);
    }

    if (lightModel.scene) {
      lightModel.scene.traverse((child: any) => {
        if (child.isMesh) {
          const mesh = child;
          if (mesh.material && 'color' in mesh.material) {
            mesh.material.color = new Color(params.lightColor);
          }
        }
      });
    }
  });

  return (
    <>
      <mesh position={[0, 2.5, 0]}>
        <primitive object={lightModel.scene} scale={2.5} />
        <ambientLight intensity={1} />
      </mesh>
      <group>
        <mesh position={[3, 0, 0]} material={lightShaderMaterial}>
          <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={lightShaderMaterial}>
          <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
        </mesh>
        <mesh position={[-3, 0, 0]} material={lightShaderMaterial}>
          <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
        </mesh>
      </group>
    </>
  );
};

export default LoadingComponent;
