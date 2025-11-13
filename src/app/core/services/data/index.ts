import {Provider} from '@angular/core';
import {DataProvider} from './data-provider';
import {DataProviderService} from './data.service';

export function provideDataProvider(): Provider {
  return {
    provide: DataProvider,
    useClass: DataProviderService
  }
}
