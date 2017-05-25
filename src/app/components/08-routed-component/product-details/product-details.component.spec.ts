import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RouterStub, ActivatedRouteStub } from './../../../testing-helpers';

import { ProductDetailsComponent } from './product-details.component';
import { ProductListService } from './../product-list/product-list.service';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let component: ProductDetailsComponent;
let fixture: ComponentFixture<ProductDetailsComponent>;
let idDisplay: HTMLElement;
let nameDisplay: HTMLElement;
let expectedProduct: any;

let gotoSpy: jasmine.Spy;
let navSpy: jasmine.Spy;

const firstProduct = { 'id': '1', 'name': 'Apple'};

////// Tests //////
describe('ProductDetailsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach( async(() => {
     TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ProductListService, useClass: ProductListService },
        { provide: Router,         useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  describe('when navigate to non-existant hero id', () => {
    beforeEach(async(() => {
      expectedProduct = firstProduct;
      activatedRoute.testParams = { id: expectedProduct.id };

      fixture = TestBed.createComponent(ProductDetailsComponent);
      component = fixture.componentInstance;

      // 1st change detection triggers ngOnInit which gets a product
      fixture.detectChanges();
      return fixture.whenStable().then(() => {
        // 2nd change detection displays the async-fetched product
        fixture.detectChanges();
        idDisplay = fixture.debugElement.queryAll(By.css('span'))[0].nativeElement;
        nameDisplay = fixture.debugElement.queryAll(By.css('span'))[1].nativeElement;
      });

    }));

    it('should display tasks\'s id and name', () => {
      expect(idDisplay.textContent).toBe(expectedProduct.id);
      expect(nameDisplay.textContent).toBe(expectedProduct.name);
    });
  });

  describe('when navigate with no product id', () => {
    beforeEach( async(createComponent) );

    it('should have product.id === 0', () => {
      console.log(component.product);
      expect(component.product.id).toBe(0);
    });

    it('should display no name', () => {
      expect(nameDisplay.textContent).toBe('No Name');
    });
  });

  describe('when navigate to non-existant product id', () => {
    beforeEach( async(() => {
      activatedRoute.testParams = { id: 99999 };
      createComponent();
    }));

   it('should try to navigate back to hero list', () => {
    console.log(gotoSpy.calls.any());
    expect(gotoSpy.calls.any()).toBe(true, 'component.gotoList called');
    expect(navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

  });
});

function createComponent() {
  fixture = TestBed.createComponent(ProductDetailsComponent);
  component = fixture.componentInstance;

  const router = TestBed.get(Router); // get router from root injector
  gotoSpy = spyOn(component, 'gotoList').and.callThrough();
  navSpy  = spyOn(router, 'navigate');

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
    if (component.product) {
        idDisplay = fixture.debugElement.queryAll(By.css('span'))[0].nativeElement;
        nameDisplay   = fixture.debugElement.queryAll(By.css('span'))[1].nativeElement;
    }
  });
}

