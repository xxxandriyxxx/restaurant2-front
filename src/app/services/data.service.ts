import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private
  // token: string;
  // userClass: string;
  // userId: string;


  passLoginRegExp = new RegExp('^[a-zA-Z0-9]{3,20}$');
  emailRegExp = new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$');
  // phoneRegExp = new RegExp('\(?\d{3}\)?([-\/\.])\d{3}\1\d{4}');
  phoneRegExp = new RegExp('^[0-9]{3,20}$');
  priceRegExp = new RegExp('^[1-9]+(.\\d{1,2})?$');


  // phoneRegExp = new RegExp('^\\+\\d{2}\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$');


  // passRegexp = new RegExp('^[a-zA-Z0-9]+$');


  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({Authorization: localStorage.getItem('_token')});
  }


  // setToken(value: string) {
  //   this.token = value;
  // }
  //
  // getToken(): string {
  //   return this.token;
  // }

  constructor() {
  }
}
