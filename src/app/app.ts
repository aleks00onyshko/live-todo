import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodoCreateInput} from './components/todo-create-input/todo-create-input';
import {DaySelectListComponent} from './components/day-select-list/day-select-list.component';
import {DateId} from './core/date-id';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [TodoCreateInput, DaySelectListComponent]
})
export class App {
  protected readonly currentDateId = signal<DateId>('19-10-2025');
}
