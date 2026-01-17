import {Directive} from '@angular/core';
import {FocusAreaDirective} from './focus-area.directive';

@Directive({
  selector: '[appFocusBackground]',
  standalone: true
})
export class FocusBackgroundDirective extends FocusAreaDirective {
  constructor() {
    super();
    this.initialize({areaId: 'EMPTY_SPACE', connectedIds: []});
  }
}
