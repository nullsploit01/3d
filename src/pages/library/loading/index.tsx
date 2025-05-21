import CanvasWrapper from '@/components/general/canvas-wrapper';

const Loading = () => {
  return (
    <div className="w-full flex justify-center ml-5 mt-5">
      <div className="w-[800px] h-[450px]">
        <CanvasWrapper>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshNormalMaterial />
          </mesh>
        </CanvasWrapper>
      </div>
    </div>
  );
};

export default Loading;
