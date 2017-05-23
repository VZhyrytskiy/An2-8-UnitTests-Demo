import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { click } from './../../../../testing-helpers';

import { TaskComponent } from './task.component';

////// Test Host Component //////
import { Component } from '@angular/core';

@Component({
  template: `
    <app-task  [task]="task"  (selected)="showDetails($event)"></app-task>`
})
class TestHostComponent {
  task = 'Test task name';
  selectedTask: string;
  showDetails(task: string) { this.selectedTask = task; }
}
////// END: Test Host Component //////

describe('TaskComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let taskEl: DebugElement;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent, TestHostComponent ], // declare both
    }).compileComponents();
  }));

  beforeEach(() => {
    // create TestHostComponent instead of TaskComponent
    // Creating the TestHostComponent has the side-effect of creating a
    // TaskComponent because the latter appears within the template
    // of the former.
    fixture  = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    taskEl   = fixture.debugElement.query(By.css('.task')); // find task
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display task name', () => {
    expect(taskEl.nativeElement.textContent).toContain(testHost.task);
  });

  it('should raise selected event when clicked', () => {
    click(taskEl);
    // selected task should be the same data bound task
    expect(testHost.selectedTask).toBe(testHost.task);
  });
});


