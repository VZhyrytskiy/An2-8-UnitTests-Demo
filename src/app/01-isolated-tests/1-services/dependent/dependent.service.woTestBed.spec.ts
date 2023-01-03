import { DependentService } from './dependent.service';
import { MyService } from '../my/my.service';

describe('DependentService without the TestBed', () => {
  let service: DependentService;

  it('#getValue should return real value from the real service', () => {
    service = new DependentService(new MyService());

    expect(service.getValue()).toBe('real value');
  });

  it('#getValue should return faked value from a fakeService', () => {
    const fakedService = {
      getValue(): string {
        return 'faked value';
      }
    };
    service = new DependentService(fakedService as MyService);

    expect(service.getValue()).toBe('faked value');
  });

  it('#getValue should return stubbed value from a MyService spy', () => {
    // create `getValue` spy on an object representing the MyService
    const myServiceSpy = jasmine.createSpyObj('myService', ['getValue']);

    // set the value to return when the `getValue` spy is called.
    const stubValue = 'stub value';
    myServiceSpy.getValue.and.returnValue(stubValue);

    service = new DependentService(myServiceSpy);

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
