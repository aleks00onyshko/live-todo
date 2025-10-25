import { Component} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {ResizeHandle} from './resize-handle/resize-handle';
import {Resizable} from '../../../../core/resizable';

@Component({
  selector: 'app-todo-create-input',
  imports: [MatCardModule, MatInputModule, ResizeHandle],
  templateUrl: './todo-create-input.html',
  styleUrl: './todo-create-input.scss',
})
export class TodoCreateInput extends Resizable {
  constructor() {
    super({ minimumSize: 200, maximumSize: window.innerHeight - 30 });
  }
}
