import {DateId} from '../../core/date-id';

export class DayLabel {
  public readonly id: DateId;
  public readonly year: number;
  public readonly dayName: string;
  public readonly monthNumber: string;
  public readonly dayNumber: number;

  constructor(
    { dayName, dayNumber, monthNumber, year }: DayLabelConfig,
  ) {
    this.dayName = dayName;
    this.monthNumber = monthNumber;
    this.dayNumber = dayNumber;
    this.year = year;
    this.id = `${this.dayNumber}-${this.monthNumber}-${this.year}` as DateId;
  }
}

export type DayLabelConfig = Pick<DayLabel, 'dayName' | 'monthNumber' | 'dayNumber' | 'year'>;
