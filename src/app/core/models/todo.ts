import {Entity} from './entity';

export interface Todo extends Entity {
  name: string;
  description: string;
  creatorId: string;
  createdAt: Date;
  lastModifiedAt: Date;
  lastModifiedById: string;
  assigneeId: string;
}
