import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ParentComponent } from './parent.component';
import { ChildComponent } from '../child/child.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '',
  providers: [
    {
      provide: ChildComponent,
      useClass: ChildStubComponent // провайдим стаб вместо обычного компонента
    }
  ]
})
export class ChildStubComponent {
  updateTimeStamp() {}
}

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ParentComponent,
        ChildStubComponent // стаб компонент
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // запускаем чендж детекшин вместо ручной установки связи
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateTimeStamp', () => {
    spyOn(component.childComponent, 'updateTimeStamp');
    component.onUpdate();
    expect(component.childComponent.updateTimeStamp).toHaveBeenCalled();
  });
});
