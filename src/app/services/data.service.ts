import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Payload } from '../model/payload.interface';
import { Tour } from '../model/tour.interface';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  public fetchData(): Observable<Tour> {
    return this.http.get<Payload>(`/assets/data.json`).pipe(
      map(res => res.response)
    );
  }

}
