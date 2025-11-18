import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
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
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const TodosStore = signalStore(
  withState(initialState),
  withComputed(() => ({})),
  withMethods((store, dataProviderService = inject(DataProvider)) => ({
    loadTodos: rxMethod<string>(
      pipe(
        // TODO: make query string to contain filters
        switchMap((querystring: string) => {
            return dataProviderService.listenToCollectionChanges<Todo>('todos').pipe(map(todos => {
              patchState(store, {todos, loading: false})
            }))
          }
        )
      )
    )
  })),
);
