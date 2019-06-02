import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/Client';
import {Observable} from 'rxjs';
import {Owner} from '../models/Owner';
import {TransferMessage} from '../models/TransferMessage';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  url = 'http://localhost:8080';


  constructor(
    private http: HttpClient
  ) {
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


  // login(user: User) {
  //   return this.http.post(this.url + '/login',
  //     JSON.stringify({username: user.username,
  //       password: user.password}),
  //     {observe: 'response'});
  // }

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
