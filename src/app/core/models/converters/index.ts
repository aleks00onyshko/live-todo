import {InjectionToken, Provider} from '@angular/core';
import {EntityConverter, EntityConverterConfig} from './converter';
import {TodoConverterConfig} from './todo/todo.converter';
import {Entity} from '../entity';

// private array of converters configs
const ENTITY_CONVERTER_CONFIGS_TOKEN = new InjectionToken<EntityConverterConfig[]>('EntityConvertersConfig');
export const ENTITY_CONVERTER_MAP_TOKEN = new InjectionToken<Map<string, EntityConverter<any, Entity<any>>>>('EntityConverterMap');

const entityConverterConfigsProviders: Provider[] = [
  {
    provide: ENTITY_CONVERTER_CONFIGS_TOKEN,
    useValue: TodoConverterConfig,
    multi: true
  }
];

export const entityConvertersMapProvider: Provider = {
  provide: ENTITY_CONVERTER_MAP_TOKEN,
  useFactory: (converterConfigs: EntityConverterConfig[]) => new Map<string, EntityConverter<any, Entity<any>>>(
    converterConfigs.map(converterConfig => [converterConfig.typeKey, converterConfig.converter])
  ),
  deps: [ENTITY_CONVERTER_CONFIGS_TOKEN]
}

export function provideEntityConverters() {
  return [
    entityConverterConfigsProviders,
    entityConvertersMapProvider
  ]
}
