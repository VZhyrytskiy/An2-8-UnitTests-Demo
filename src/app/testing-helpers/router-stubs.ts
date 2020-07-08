import { BehaviorSubject } from 'rxjs';
import { Component, Directive, Injectable, Input, HostListener } from '@angular/core';
import { NavigationExtras } from '@angular/router';


// ActivatedRouteStub реализует только две функциональности
// 1. params
// 2. snapshot.params
@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap - Observable
  // BehaviorSubject управляет параметрами.
  // Возвращает одно и то же значение каждому подписчику paramMap,
  // пока не будет присвоено новое значение.
  private subject = new BehaviorSubject(this.testParams);
  // tslint:disable-next-line: variable-name
  private _testParams: {};

  // Создаем Observable
  paramMap = this.subject.asObservable();

  // гетер и сетер для testParams
  get testParams() { return this._testParams; }
  set testParams(paramMap: {}) {
    this._testParams = paramMap;
    this.subject.next(paramMap);
  }

  // ActivatedRoute snapshot
  get snapshot() {
    return { paramMap: this.testParams };
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
})
export class RouterLinkStubDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

// tslint:disable-next-line:component-selector
@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }
