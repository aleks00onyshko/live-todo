import {Component, HostListener, input, output, signal} from '@angular/core';

@Component({
  selector: 'app-resize-handle',
  imports: [],
  templateUrl: './resize-handle.html',
  styleUrl: './resize-handle.scss'
})
export class ResizeHandle {
  public widthMode = input<'full' | 'half'>('full');

  public dragStart = output<void>();
  public drag = output<number>();
  public dragEnd = output<void>();

  protected grabbed = signal<boolean>(false);
  protected startingMovePoint = signal<number | null>(null);

  @HostListener('mousedown', ['$event'])
  transitionIntoGrabbedState(event: MouseEvent) {
    this.grabbed.set(true)
    this.startingMovePoint.set(event.clientY);
    this.dragStart.emit()
  }

  @HostListener('window:mouseup')
  transitionIntoUnGrabbedState() {
    if(this.grabbed()) {
      this.grabbed.set(false)
      this.startingMovePoint.set(null);
      this.dragEnd.emit();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.grabbed()) {
      return;
    }

    this.drag.emit(event.clientY - this.startingMovePoint()!);
  }
}
