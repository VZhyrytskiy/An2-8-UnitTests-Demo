import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

/**
 * HttpClientTestingModule используется для упрощения написания юнит тестов для HTTP запросов
 * Используем также HttpTestingController
 */
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from './data.service';

// Вспомогательный объект ответа
const mockResponse = [
  { name: 'Bob', website: 'www.yessss.com' },
  { name: 'Juliette', website: 'nope.com' }
];

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
  });

  afterEach(inject(
    [HttpTestingController],
    (mockHttp: HttpTestingController) => {
      /**
       * В конце вызываем метод verify() HttpTestingController
       * чтобы убедиться, что никакие запросы больше не исходят
       */
      mockHttp.verify();
    }
  ));

  it('should get users', inject(
    [HttpTestingController, DataService],
    (mockHttp: HttpTestingController, dataService: DataService) => {
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
       * Используем mockHttp (HttpTestingController)
       *
       * Если запросов не было или было больше, чем один, то получим ошибку
       *
       * Можно также использовать метод expectNone, если запросов не ожидается
       */
      const mockRequest = mockHttp.expectOne(dataService.url);

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
    }
  ));
});
