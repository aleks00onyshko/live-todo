import {signalStore, withState} from '@ngrx/signals';
import {Todo} from '../../../core/models/todo';

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
  withState(initialState)
);
