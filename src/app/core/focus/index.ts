import {Provider} from '@angular/core';
import {FocusEngine} from './focus-engine';
import {FocusEngineService} from './focus-engine.service';

export function provideFocusEngine(): Provider {
  return {
    provide: FocusEngine,
    useClass: FocusEngineService
  }
}
