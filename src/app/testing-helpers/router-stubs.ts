import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';


// ActivatedRouteStub реализует только две функциональности
// 1. params
// 2. snapshot.params
@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.params - Observable
  // BehaviorSubject управляет параметрами.
  // Возвращает одно и то же значение каждому подписчику params,
  // пока не будет присвоено новое значение.
  private subject = new BehaviorSubject(this.testParams);
  private _testParams: {};

  // Создаем Observable
  params = this.subject.asObservable();

  // гетер и сетер для testParams
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute snapshot
  get snapshot() {
    return { params: this.testParams };
  }
}

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) { }
  navigateByUrl(url: string) { return url; }
}

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
