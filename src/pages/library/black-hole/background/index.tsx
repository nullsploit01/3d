import starFragmentShader from './shaders/fragment.glsl';
import starVertexShader from './shaders/vertex.glsl';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, BufferAttribute, ShaderMaterial } from 'three';

const BlackHoleBackground = () => {
  const materialsRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialsRef.current) {
      materialsRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const createStars = (count: number, distance: number) => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const twinkleFactors = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * distance;
      positions[i3 + 1] = (Math.random() - 0.5) * distance;
      positions[i3 + 2] = (Math.random() - 0.5) * distance;

      scales[i] = Math.random();
      phases[i] = Math.random() * Math.PI * 2;
      twinkleFactors[i] = 0.5 + Math.random();
    }

    return {
      bufferAttribute: new BufferAttribute(positions, 3),
      scalesAttribute: new BufferAttribute(scales, 1),
      phasesAttribute: new BufferAttribute(phases, 1),
      twinkleFactorsAttribute: new BufferAttribute(twinkleFactors, 1),
    };
  };

  const stars = useMemo(() => {
    return createStars(5500, 150);
  }, []);

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars.bufferAttribute.array, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[stars.scalesAttribute.array, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[stars.phasesAttribute.array, 1]} />
          <bufferAttribute
            attach="attributes-aTwinkleFactor"
            args={[stars.twinkleFactorsAttribute.array, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialsRef}
          fragmentShader={starFragmentShader}
          vertexShader={starVertexShader}
          uniforms={{
            uSize: { value: 20 * Math.min(window.devicePixelRatio, 2) },
            uTime: { value: 0 },
          }}
          transparent
          opacity={0.5}
          depthTest={false}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default BlackHoleBackground;
