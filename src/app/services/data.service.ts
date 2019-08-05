import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public passLoginRegExp = new RegExp('^[a-zA-Z0-9]{3,20}$');
  public emailRegExp = new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$');
  public priceRegExp = new RegExp('^\\d+(\\.\\d{1,2})?$');
  public siteRegExp = new RegExp('[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)');
  phoneRegExp = new RegExp('^\\+\\d{2}\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$');

  constructor() {
  }


  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({Authorization: localStorage.getItem('_token')});
  }


}
