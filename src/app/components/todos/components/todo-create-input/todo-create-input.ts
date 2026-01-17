import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  Signal,
  signal
} from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {Field, form} from '@angular/forms/signals';
import {FocusArea, FocusAreaDirectiveConfig} from '../../../../core/focus/focus-area';
import {FocusEngine} from '../../../../core/focus/focus-engine';
import {Todo} from '../../../../core/models/todo/todo';
import {Resizable, ResizeConfiguration} from '../../../../core/resizable';
import {ResizeHandle} from './resize-handle/resize-handle';

interface TodoCreateInputData extends Pick<Todo, 'name' | 'description'> {
}

@Component({
  selector: 'app-todo-create-input',
  imports: [MatCardModule, MatInputModule, ResizeHandle, Field],
  templateUrl: './todo-create-input.html',
  styleUrl: './todo-create-input.scss',
  host: {
    '[style.transition]': "isDragging() ? 'none' : 'height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'"
  }
})
export class TodoCreateInput extends Resizable implements FocusArea {
  public focusEngine = inject(FocusEngine);
  private destroyRef = inject(DestroyRef);

  public todo = input.required<Todo | undefined>();
  public todoSubmitted = output<Pick<Todo, 'name' | 'description'>>();

  public addTodoModel = signal<TodoCreateInputData>({name: '', description: ''});
  public addTodoForm = form(this.addTodoModel);

  public id!: string;

  public isActive: Signal<boolean> = computed(() => {
    return this.focusEngine.isActive(this);
  });

  constructor() {
    const config: ResizeConfiguration = {
      minimumSize: 200,
      maximumSize: window.innerHeight / 2
    };
    super(config);

    this.initialize({areaId: 'TODO_CREATE_MODAL', connectedIds: []});

    effect(() => {
      this.cardHeight = this.isActive() ? `${config.maximumSize}px` : `${config.minimumSize}px`;
    });

    effect(() => {
      const currentTodo = this.todo();

      if (currentTodo) {
        this.addTodoModel.set({name: currentTodo.name ?? '', description: currentTodo.description ?? '',});
      }
    });

    effect(() => {
      if (!this.isActive()) {
        this.addTodoModel.set({name: '', description: ''})
      }
    })
  }

  public focus(): void {
    this.focusEngine.activate(this);
  }

  public submitTodo(): void {
    this.todoSubmitted.emit({
      name: this.addTodoForm.name().value(),
      description: this.addTodoForm.description().value()
    });
    this.clearForm();
  }

  public initialize({areaId, connectedIds}: FocusAreaDirectiveConfig) {
    this.id = areaId;
    this.focusEngine.register(this.id, this, connectedIds);

    this.destroyRef.onDestroy(() => {
      this.destroy();
    });
  }

  public destroy(): void {
    this.focusEngine.unregister(this.id);
  }

  private clearForm(): void {
    this.addTodoForm.name().value.set('');
    this.addTodoForm.description().value.set('');
  }
}
