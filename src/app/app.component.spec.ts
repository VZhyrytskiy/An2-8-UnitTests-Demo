/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';

let app: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let el: HTMLElement;

describe('App: An2XTests', () => {
  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [
        AppComponent // declare the test component
      ],
      // Automatic change detection
      // providers: [
      //   { provide: ComponentFixtureAutoDetect, useValue: true }
      // ]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(AppComponent);

    // AppComponent test instance
    app = fixture.componentInstance;
  });

  it('should create the app 0', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should create the app', async(() => {
     // get test component from the fixture
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');

  }));

 it('should render title in a h1 tag', async(() => {
    // trigger change detection to update the view
    fixture.detectChanges();

    el = fixture.debugElement.nativeElement;

    // confirm the element's content
    expect(el.querySelector('h1').textContent).toContain('app works!');
  }));

  it('should render title in a h1 tag 0', async(() => {
    // trigger change detection to update the view
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    // confirm the element's content
    expect(el.textContent).toContain('app works!');
  }));

  it('should still see original title after app.title change', () => {
      const oldTitle = app.title;
      app.title = 'Test Title';

      // Displayed title is old because Angular didn't hear the change :(
      expect(el.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    app.title = 'Test Title';

    el = fixture.debugElement.nativeElement;
    fixture.detectChanges(); // detect changes explicitly
    expect(el.textContent).toContain(app.title);
  });


});
