import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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


@Injectable({
  providedIn: 'root'
})
export class MainService {

  url = 'http://localhost:8080';

  const;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'my-auth-token'
      // 'observe': 'response'
    })
  };


  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) {
  }

  saveClient(client: Client) {
    return this.http.post(this.url + '/saveClient', client)
      .subscribe((res) => {
        console.log(res);
      });
  }

  saveOwner(owner: Owner) {
    this.http.post(this.url + '/saveOwner', owner)
      .subscribe((res) => {
        console.log(res);
      });
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

  addRestaurant(ownerId: string, restaurant: Restaurant): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/addRestaurant/' + ownerId, restaurant,
      {headers: this.dataService.getAuthHeader()});
  }

  getRestaurants(ownerId: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + '/getRestaurants/' + ownerId,
      {headers: this.dataService.getAuthHeader()});
  }

  changeRestaurant(restaurant: Restaurant): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/changeRestaurant', restaurant,
      {headers: this.dataService.getAuthHeader()});
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
    return this.http.get<MenuSection[]>(this.url + '/getMenuSections/' + restaurantId,
      {headers: this.dataService.getAuthHeader()});
  }

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

  // login() {
  //   this.http.post('http://localhost:8080/login',
  //     JSON.stringify({username: 'admin', password: 'admin'}),
  //     {observe: 'response'}).subscribe(value => {
  //     const token = value.headers.get('Authorization');
  //     console.log(token);
  //     console.log(value);
  //
  //     localStorage.setItem('_token', token);
  //   });
  // }


  // login(logiData: Object): Observable<any> {
  //   return this.http.post<any>(this.url + '/tryLogin', loginData);
  // }

  // login(name: string, mail: string, pass: string) {
  //   this.http.post(this.url + '/tryLogin',(
  //     JSON.stringify({username: name, email: mail, password: pass}))).subscribe(value => {
  //     // const token = value.headers.get('Authorization');
  //     // console.log(token);
  //     console.log(value);
  //
  //     // localStorage.setItem('_token', token);
  //   });
  // }


  // login(form) {
  //   console.log(form);
  //   console.log(JSON.stringify(form));
  //   return this.http.post(this.url + '/tryLogin',
  //     form,
  //     {
  //       observe: 'response',
  //       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //     });
  // }

  // addHero(form): Observable<any> {
  //   return this.http.post<any>(this.url, form, httpOptions)
  //    ;
  // }


  findNameByEmail(email: string): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/findNameByEmail', new TransferMessage(email));
  }


  // activation(jwt) {
  //   console.log(jwt);
  //   console.log(this.message);
  //   this.message.message = jwt;
  //   console.log(this.message);
  //   // this.http.get(this.url + '/activation/' + jwt, {responseType: 'string'}).subscribe(value => console.log(value));
  //   this.http.get(this.url + 'http://localhost:8080/activation/' + jwt).subscribe(value => console.log(value));
  //
  // }


  // getInfo() {
  //   const headersOption = new HttpHeaders({'Authorization': localStorage.getItem('_token')});
  //   // 'Authorization' в Сергія з лапками, хоче без лапок і працює теж
  //   this.http.get('http://localhost:8080/get', {headers: headersOption, responseType: 'text'}).subscribe(value => console.log(value));
  //   // this.http.get('http://localhost:8080/get', {responseType: 'text'}).subscribe(value => console.log(value));
  // }


}
