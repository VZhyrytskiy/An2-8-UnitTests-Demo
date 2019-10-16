import { MyService } from './my.service';

describe('MyService without the TestBed', () => {
  let service: MyService;

  beforeEach(() => {
    service = new MyService();
  });

  it('getValue should return real value', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('getPromiseValue should return value from promise', (done: DoneFn) => {
    service.getPromiseValue().then(value => {
      expect(value).toBe('promise value');
      done();
    });
  });

  it('getObservableValue should return value from observable', (done: DoneFn) => {
    service.getObservableValue().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });

  it('getTimeoutValue should return timeout value', (done: DoneFn) => {
    service.getTimeoutValue().then(value => {
      expect(value).toBe('timeout value');
      done();
    });
  });

  it('getObservableDelayValue should return observable delay value', (done: DoneFn) => {
    service.getObservableDelayValue().subscribe(value => {
      expect(value).toBe('observable delay value');
      done();
    });
  });
});
