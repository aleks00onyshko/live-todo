import {Component, input, output} from "@angular/core";
import {TodoComponent} from "../todo/todo.component";
import {Todo} from "../../../../core/models/todo/todo";

// TODO: think about some unified list component

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  imports: [TodoComponent],
})
export class TodoListComponent {
  public todos = input.required<Todo[]>();
  public activeTodo = input<Todo | undefined>(undefined);

  public todoClicked = output<Todo>();
}
