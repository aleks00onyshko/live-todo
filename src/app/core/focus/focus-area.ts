import {FocusEngine} from './focus-engine';
import {Signal} from '@angular/core';

export interface FocusAreaDirectiveConfig {
  areaId: string;
  connectedIds: string[];
}

export abstract class FocusArea {
  abstract focusEngine: FocusEngine;

  abstract id: string;
  abstract isActive: Signal<boolean>;

  abstract focus(): void;

  abstract initialize(config: FocusAreaDirectiveConfig): void;

  abstract destroy(): void;
}
