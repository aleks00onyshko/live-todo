import {Component, effect, input} from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Todo} from '../../../../core/models/todo/todo';
import {FocusAreaDirective} from '../../../../core/focus/focus-area.directive';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  host: {
    '[class.active]': 'isActive()'
  }
})
export class TodoComponent extends FocusAreaDirective {
  public todo = input.required<Todo>()

  constructor() {
    super();

    effect(() => {
      this.initialize({areaId: `TODO_${this.todo().id}`, connectedIds: ['TODO_CREATE_MODAL']})
    })
  }
}
