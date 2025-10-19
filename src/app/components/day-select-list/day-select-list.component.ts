import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input, output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DayLabel } from './day-label';
import { DaySelectListService } from './day-select-list.service';
import {DateId} from '../../core/date-id';

@Component({
  selector: 'app-day-select-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './day-select-list.component.html',
  styleUrls: ['./day-select-list.component.scss'],
  providers: [DaySelectListService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaySelectListComponent {
  #daySelectListService = inject(DaySelectListService, { self: true });

  public currentDateId = input.required<DateId>();

  protected daySelected = output<DateId>();

  public readonly dayLabelBatches: DayLabel[][] = this.#daySelectListService.splitDayLabelsIntoBatches(
    this.#daySelectListService.generateDaysList()
  );
}
