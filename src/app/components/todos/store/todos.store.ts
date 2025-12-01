import {getState, patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {Todo} from '../../../core/models/todo/todo';
import {inject} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {EMPTY, pipe, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {DataProvider, EntityConverter} from 'data-provider-core';
import {ENTITY_CONVERTER_MAP_TOKEN} from 'data-provider-firebase-angular';

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
  withMethods((store,
               dataProviderService = inject(DataProvider),
               convertersMap = inject(ENTITY_CONVERTER_MAP_TOKEN)) => ({
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
    ),
    addTodo: rxMethod<Pick<Todo, 'name' | 'description'>>(
      pipe(
        switchMap((todoData: Pick<Todo, 'name' | 'description'>) => {
          const todoConverter = convertersMap.get(Todo.typeKey)! as EntityConverter<string, Todo>;
          const draftEntity = todoConverter.createDraft(todoData);

          if(draftEntity) {
            return dataProviderService.createEntity<Todo>('todos', draftEntity).pipe(
              map((todo) => {
                if(todo) {
                  const state = getState(store);

                  patchState(store, { todos: [ ...state.todos, todo ] })
                }

                return todo;
              })
            )
          }

          return EMPTY;
        })
      )
    )
  })),
);
