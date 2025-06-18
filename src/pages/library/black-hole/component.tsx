import BlackHoleBackground from './background';

const BlackHoleComponent = () => {
  return (
    <group>
      <BlackHoleBackground />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
};

export default BlackHoleComponent;
