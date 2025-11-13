import {Entity} from '../entity';

export abstract class EntityConverter<ID = string, T extends Entity<ID> = Entity<ID>> {
  abstract toPlainObject(entity: T): T;

  abstract fromPlainObject(value: T): T | null;

  abstract validateCreation(value: T): boolean;
}

export interface EntityConverterConfig {
  typeKey: string;
  converter: EntityConverter<any, Entity<any>>
}
