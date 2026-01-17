import {ElementRef, HostBinding, Directive, inject} from '@angular/core';
import {signal} from '@angular/core';

export interface ResizeConfiguration {
  minimumSize: number;
  maximumSize: number;
}

@Directive()
export abstract class Resizable {
  #elRef = inject(ElementRef)

  protected isDragging = signal<boolean>(false);
  protected initialHeight = signal<number | null>(null);

  @HostBinding('style.height')
  cardHeight: string | null = null;

  protected constructor(protected resizeConfiguration?: ResizeConfiguration) {
  }

  public onDragStart(): void {
    this.isDragging.set(true);
    this.initialHeight.set(this.#elRef.nativeElement.offsetHeight);
  }

  public onDrag(movingDiff: number): void {
    if (this.initialHeight() === null) {
      return;
    }

    this.cardHeight = `${this.calculateNewHeight(this.initialHeight()!, movingDiff, this.resizeConfiguration)}px`;
  }

  public onDragEnd(): void {
    this.isDragging.set(false);
    this.initialHeight.set(null);
  }

  private calculateNewHeight(initialHeight: number, movingDiff: number, resizeConfiguration?: ResizeConfiguration): number {
    let newHeight = initialHeight - movingDiff;

    if (resizeConfiguration) {
      return Math.max(Math.min(newHeight, resizeConfiguration.maximumSize), resizeConfiguration.minimumSize);
    }

    return newHeight;
  }
}
