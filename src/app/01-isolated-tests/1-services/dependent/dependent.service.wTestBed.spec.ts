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

    // TestBed.inject has an optional second parameter,
    // the object to return if Angular can't find the provider
    service = TestBed.inject(DependentService);
    myServiceSpy = TestBed.inject(MyService) as jasmine.SpyObj<MyService>;
  });

  it('#getValue should return stubbed value from a MyService spy', () => {
    const stubValue = 'stub value';
    myServiceSpy.getValue.and.returnValue(stubValue);

    expect(service.getValue())
      .withContext('service returned stub value')
      .toBe(stubValue);
    expect(myServiceSpy.getValue.calls.count())
      .withContext('stubbed method was called once')
      .toBe(1);
    expect(myServiceSpy.getValue.calls.mostRecent().returnValue)
      .toBe(stubValue);
  });
});
