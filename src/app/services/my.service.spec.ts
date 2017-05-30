import { MyService } from './my.service';

describe('MyService without the TestBed', () => {
  let service: MyService;

  beforeEach(() => {
    service = new MyService();
  });

  it('getValue should return real value', () => {
    expect(service.getValue()).toBe('real value');
  });

  it('getAsyncValue should return async value', (done: DoneFn) => {
    service.getAsyncValue().then(value => {
      expect(value).toBe('async value');
      done();
    });
  });

  it('getTimeoutValue should return timeout value',  (done: DoneFn) => {
    // service = new MyService();
    service.getTimeoutValue().then(value => {
      expect(value).toBe('timeout value');
      done();
    });
  });

  it('getObservableValue should return observable value', (done: DoneFn) => {
    service.getObservableValue().subscribe(value => {
      expect(value).toBe('observable value');
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
