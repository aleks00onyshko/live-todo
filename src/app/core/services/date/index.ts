import {Provider} from '@angular/core';
import {DateManager} from './date-manager';
import {DateService} from './date.service';

export function provideDateManager(): Provider {
  return {
    provide: DateManager,
    useClass: DateService
  }
}
