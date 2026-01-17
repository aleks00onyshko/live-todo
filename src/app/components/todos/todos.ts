import {Component, inject, OnInit, signal} from '@angular/core';
import {DaySelectListComponent} from '../../shared/components/day-select-list/day-select-list.component';
import {TodoCreateInput} from './components/todo-create-input/todo-create-input';
import {DateId} from '../../core/date-id';
import {TodosStore} from './store/todos.store';
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {Todo} from '../../core/models/todo/todo';
import {FocusBackgroundDirective} from '../../core/focus/focus-background.directive';

@Component({
  selector: 'app-todos',
  imports: [DaySelectListComponent, TodoCreateInput, TodoListComponent, FocusBackgroundDirective],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
  providers: [TodosStore]
})
export class Todos implements OnInit {
  protected todosStore = inject(TodosStore);
  protected readonly currentDateId = signal<DateId>('19-10-2025');

  public ngOnInit() {
    this.todosStore.loadTodos("");
  }

  public todoSubmitted(data: Pick<Todo, 'name' | 'description'>): void {
    this.todosStore.addTodo(data);
  }
}
