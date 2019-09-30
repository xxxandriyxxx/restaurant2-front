import {Injectable} from '@angular/core';
import {Client} from '../models/Client';
import {Observable} from 'rxjs';
import {TransferMessage} from '../models/TransferMessage';
import {Owner} from '../models/Owner';
import {BasicData} from '../models/BasicData';
import {User} from '../models/User';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = this.dataService.url;

  constructor(
    private http: HttpClient,
    private dataService: DataService) {
  }


  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/user/get/' + id,
      {headers: this.dataService.getAuthHeader()});
  }

  saveClient(client: Client): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/save/client', client);
  }

  saveOwner(owner: Owner): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/save/owner', owner);
  }

  activation(jwt): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/activation', new TransferMessage(jwt));
  }

  login(loginData: BasicData) {
    return this.http.post(this.url + '/login/try', loginData,
      {observe: 'response', responseType: 'text'});
  }

  updateAccount(userId: string, basicData: BasicData): Observable<TransferMessage> {
    return this.http.post<TransferMessage>(this.url + '/user/update/' + userId, basicData,
      {headers: this.dataService.getAuthHeader()});
  }

}
