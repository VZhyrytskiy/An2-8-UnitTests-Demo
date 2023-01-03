import { MyService } from './my.service';
import { TestBed } from '@angular/core/testing';

describe('MyService with the TestBed', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyService]
    });

    service = TestBed.inject(MyService);
  });

  it('getValue should return real value', () => {
    expect(service.getValue()).toBe('real value');
  });
});
