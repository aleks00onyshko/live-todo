import {Todo} from '../../todo/todo';
import {EntityConverter, EntityConverterConfig} from 'data-provider-core';

export class TodoConverter implements EntityConverter<string, Todo> {
  public toPlainObject(todo: Todo): Todo {
    return {id: todo.id, typeKey: Todo.typeKey, name: todo.name};
  }

  public fromPlainObject(value: Todo): Todo | null {
    if (!this.validateCreation(value)) {
      console.error(`Error during creation validation for TODO, value:`, value);
      return null;
    }

    return new Todo(value);
  }

  public validateCreation(value: Todo): boolean {
    return !!(value.id && value.typeKey === Todo.typeKey);
  }
}

export const TodoConverterConfig: EntityConverterConfig = {
  typeKey: Todo.typeKey,
  converter: new TodoConverter()
}

