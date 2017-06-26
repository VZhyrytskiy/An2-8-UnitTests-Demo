import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskComponent } from './task.component';

////// Test Host Component //////
// Делаем эмуляцию хост-компонента
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
  let testHost: TestHostComponent,
      fixture: ComponentFixture<TestHostComponent>,
      taskEl: DebugElement;

  beforeEach( async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          TaskComponent,
          TestHostComponent
        ]
        })
      .compileComponents();
  }));

  beforeEach(() => {
    // Создадим TestHostComponent вместо TaskComponent
    // Такой подход имеет сайд эффект - TaskComponent тоже будет создан
    // так как он находится в темплейте TestHostComponent
    fixture  = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;

    // Ищем элемент с классом .task
    taskEl   = fixture.debugElement.query(By.css('.task'));

    // Запускаем инициализацию данных
    fixture.detectChanges();
  });

  it('should display task name', () => {
    expect(taskEl.nativeElement.textContent).toContain(testHost.task);
  });

  it('should raise selected event when clicked', () => {
    // DebugElement.triggerEventHandler может сгенерить любое связанное
    // с данными событие по имени события.
    // Второй параметр - это объект события, переданный обработчику.
    // В этом примере тест запускает событие «click»
    // с наловым объектом события.
    taskEl.triggerEventHandler('click', null);

    expect(testHost.selectedTask).toBe(testHost.task);
  });
});


