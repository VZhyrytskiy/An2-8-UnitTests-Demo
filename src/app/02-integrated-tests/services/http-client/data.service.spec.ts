import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

// HttpClientTestingModule используется для упрощения написания юнит тестов для HTTP запросов
// Используем также HttpTestingController
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from './data.service';

// Вспомогательный объект
const mockUsers = [
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
    (httpMock: HttpTestingController) => {
      // В конце вызываем метод verify() HttpTestingController
      // чтобы убедиться, что никакие запросы больше не исходят
      httpMock.verify();
    }
  ));

  it('should get users', inject(
    [HttpTestingController, DataService],
    (httpMock: HttpTestingController, dataService: DataService) => {
      dataService.getData().subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          // Если HttpEventType === Response, проверяем тело запроса
          case HttpEventType.Response:
            expect(event.body).toEqual(mockUsers);
        }
      });

      // В этот момент запрос в ожидании и никакой ответ не будет отправлен
      // Следующий шаг - это проверить, что запрос выполнен
      // Используем HttpTestingController
      // Если запросов не было или было больше, чем один, то получим ошибку
      // Можно также использовать метод expectNone, если запросов не ожидается
      const mockReq = httpMock.expectOne(dataService.url);

      // Проверим, что запрос не был отменен
      // и тип ответа === json
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.method).toEqual('GET');

      // Вызываем flush и передаем объект с пользователями
      // Этот метод завершает запрос и возвращает данные, которые мы передали
      mockReq.flush(mockUsers);
    }
  ));
});
