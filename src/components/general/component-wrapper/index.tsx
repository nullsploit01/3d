import { useProgress } from '@react-three/drei';
import type { PropsWithChildren } from 'react';

import CanvasWrapper from '@/components/general/canvas-wrapper';
import { Progress } from '@/components/ui/progress';

const ComponentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { progress, active } = useProgress();

  return (
    <div className="w-full grid grid-cols-2 p-8 max-h-full flex-1 overflow-hidden">
      <div className="col-span-2 h-full">
        {active ? (
          <div className="w-full h-full flex items-center justify-center">
            <Progress value={progress} />
          </div>
        ) : (
          <CanvasWrapper>{children}</CanvasWrapper>
        )}
      </div>
    </div>
  );
};

export default ComponentWrapper;
