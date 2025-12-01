import {Todo} from '../../todo/todo';
import {EntityConverter, EntityConverterConfig} from 'data-provider-core';

export class TodoConverter implements EntityConverter<string, Todo> {
  public toPlainObject(todo: Todo): Todo {
    return {id: todo.id, typeKey: Todo.typeKey, name: todo.name, description: todo.description};
  }

  public fromPlainObject(value: Todo): Todo | undefined {
    if (!value.id || value.typeKey !== Todo.typeKey) {
      console.error(`Error during creation validation for TODO, value:`, value);
      return undefined;
    }

    return new Todo(value);
  }

  public createDraft(data: Omit<Todo, "id" | "typeKey">): Omit<Todo, "id"> | undefined {
    if(!data.description || !data.name) {
      console.error('Error during draft creation for TODO, missing properties, incoming data is ', data)
      return undefined;
    }

    return {
      typeKey: Todo.typeKey,
      name: data.name,
      description: data.description,
    }
  }
}

export const TodoConverterConfig: EntityConverterConfig = {
  typeKey: Todo.typeKey,
  converter: new TodoConverter()
}

