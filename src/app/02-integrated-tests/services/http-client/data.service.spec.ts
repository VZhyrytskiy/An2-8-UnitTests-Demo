/**
 * Тестирование сервиса с HttpClient
 * HttpClientTestingModule используется для упрощения написания юнит тестов
 * для HTTP запросов
 * Используем также HttpTestingController
 */
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';

import { DataService } from './data.service';

// Вспомогательный объект ответа
const mockResponse = [
  { name: 'Bob', website: 'www.yessss.com' },
  { name: 'Juliette', website: 'nope.com' }
];

describe('DataService', () => {
  let httpTestingController: HttpTestingController;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    dataService = TestBed.inject(DataService);
  });

  afterEach(() => {
    /**
     * В конце вызываем метод verify() HttpTestingController
     * чтобы убедиться, что никакие запросы больше не исходят
     */
    httpTestingController.verify();
  });

  it('should get users', () => {
    dataService.getData().subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        // Если HttpEventType === HttpEventType.Response, проверяем тело запроса
        case HttpEventType.Response:
          expect(event.body).toEqual(mockResponse);
      }
    });

    /**
     * В этот момент запрос в ожидании и никакой ответ не будет отправлен
     * Следующий шаг - это проверить, что запрос выполнен
     * Используем HttpTestingController
     *
     * Если запросов не было или было больше, чем один, то получим ошибку
     *
     * Можно также использовать метод expectNone, если запросов не ожидается
     * или метод match, если ожидается несколько запросов.
     */
    const mockRequest: TestRequest = httpTestingController.expectOne(dataService.url);

    /**
     * Проверяем, что
     *  1. запрос не был отменен
     *  2. тип ответа === json
     *  3. метод GET
     */
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    expect(mockRequest.request.method).toEqual('GET');

    /**
     * Этот метод завершает запрос и возвращает данные, которые мы передали
     * Вызываем flush и передаем объект с пользователями
     */
    mockRequest.flush(mockResponse);
  });

  it('should return 500 error', () => {
    dataService.getData().subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          // Если HttpEventType === HttpEventType.Response, проверяем тело запроса
          case HttpEventType.Response:
            expect(event.body).toEqual(mockResponse);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        expect(err.status).toEqual(500);
        expect(err.statusText).toEqual('Server Error');
      }
    );

    const mockRequest: TestRequest = httpTestingController.expectOne(dataService.url);
    mockRequest.flush('error', {
      status: 500,
      statusText: 'Server Error'
    });
  });

  it('should return a network error', () => {
    const emsg = 'simulated network error';

    dataService.getData().subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          // Если HttpEventType === HttpEventType.Response, проверяем тело запроса
          case HttpEventType.Response:
            expect(event.body).toEqual(mockResponse);
        }
      },
      (err: HttpErrorResponse) => {
        expect(err.error.message).toEqual(emsg, 'message');
      }
    );

    const mockRequest: TestRequest = httpTestingController.expectOne(dataService.url);

    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: emsg
    });

    // Respond with mock error
    mockRequest.error(mockError);
  });
});
