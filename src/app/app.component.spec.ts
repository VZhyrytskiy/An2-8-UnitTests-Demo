import { TestBed, ComponentFixture, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Directive, Input } from '@angular/core';

import { RouterLinkStubDirective, RouterOutletStubComponent } from './testing-helpers';
import { AppComponent } from './app.component';

let component: AppComponent,
    fixture: ComponentFixture<AppComponent>,
    links: RouterLinkStubDirective[],
    linkDes: DebugElement[];

@Component({ selector: 'app-msg-list', template: '' })
class MsgListStubComponent { }

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



  // Запускаем первоначальную инициализацию и получаем экземпляры директив навигации
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // Запускаем первоначальную инициализацию
    fixture.detectChanges();

    // Находим DebugElements с помощью директивы RouterLinkStubDirective
    // Для поиска можно использовать не только By.css, но и By.directive
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // Получаем экземплры директив с помощью DebugElement инжектора
    // Ангуляр всегда добавляет директивы к инжектору компонента
    links = linkDes
      .map(d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(2, 'should have 2 links');
    expect(links[0].linkParams).toBe('/products', '1st link should go to Products');
    expect(links[1].linkParams).toBe('/about', '2nd link should go to About');
  });

  it('can click Products link in template', () => {
    const productLinkDe = linkDes[0],
          productLink = links[0];

    expect(productLink.navigatedTo).toBeNull('link should not have navigated yet');

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/products');
  });
});
