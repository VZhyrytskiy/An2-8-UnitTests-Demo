import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

// HttpClientTestingModule makes it easy to unit test HTTP requests
// We need HttpTestingController, which makes it easy to mock requests
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('HttpClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
  });

  it('should get users',
    // We use the inject utility to inject the needed services into our test
    inject([HttpTestingController, DataService],
      (httpMock: HttpTestingController, dataService: DataService) => {

      // our test logic
      // expect(httpClient).toBeTruthy();

      // We define a couple of mock users that we’ll test against.
      const mockUsers = [
        { name: 'Bob', website: 'www.yessss.com' },
        { name: 'Juliette', website: 'nope.com' }
      ];

      // Then we call the getData method in the service that we’re testing
      // and subscribe to returned observable.
      dataService.getData().subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          // If the HttpEventType is of type Response, we assert for the response
          // event to have a body equal to our mock users.
          case HttpEventType.Response:
            expect(event.body).toEqual(mockUsers);
        }
      });

      // At this point, the request is pending, and no response has been
      // sent. The next step is to expect that the request happened.
      // We make use of the HttpTestingController
      // (injected in the test as httpMock) to assert that one request
      // was made to the service’s url property.
      // If no request with that URL was made, or if multiple requests match,
      // expectOne() would throw.
      // If no request is expected, the expectNone method can also be used
      const mockReq = httpMock.expectOne(dataService.url);

      // We assert that the request hasn’t been cancelled
      // and the the response if of type json
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.method).toEqual('GET');

      // Next we call flush on the mock request and pass-in our mock users.
      // The flush method completes the request using the data passed to it.
      mockReq.flush(mockUsers);
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    // Finally, we call the verify method on our HttpTestingController
    // instance to ensure that there are no outstanding requests to be made.
    httpMock.verify();
  }));


});
