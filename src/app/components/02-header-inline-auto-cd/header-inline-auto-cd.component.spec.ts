import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { HeaderInlineAutoCdComponent } from './header-inline-auto-cd.component';

describe('HeaderInlineAutoCdComponent', () => {
  let component: HeaderInlineAutoCdComponent;
  let fixture: ComponentFixture<HeaderInlineAutoCdComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderInlineAutoCdComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });

    fixture = TestBed.createComponent(HeaderInlineAutoCdComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });


  it('should display original title', () => {
    expect(el.textContent).toContain(component.title);
  });

  it('should still see original title after component.title change', () => {
    const oldTitle = component.title;
    component.title = 'Test Title';
    // Displayed title is old because Angular didn't hear the change
    // The ComponentFixtureAutoDetect service responds to asynchronous activities such as
    // - promise resolution,
    // - timers,
    // - DOM events.
    // But a direct, synchronous update of the component property is invisible.
    expect(el.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    component.title = 'Test Title';
    fixture.detectChanges(); // detect changes explicitly
    expect(el.textContent).toContain(component.title);
  });

});
