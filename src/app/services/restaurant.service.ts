import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';
import {Restaurant} from '../models/Restaurant';
import {Observable} from 'rxjs';
import {TransferMessage} from '../models/TransferMessage';
import {MenuSection} from '../models/MenuSection';
import {Dish} from '../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url = this.dataService.url;

  constructor(
    private http: HttpClient,
    private dataService: DataService) {
  }


  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/restaurants/get');
  }

  getRestaurants(ownerId: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/restaurants/get/' + ownerId,
      {headers: this.dataService.getAuthHeader()});
  }

  addRestaurant(ownerId: string, formData: FormData): Observable<TransferMessage> {
    console.log(formData);
    return this.http.post<TransferMessage>(this.url + '/restaurant/add/' + ownerId, formData,
      {headers: this.dataService.getAuthHeader()});
  }

  deleteRestaurant(id: number): Observable<TransferMessage> {
    return this.http.delete<TransferMessage>(this.url + '/restaurant/delete/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  changeRestaurantData(restaurant: Restaurant): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/change', restaurant,
      {headers: this.dataService.getAuthHeader()});
  }

  changeLogo(restId: number, formData: FormData): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/change/logo/' + restId, formData,
      {headers: this.dataService.getAuthHeader()});
  }

  getMenuSections(restaurantId: string): Observable<MenuSection[]> {
    return this.http.get<MenuSection[]>(this.url + '/restaurant/menu-sections/get/' + restaurantId);
  }

  addMenuSection(restaurantId: string, newMenuSection: MenuSection): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/menu-section/add/' + restaurantId, newMenuSection,
      {headers: this.dataService.getAuthHeader()});
  }

  changeMenuSection(menuSection: MenuSection): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/menu-section/change', menuSection,
      {headers: this.dataService.getAuthHeader()});
  }

  deleteMenuSection(id: number): Observable<TransferMessage> {
    return this.http.delete<TransferMessage>(this.url + '/restaurant/menu-section/delete/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  getDishesBySectionId(sectionId: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url + '/restaurant/dishes/get/{sectionId}' + sectionId,
      {headers: this.dataService.getAuthHeader()});
  }

  getDishesByRestaurantId(restaurantId: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url + '/restaurant/dishes/get/' + restaurantId,
      {headers: this.dataService.getAuthHeader()});
  }

  addDish(restaurantId: string, sectionId: number, dish: Dish): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/dish/add/' + restaurantId + '/' + sectionId, dish,
      {headers: this.dataService.getAuthHeader()});
  }

  changeDish(dish: Dish): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/restaurant/dish/change', dish,
      {headers: this.dataService.getAuthHeader()});
  }

  deleteDish(id: number): Observable<TransferMessage> {
    return this.http.delete<TransferMessage>(this.url + '/restaurant/dish/delete/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

}
