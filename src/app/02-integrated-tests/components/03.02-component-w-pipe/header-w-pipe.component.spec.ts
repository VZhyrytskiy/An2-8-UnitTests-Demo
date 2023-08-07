/**
 * Тестирование компонента с пайпом в шаблоне.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HeaderWPipeComponent } from './header-w-pipe.component';

describe('HeaderWPipeComponent', () => {
  let component: HeaderWPipeComponent;
  let fixture: ComponentFixture<HeaderWPipeComponent>;
  let deH1, deInput: DebugElement;
  let elH1: HTMLElement;
  let elInput: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    fixture = TestBed.createComponent(HeaderWPipeComponent);
    component = fixture.componentInstance;

    // Получаем элемент H1
    deH1 = fixture.debugElement.query(By.css('h1'));
    elH1 = deH1.nativeElement;

    // Получаем элемент input
    deInput = fixture.debugElement.query(By.css('input'));
    elInput = deInput.nativeElement;
  });

  it('should convert title to Title Case', async () => {
    elInput.value = 'my app';
    elInput.dispatchEvent(new Event('input'));

    // fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(elH1.textContent).toBe('My App');
    // expect(component.title).toBe('My App');
  });
});
