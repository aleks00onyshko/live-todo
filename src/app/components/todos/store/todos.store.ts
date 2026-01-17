import {getState, patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {Todo} from '../../../core/models/todo/todo';
import {inject} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {DataProvider} from 'data-provider-core';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: Error | null;
  activeTodo: Todo | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  activeTodo: null
};

export const TodosStore = signalStore(
  withState(initialState),
  withComputed(() => ({})),
  withMethods((
    store,
    dataProviderService = inject(DataProvider)
  ) => ({
    loadTodos: rxMethod<string>(
      pipe(
        // TODO: make query string to contain filters
        switchMap((querystring: string) => {
            return dataProviderService.listenToCollectionChanges<Todo>('todos').pipe(map(todos => {
              patchState(store, {todos, loading: false});
            }))
          }
        )
      )
    ),
    addTodo: rxMethod<Pick<Todo, 'name' | 'description'>>(
      pipe(
        switchMap((todoData: Pick<Todo, 'name' | 'description'>) => {
          return dataProviderService.createEntity<Todo>('todos', Todo.typeKey, todoData).pipe(
            map((todo) => {
              if (todo) {
                const state = getState(store);

                patchState(store, {todos: [...state.todos, todo]})
              }

              return todo;
            })
          )
        })
      )
    ),
    setActiveTodo(todo: Todo): void {
      patchState(store, {activeTodo: {...todo}})
    },
    resetActiveTodo(): void {
      patchState(store, {activeTodo: null})
    }
  })),
);
