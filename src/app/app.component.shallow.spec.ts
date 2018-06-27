/**
 * Shallow Test
 */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLinkStubDirective } from './testing-helpers';
import { AppComponent } from './app.component';

let fixture: ComponentFixture<AppComponent>;

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

  let links: RouterLinkStubDirective[], linkDes: DebugElement[];

  beforeEach(() => {});

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(2, 'should have 2 links');
    expect(links[0].linkParams).toBe(
      '/products',
      '1st link should go to Products'
    );
    expect(links[1].linkParams).toBe('/about', '2nd link should go to About');
  });

  it('can click Products link in template', () => {
    const productLinkDe = linkDes[0],
      productLink = links[0];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/products');
  });
});
