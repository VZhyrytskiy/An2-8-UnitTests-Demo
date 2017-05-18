import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  // asyncbeforeEach
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [HeaderComponent]
      })
      .compileComponents(); // compile template and css
    // The compileComponents method returns a promise
    // so you can perform additional tasks immediately after it finishes.
    // For example, you could move the synchronous code in the second beforeEach
    // into a compileComponents().then(...) callback and write only one beforeEach.
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });


  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });
});
