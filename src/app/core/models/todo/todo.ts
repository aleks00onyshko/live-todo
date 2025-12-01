import {Entity} from 'data-provider-core';

export class Todo implements Entity<string> {
  public static typeKey = 'TODO';
  public typeKey: string;
  public id!: string;
  public name!: string;
  public description!: string;

  constructor({id, name, description}: Omit<Todo, 'typeKey'>) {
    this.typeKey = Todo.typeKey;
    this.id = id
    this.name = name;
    this.description = description;
  }
}
