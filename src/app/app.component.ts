import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  constructor(private http: HttpClient) {

  }





  login() {
    this.http.post('http://localhost:8080/login',
      JSON.stringify({username: 'admin', password: 'admin'}),
      {observe: 'response'}).subscribe(value => {
      const token = value.headers.get('Authorization');
      console.log(token);
      console.log(value);

      localStorage.setItem('_token', token);
    });
  }

  getInfo() {
    const headersOption = new HttpHeaders({'Authorization': localStorage.getItem('_token')});
    // 'Authorization' в Сергія з лапками, хоче без лапок і працює теж
    this.http.get('http://localhost:8080/get', {headers: headersOption, responseType: 'text'}).subscribe(value => console.log(value));
    // this.http.get('http://localhost:8080/get', {responseType: 'text'}).subscribe(value => console.log(value));
  }

}
