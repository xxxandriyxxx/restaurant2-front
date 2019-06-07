import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Client} from '../models/Client';
import {Observable} from 'rxjs';
import {Owner} from '../models/Owner';
import {TransferMessage} from '../models/TransferMessage';
import {User} from '../models/User';
import {catchError} from 'rxjs/operators';
import {LoginData} from '../models/LoginData';


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
    private http: HttpClient
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

  login(loginData: LoginData) {this.http.post(this.url + '/tryLogin', loginData)
      .subscribe((res) => {
        console.log(res);
      });
  }



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
