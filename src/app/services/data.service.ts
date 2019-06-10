import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private
  token: string;
  userClass: string;
  userId: string;


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
