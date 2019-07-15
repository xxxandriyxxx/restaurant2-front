import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/Client';
import {Observable} from 'rxjs';
import {Owner} from '../models/Owner';
import {TransferMessage} from '../models/TransferMessage';
import {User} from '../models/User';
import {BasicData} from '../models/BasicData';
import {DataService} from './data.service';
import {Restaurant} from '../models/Restaurant';
import {MenuSection} from '../models/MenuSection';
import {Dish} from '../models/Dish';
import {Order} from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private dataService: DataService) {
  }


  saveClient(client: Client): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/saveClient', client);
  }

  saveOwner(owner: Owner): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/saveOwner', owner);
  }

  activation(jwt): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/activation', new TransferMessage(jwt));
  }

  login(loginData: BasicData) {
    return this.http.post(this.url + '/tryLogin', loginData,
      {observe: 'response', responseType: 'text'});
  }

  getUserById(id: string): Observable<User> {
    // const headersOption = new HttpHeaders({Authorization: localStorage.getItem('_token')});
    return this.http.get<User>(this.url + '/getUserById/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  updateProfile(userId: string, basicdata: BasicData): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/updateProfile/' + userId, basicdata,
      {headers: this.dataService.getAuthHeader()});
  }

  // addRestaurant(ownerId: string, restaurant: Restaurant): Observable<TransferMessage> {
  //   return this.http.post<TransferMessage>(this.url + '/addRestaurant/' + ownerId, restaurant,
  //     {headers: this.dataService.getAuthHeader()});
  // }

  changeRestaurant(restaurant: Restaurant): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/changeRestaurant', restaurant,
      {headers: this.dataService.getAuthHeader()});
  }

  addRestaurant(ownerId: string, formData: FormData): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/addRestaurant/' + ownerId, formData,
      {headers: this.dataService.getAuthHeader()});
  }

  // changeRestaurant(formData: FormData): Observable<TransferMessage> {
  //   return this.http.post<TransferMessage>(this.url + '/changeRestaurant', formData,
  //     {headers: this.dataService.getAuthHeader()});
  // }


  changeLogo(restId: number, formData: FormData): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/changeLogo/' + restId, formData,
      {headers: this.dataService.getAuthHeader()});
  }

  getRestaurants(ownerId: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/getRestaurants/' + ownerId,
      {headers: this.dataService.getAuthHeader()});
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/getAllRestaurants');
  }



  deleteRestaurant(id: number): Observable<TransferMessage> {
    return this.http.delete<TransferMessage>(this.url + '/deleteRestaurant/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  addMenuSection(restaurantId: string, newMenuSection: MenuSection): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/addMenuSection/' + restaurantId, newMenuSection,
      {headers: this.dataService.getAuthHeader()});
  }

  getMenuSections(restaurantId: string): Observable<MenuSection[]> {
    return this.http.get<MenuSection[]>(this.url + '/getMenuSections/' + restaurantId);
  }

  // getMenuSections(restaurantId: string): Observable<MenuSection[]> {
  //   return this.http.get<MenuSection[]>(this.url + '/getMenuSections/' + restaurantId,
  //     {headers: this.dataService.getAuthHeader()});
  // }

  changeMenuSection(menuSection: MenuSection): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/changeMenuSection', menuSection,
      {headers: this.dataService.getAuthHeader()});
  }

  deleteMenuSection(id: number): Observable<TransferMessage> {
    return this.http.delete<TransferMessage>(this.url + '/deleteMenuSection/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  addDish(restaurantId: string, sectionId: number, dish: Dish): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/addDish/' + restaurantId + '/' + sectionId, dish,
      {headers: this.dataService.getAuthHeader()});
  }

  getDishesBySectionId(id: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url + '/getDishesBySectionId/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  getDishesByRestaurantId(id: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url + '/getDishesByRestaurantId/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url + '/getAllDishes',
      {headers: this.dataService.getAuthHeader()});
  }

  changeDish(dish: Dish): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/changeDish', dish,
      {headers: this.dataService.getAuthHeader()});
  }

  deleteDish(id: number): Observable<TransferMessage> {
    return this.http.delete<TransferMessage>(this.url + '/deleteDish/' + id,
      {headers: this.dataService.getAuthHeader()});
  }


  makeOrder(order: Order, userId: string, restaurantId: string): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/makeOrder/' + userId + '/' + restaurantId, order,
      {headers: this.dataService.getAuthHeader()});
  }

  getMyOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + '/getMyOrders/' + userId,
      {headers: this.dataService.getAuthHeader()});
  }

  getOrdersByOwnerId(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + '/getOrdersByOwnerId/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  changeOrderStatus(order: Order): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/changeOrderStatus', order,
      {headers: this.dataService.getAuthHeader()});
  }

  // findNameByEmail(email: string): Observable<TransferMessage> {
  //   return this.http.post<TransferMessage>(this.url + '/findNameByEmail', new TransferMessage(email));
  // }


}
