import { DependentService } from './dependent.service';
import { MyService } from './my.service';

describe('DependentService without the TestBed', () => {
  let service: DependentService;

  it('getValue should return real value by way of the real MyService', () => {
    service = new DependentService(new MyService());
    expect(service.getValue()).toBe('real value');
  });

  it('getValue should return faked value from a fakeService', () => {
    const fakeService = {
      getValue() {
        return 'fake value';
      }
    };

    service = new DependentService(fakeService as MyService);
    expect(service.getValue()).toBe('fake value');
  });

  it('getValue should return stubbed value from a MyService spy', () => {
    const myService = new MyService();
    const stubValue = 'stub value';
    const spy = spyOn(myService, 'getValue').and.returnValue(stubValue);
    service = new DependentService(myService);

    expect(service.getValue()).toBe(stubValue, 'service returned stub value');
    expect(spy.calls.count()).toBe(1, 'stubbed method was called once');
    expect(spy.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
