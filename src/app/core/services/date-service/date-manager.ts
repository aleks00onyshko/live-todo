import {DateId} from '../../date-id';
import {DayLabel} from '../../../components/day-select-list/day-label';

export abstract class DateManager {
  abstract getCurrentDate(): Date;
  abstract getCurrentDateId(): DateId;
  abstract getDayName(date: Date): string;
  abstract getMonthNumber(date: Date): string;
  abstract getDayNumber(date: Date): number;
  abstract getYear(date: Date): number;
  abstract addDaysToDate(date: Date, days: number): Date;
  abstract getCurrentStartTimeTuple(): [number, number]
  abstract dateToDayLabel(date: Date): DayLabel;
}
