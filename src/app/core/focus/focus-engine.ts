import {Signal} from '@angular/core';
import {FocusArea} from './focus-area';

export interface FocusedGraphPart {
  originArea: FocusArea;
  connections: Set<FocusArea>;
}

export abstract class FocusEngine {
  abstract readonly focusedGraphPart: Signal<FocusedGraphPart | undefined>;

  abstract isActive(area: FocusArea): boolean;

  abstract register(areaId: string, area: FocusArea, connectedIds?: string[]): void;

  abstract unregister(areaId: string): void;

  abstract link(area: FocusArea, areaB: FocusArea): void;

  abstract unlink(area: FocusArea, areaB: FocusArea): void;

  abstract activate(focusedArea: FocusArea): void;
}
