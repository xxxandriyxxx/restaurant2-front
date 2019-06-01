import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/Client';
import {Observable} from 'rxjs';
import {ResponseMessage} from '../models/ResponseMessage';
import {Owner} from '../models/Owner';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  url = 'http://localhost:8080';


  constructor(
    private http: HttpClient
  ) { }

  saveUser(){
    return this.http.get(this.url);
  }

  saveClient(client: Client): Observable<ResponseMessage>  {
    return this.http.post<ResponseMessage>(this.url + '/saveClient', client);
  }

  saveOwner(owner: Owner): Observable<ResponseMessage>  {
    return this.http.post<ResponseMessage>(this.url + '/saveOwner', owner);
  }

  // login(user: User) {
  //   return this.http.post(this.url + '/login',
  //     JSON.stringify({username: user.username,
  //       password: user.password}),
  //     {observe: 'response'});
  // }


}
