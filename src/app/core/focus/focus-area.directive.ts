import {FocusArea, FocusAreaDirectiveConfig} from './focus-area';
import {
  computed,
  DestroyRef,
  Directive,
  HostBinding,
  HostListener,
  inject,
  Signal
} from '@angular/core';
import {FocusEngine} from './focus-engine';

@Directive()
export abstract class FocusAreaDirective implements FocusArea {
  public focusEngine = inject(FocusEngine);

  private destroyRef = inject(DestroyRef);

  public id!: string;
  public isActive: Signal<boolean> = computed(() => {
    return this.focusEngine.isActive(this);
  })

  public initialize({areaId, connectedIds}: FocusAreaDirectiveConfig) {
    this.id = areaId;

    this.focusEngine.register(this.id, this, connectedIds);

    this.destroyRef.onDestroy(() => {
      this.destroy();
    })
  }

  public focus(): void {
    this.focusEngine.activate(this)
  }

  public destroy(): void {
    this.focusEngine.unregister(this.id);
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopPropagation();

    this.focus();
  }

  @HostBinding('class.is-active')
  get activeClass(): boolean {
    return this.isActive();
  }
}
