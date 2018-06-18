import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) {}

  getData() {
    const req = new HttpRequest('GET', this.url, {
      reportProgress: true
    });

    return this.httpClient.request(req);
  }
}
