import { Component } from '@angular/core';
import {Todos} from './components/todos/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Todos]
})
export class App {

}
