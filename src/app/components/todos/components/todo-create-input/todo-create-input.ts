import {Component, output, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {ResizeHandle} from './resize-handle/resize-handle';
import {Resizable} from '../../../../core/resizable';
import {Todo} from '../../../../core/models/todo/todo';
import {Field, form} from '@angular/forms/signals'

interface TodoCreateInputData extends Pick<Todo, 'name' | 'description'> { }

@Component({
  selector: 'app-todo-create-input',
  imports: [MatCardModule, MatInputModule, ResizeHandle, Field],
  templateUrl: './todo-create-input.html',
  styleUrl: './todo-create-input.scss',
})
export class TodoCreateInput extends Resizable {
  public todoSubmitted = output<Pick<Todo, 'name' | 'description'>>();

  public addTodoModel = signal<TodoCreateInputData>({ name: '', description: '' });
  public addTodoForm = form(this.addTodoModel);

  constructor() {
    super({minimumSize: 200, maximumSize: window.innerHeight - 30});
  }

  public submitTodo(): void {
    this.todoSubmitted.emit({
      name: this.addTodoForm.name().value(),
      description: this.addTodoForm.description().value()
    });
    this.clearForm();
  }

  private clearForm(): void {
    this.addTodoForm.name().value.set('');
    this.addTodoForm.description().value.set('');
  }
}
