import moment from 'moment';
import { DateManager } from './date-manager';
import { DateId } from '../../date-id';
import { Injectable } from '@angular/core';
import {DayLabel, DayLabelConfig} from '../../../components/day-select-list/day-label';

@Injectable()
export class DateService implements DateManager {
  public getCurrentDate(): Date {
    return moment().toDate();
  }

  public getCurrentDateId(): DateId {
    const today = this.getCurrentDate();
    const dayNumber = this.getDayNumber(today);
    const monthNumber = this.getMonthNumber(today);
    const year = this.getYear(today);

    return `${dayNumber}-${monthNumber}-${year}` as DateId;
  }

  public addDaysToDate(date: Date, days: number): Date {
    return moment(date).add(days, 'days').toDate();
  }

  public getDayName(date: Date): string {
    return moment(date).format('ddd');
  }

  public getMonthNumber(date: Date): string {
    return moment(date).format('MM');
  }

  public getDayNumber(date: Date): number {
    return moment(date).date();
  }

  public getYear(date: Date): number {
    return moment(date).year();
  }

  public getCurrentStartTimeTuple(): [number, number] {
    return [moment().hour(), moment().minute()];
  }

  public dateToDayLabel(date: Date): DayLabel {
    return new DayLabel(this.dateToDayLabelConfig(date));
  }

  private dateToDayLabelConfig(date: Date): DayLabelConfig {
    return {
      dayNumber: this.getDayNumber(date),
      dayName: this.getDayName(date),
      monthNumber: this.getMonthNumber(date),
      year: this.getYear(date),
    }
  }
}
