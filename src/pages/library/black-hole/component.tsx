import BlackHoleBackground from './background';
import accretionDiskFragmentShader from './shaders/accretion-disk/fragment.glsl';
import accretionDiskVertexShader from './shaders/accretion-disk/vertex.glsl';
import shadowFragmentShader from './shaders/shadow/fragment.glsl';
import shadowVertexShader from './shaders/shadow/vertex.glsl';
import { DoubleSide } from 'three';

const BlackHoleComponent = () => {
  return (
    <group position-y={-1} rotation-y={3}>
      <BlackHoleBackground />
      // accretion disk
      <mesh rotation-x={-Math.PI / 2}>
        <ringGeometry args={[3, 4, 64, 10]} />
        <shaderMaterial
          vertexShader={accretionDiskVertexShader}
          fragmentShader={accretionDiskFragmentShader}
          side={DoubleSide}
        />
      </mesh>
      // shadow
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <shaderMaterial
          vertexShader={shadowVertexShader}
          fragmentShader={shadowFragmentShader}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default BlackHoleComponent;
