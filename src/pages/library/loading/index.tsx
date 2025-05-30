import LoadingComponent from './component';

import CanvasWrapper from '@/components/general/canvas-wrapper';

const Loading = () => {
  return (
    <div className="w-full grid grid-cols-2 p-8 max-h-full flex-1 overflow-hidden">
      <div className="col-span-2 h-full">
        <CanvasWrapper>
          <LoadingComponent />
        </CanvasWrapper>
      </div>
    </div>
  );
};

export default Loading;
