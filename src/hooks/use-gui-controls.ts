import { useContext, useEffect } from 'react';

import { GuiContext } from '@/components/general/canvas-wrapper';

type ControllerDef = {
  property: string;
  type: 'number' | 'color' | 'boolean';
  options?: { min?: number; max?: number; step?: number };
  onChange?: (value: any) => void;
};

export function useGuiControls(
  folderName: string,
  params: Record<string, any>,
  controllers: ControllerDef[],
) {
  const gui = useContext(GuiContext);

  useEffect(() => {
    if (!gui) return;
    const folder = gui.addFolder(folderName);

    controllers.forEach((def) => {
      let ctrl;
      if (def.type === 'color') {
        ctrl = folder.addColor(params, def.property);
      } else if (def.type === 'number') {
        const { min = 0, max = 1, step = 0.01 } = def.options || {};
        ctrl = folder.add(params, def.property, min, max, step);
      } else {
        ctrl = folder.add(params, def.property);
      }
      if (def.onChange) ctrl.onChange(def.onChange);
    });

    folder.open();
    return () => folder.destroy();
  }, [gui, folderName, params, controllers]);
}
