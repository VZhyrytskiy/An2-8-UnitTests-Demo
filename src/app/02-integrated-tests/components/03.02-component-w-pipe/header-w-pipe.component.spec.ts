/**
 * Тестирование компонента с пайпом в шаблоне.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HeaderWPipeComponent } from './header-w-pipe.component';

describe('HeaderWPipeComponent', () => {
  let component: HeaderWPipeComponent | null;
  let fixture: ComponentFixture<HeaderWPipeComponent>;
  let deH1, deInput: DebugElement;
  let elH1: HTMLElement;
  let elInput: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    fixture = TestBed.createComponent(HeaderWPipeComponent);
    component = fixture.componentInstance;

    // Получить элемент H1
    deH1 = fixture.debugElement.query(By.css('h1'));
    elH1 = deH1.nativeElement;

    // Получить элемент input
    deInput = fixture.debugElement.query(By.css('input'));
    elInput = deInput.nativeElement;

    // Запустить чендж детекшн
    fixture.detectChanges();
  });

  // почистить после каждого теста
  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should convert title to Title Case', async () => {
    elInput.value = 'my app';
    elInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(elH1.textContent).toBe('My App');
  });
});
