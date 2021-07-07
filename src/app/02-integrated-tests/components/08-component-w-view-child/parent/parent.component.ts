import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {
  @ViewChild(ChildComponent) childComponent: ChildComponent;

  onUpdate(): void {
    this.childComponent.updateTimeStamp();
  }
}
