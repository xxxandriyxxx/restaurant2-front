import {Injectable} from '@angular/core';
import {Order} from '../models/Order';
import {Observable} from 'rxjs';
import {TransferMessage} from '../models/TransferMessage';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = this.dataService.url;

  constructor(
    private http: HttpClient,
    private dataService: DataService) {
  }


  placeOrder(order: Order, userId: string, restaurantId: string): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/order/place/' + userId + '/' + restaurantId, order,
      {headers: this.dataService.getAuthHeader()});
  }

  getMyOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + '/orders/get/my/' + userId,
      {headers: this.dataService.getAuthHeader()});
  }

  getOrdersByOwnerId(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + '/orders/get/clients/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  changeOrderStatus(order: Order): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/order/change-status', order,
      {headers: this.dataService.getAuthHeader()});
  }

}
