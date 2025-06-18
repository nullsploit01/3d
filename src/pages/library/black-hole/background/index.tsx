import { useMemo } from 'react';
import { AdditiveBlending, BufferAttribute } from 'three';

const BlackHoleBackground = () => {
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
    return createStars(1500, 1500);
  }, []);

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars.bufferAttribute.array, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={1}
          sizeAttenuation={true}
          depthTest={false}
          opacity={0.5}
          color="#ffffff"
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default BlackHoleBackground;
