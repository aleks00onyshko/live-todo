import {Observable} from 'rxjs';
import {Entity} from '../../models/entity';

export abstract class DataProvider {
  public abstract getEntity<T extends Entity<string>>(path: string): Observable<T | undefined>;

  public abstract listenToCollectionChanges<T extends Entity<string>>(path: string): Observable<T[] | undefined>;

  public abstract convertIntoEntity<T extends Entity<string>>(rawObject: any): T | undefined;
}
