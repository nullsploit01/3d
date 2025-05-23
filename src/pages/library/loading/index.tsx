// Loading.tsx
import { Box } from './box';

import CanvasWrapper from '@/components/general/canvas-wrapper';

const Loading = () => {
  return (
    <div className="w-full flex justify-center ml-5 mt-5">
      <div className="w-[800px] h-[450px]">
        {/* Now Box is deep inside CanvasWrapper, so it sees the GUI context */}
        <CanvasWrapper>
          <Box />
        </CanvasWrapper>
      </div>
    </div>
  );
};

export default Loading;
