import {FocusedGraphPart, FocusEngine} from './focus-engine';
import {FocusArea} from './focus-area';
import {signal} from '@angular/core';

export class FocusEngineService implements FocusEngine {
  public focusedGraphPart = signal<FocusedGraphPart | undefined>(undefined);

  private readonly graph = new Map<FocusArea, Set<FocusArea>>();
  private readonly registry = new Map<string, FocusArea>();
  private readonly pendingConnections = new Map<string, Set<string>>;

  public register(areaId: string, area: FocusArea, connectedIds?: string[]): void {
    this.registry.set(areaId, area);

    const registeredArea = this.registry.get(areaId)!;

    if (connectedIds) {
      connectedIds.forEach((connectionId: string) => {
        const connectedArea = this.registry.get(connectionId);

        if (connectedArea) {
          this.link(registeredArea, connectedArea);
        } else {
          this.pendingConnections.set(connectionId, (this.pendingConnections.get(connectionId) ?? new Set<string>()).add(areaId));
        }
      })
    }

    if (this.pendingConnections.has(areaId)) {
      this.resolvePendingConnectionsOfArea(areaId);
    }
  }

  // We create a mirror connection to support future cleanup
  public link(areaA: FocusArea, areaB: FocusArea): void {
    this.graph.set(areaA, (this.graph.get(areaA) ?? new Set<FocusArea>()).add(areaB))
    this.graph.set(areaB, (this.graph.get(areaB) ?? new Set<FocusArea>()).add(areaA))
  }

  public unlink(areaA: FocusArea, areaB: FocusArea): void {
    const areaAConnections = this.graph.get(areaA);
    const areaBConnections = this.graph.get(areaB);

    if (areaAConnections) {
      areaAConnections.delete(areaB);
    }

    if (areaBConnections) {
      areaBConnections.delete(areaA);
    }
  }

  public unregister(areaId: string) {
    const area = this.registry.get(areaId);

    if (area) {
      const areaConnections = this.graph.get(area);

      if (areaConnections) {
        [...areaConnections].forEach((connection) => {
          this.unlink(area, connection);
        })
      }

      this.registry.delete(areaId);
      this.graph.delete(area);
    }
  }

  public activate(focusedArea: FocusArea): void {
    const registryFocusedArea = this.registry.get(focusedArea.id);

    if (registryFocusedArea) {
      this.focusedGraphPart.set({
        originArea: focusedArea,
        connections: this.graph.get(registryFocusedArea) ?? new Set()
      });
    }
  }

  public isActive(area: FocusArea): boolean {
    const focusedGraphPart = this.focusedGraphPart();

    return focusedGraphPart ? focusedGraphPart.originArea === area || focusedGraphPart.connections.has(area) : false
  }

  private resolvePendingConnectionsOfArea(areaId: string): void {
    const pendingConnections = this.pendingConnections.get(areaId)!;

    pendingConnections.forEach((dependentId: string) => {
      const connectedArea = this.registry.get(dependentId);

      if (connectedArea) {
        this.link(this.registry.get(areaId)!, connectedArea);
      }
    })

    this.pendingConnections.delete(areaId);

  }
}
