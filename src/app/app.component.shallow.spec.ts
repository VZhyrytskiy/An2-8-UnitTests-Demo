/**
 * Shallow Test
 */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLinkStubDirective } from './testing-helpers';
import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;
let links: RouterLinkStubDirective[];
let linkDes: DebugElement[];

describe('AppComponent (Shallow)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, RouterLinkStubDirective],
      // Подсказка компилятору игнорировать нераспознанные элементы и атрибуты
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    // Запускаем первоначальную инициализацию
    fixture.detectChanges();

    // Находим DebugElements с помощью директивы RouterLinkStubDirective
    // Для поиска можно использовать не только By.css, но и By.directive
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    // Получаем экземплры директив с помощью DebugElement инджектора
    // Ангуляр всегда добавляет директивы к инджектору компонента
    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });


  beforeEach(() => {});

  it('can get RouterLinks from template', () => {
    expect(links.length)
      .withContext('should have 2 links')
      .toBe(2);
    expect(links[0].linkParams)
      .withContext('1st link should go to Products')
      .toBe('/products');
    expect(links[1].linkParams)
      .withContext('2nd link should go to About')
      .toBe('/about', );
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
