import { MyService } from './my.service';
import { TestBed } from '@angular/core/testing';

describe('MyService with the TestBed', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyService]
    });

    // TODO:
    // replace TestBed.get to TestBed.inject in v.9
    // TestBed.get is deprecated
    service = TestBed.get(MyService);
  });

  it('getValue should return real value', () => {
    expect(service.getValue()).toBe('real value');
  });
});
