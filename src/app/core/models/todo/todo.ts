import {Entity} from '../entity';

export class Todo implements Entity<string> {
  public static typeKey = 'TODO';
  public typeKey: string;
  public id!: string;
  public name!: string;

  constructor({id, name}: Omit<Todo, 'typeKey'>) {
    this.typeKey = Todo.typeKey;
    this.id = id
    this.name = name;
  }
}
