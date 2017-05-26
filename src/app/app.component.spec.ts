import { TestBed, ComponentFixture, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Directive, Input } from '@angular/core';

import { AppComponent } from './app.component';

let app: AppComponent;
let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let el: HTMLElement;

@Component({ selector: 'app-msg-list', template: '' })
class MsgListStubComponent { }

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

// tslint:disable-next-line:component-selector
@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
          MsgListStubComponent,
          RouterLinkStubDirective, RouterOutletStubComponent
        ]
      })
      .compileComponents();
  });

  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // trigger initial data binding
    fixture.detectChanges();

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(2, 'should have 2 links');
    expect(links[0].linkParams).toBe('/products', '1st link should go to Products');
    expect(links[1].linkParams).toBe('/about', '2nd link should go to About');
  });

  it('can click Products link in template', () => {
  const productLinkDe = linkDes[0];
  const productLink = links[0];

  expect(productLink.navigatedTo).toBeNull('link should not have navigated yet');

  productLinkDe.triggerEventHandler('click', null);
  fixture.detectChanges();

  expect(productLink.navigatedTo).toBe('/products');
});
});
