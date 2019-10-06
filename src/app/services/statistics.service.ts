import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';
import {Observable} from 'rxjs';
import {Restaurant} from '../models/Restaurant';
import {RestaurantStatistics} from '../models/statistics/RestaurantStatistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  url = this.dataService.url;

  constructor(
    private http: HttpClient,
    private dataService: DataService) {
  }


  getStatistics(ownerId: string): Observable<RestaurantStatistics[]> {
    return this.http.get<RestaurantStatistics[]>(this.url + '/statistics/get/' + ownerId,
      {headers: this.dataService.getAuthHeader()});
  }

}
