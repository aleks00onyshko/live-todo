import {inject, Injectable} from '@angular/core';
import { DayLabel } from './day-label';
import {DateManager} from '../../core/services/date-service/date-manager';

@Injectable()
export class DaySelectListService {
  #dateManager = inject(DateManager)

  public splitDayLabelsIntoBatches(array: DayLabel[], batchSize: number = 7): DayLabel[][] {
    const batches: DayLabel[][] = [];

    for (let i = 0; i < array.length && batches.length < 4; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }

    return batches;
  }

  public generateDaysList(): DayLabel[] {
    const currentDate = this.#dateManager.getCurrentDate();
    const days: DayLabel[] = [];

    const addDays = (numberOfDays: number, startDate: Date, days: DayLabel[]) => {
      for (let i = 0; i < numberOfDays; i++) {
        days.push(this.#dateManager.dateToDayLabel(this.#dateManager.addDaysToDate(startDate, i)));
      }
    };

    addDays(31, currentDate, days);

    return days;
  }
}
