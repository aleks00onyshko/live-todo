import {Component, signal} from '@angular/core';
import {DaySelectListComponent} from '../../shared/components/day-select-list/day-select-list.component';
import {TodoCreateInput} from './components/todo-create-input/todo-create-input';
import {DateId} from '../../core/date-id';
import {TodosStore} from './store/todos.store';

@Component({
  selector: 'app-todos',
  imports: [DaySelectListComponent, TodoCreateInput],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
  providers: [TodosStore]
})
export class Todos {
  protected readonly currentDateId = signal<DateId>('19-10-2025');
}
