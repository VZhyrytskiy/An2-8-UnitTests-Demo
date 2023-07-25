import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import {
  RouterLinkStubDirective,
  RouterOutletStubComponent
} from './testing-helpers';
import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;
let links: RouterLinkStubDirective[];
let linkDes: DebugElement[];

@Component({ selector: 'app-msg-list', template: '' })
class MsgListStubComponent {}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MsgListStubComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ]
    });

    fixture = TestBed.createComponent(AppComponent);

    // Запускаем первоначальную инициализацию и получаем экземпляры директив навигации
    fixture.detectChanges();

    // Находим DebugElements с помощью директивы RouterLinkStubDirective
    // Для поиска можно использовать не только By.css, но и By.directive
    // Также искать можно не только по директиве, но и по компоненту,
    // используя его класс
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    // Получаем экземплры директив с помощью DebugElement инжектора
    // Ангуляр всегда добавляет директивы к инжектору компонента
    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('can get RouterLinks from template', () => {
    expect(links.length)
      .withContext('should have 2 links')
      .toBe(2);
    expect(links[0].linkParams)
      .withContext('1st link should go to Products')
      .toBe('/products');
    expect(links[1].linkParams)
      .withContext('2nd link should go to About')
      .toBe('/about');
  });

  it('can click Products link in template', () => {
    const productLinkDe = linkDes[0];
    const productLink = links[0];

    expect(productLink.navigatedTo)
      .withContext('link should not have navigated yet')
      .toBeNull();

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/products');
  });
});
