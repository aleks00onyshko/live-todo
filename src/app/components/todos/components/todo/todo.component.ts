import { Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../../../core/models/todo/todo';

@Component({
    selector: 'app-todo',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.scss'
})
export class TodoComponent {
    public todo = input.required<Todo>()
}
