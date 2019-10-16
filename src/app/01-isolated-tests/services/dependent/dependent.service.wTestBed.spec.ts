import { TestBed } from '@angular/core/testing';

import { DependentService } from './dependent.service';
import { MyService } from '../my/my.service';

describe('DependentService without the TestBed', () => {
  let service: DependentService;
  let myServiceSpy: jasmine.SpyObj<MyService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MyService', ['getValue']);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [DependentService, { provide: MyService, useValue: spy }]
    });
    // TODO:
    // replace get to inject
    service = TestBed.get(DependentService);
    myServiceSpy = TestBed.get(MyService);
  });

  it('getValue should return stubbed value from a MyService spy', () => {
    const stubValue = 'stub value';
    myServiceSpy.getValue.and.returnValue(stubValue);

    expect(service.getValue()).toBe(stubValue, 'service returned stub value');
    expect(myServiceSpy.getValue.calls.count()).toBe(
      1,
      'stubbed method was called once'
    );
    expect(myServiceSpy.getValue.calls.mostRecent().returnValue).toBe(
      stubValue
    );
  });
});
