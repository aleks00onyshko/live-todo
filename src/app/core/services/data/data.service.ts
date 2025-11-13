import {Injectable, Inject} from '@angular/core';
import {Firestore, collection, collectionData, doc, docData} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Entity} from '../../models/entity';
import {DataProvider} from './data-provider';
import {ENTITY_CONVERTER_MAP_TOKEN} from '../../models/converters';
import {EntityConverter} from '../../models/converters/converter';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService implements DataProvider {
  constructor(
    private firestore: Firestore,
    @Inject(ENTITY_CONVERTER_MAP_TOKEN) private converterMap: Map<string, EntityConverter<any, any>>
  ) {
  }

  public getEntity<T extends Entity<any>>(path: string): Observable<T | undefined> {
    const docRef = doc(this.firestore, path);

    return docData(docRef, {idField: 'id'}).pipe(map((plainObject: any) => this.convertIntoEntity(plainObject))
    );
  }

  public listenToCollectionChanges<T extends Entity<string>>(path: string): Observable<T[]> {
    try {
      const collectionRef = collection(this.firestore, path);

      return collectionData(collectionRef, {idField: 'id'}).pipe(
        map((plainObjects: any[]) => {
          return plainObjects
            .map(obj => this.convertIntoEntity(obj))
            .filter(Boolean) as T[];
        })
      );
    } catch (error) {
      console.error(`Error creating collection reference for path: "${path}"`, error);
      return of([]);
    }
  }

  public convertIntoEntity<T extends Entity<string>>(rawObject: any): T | undefined {
    if (!rawObject) {
      return undefined;
    }

    const converter = this.converterMap.get(rawObject.typeKey);

    if (converter) {
      return converter.fromPlainObject(rawObject);
    }

    console.warn(`No converter registered for typeKey: "${rawObject.typeKey}"`);
    return undefined;
  }
}
