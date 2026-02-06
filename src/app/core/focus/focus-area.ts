import {FocusEngine} from './focus-engine';
import {Signal} from '@angular/core';

export interface FocusAreaConfig {
  areaId: string;
  connectedIds: string[];
}

export abstract class FocusArea {
  abstract focusEngine: FocusEngine;

  abstract id: string;
  abstract isActive: Signal<boolean>;

  abstract focus(): void;

  abstract initialize(config: FocusAreaConfig): void;

  abstract destroy(): void;
}
