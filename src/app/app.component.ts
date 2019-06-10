import {Component, OnChanges, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {User} from './models/User';
import {switchMap} from 'rxjs/operators';
import {Client} from './models/Client';
import {Owner} from './models/Owner';
import {DataService} from './services/data.service';
import {SigninPageComponent} from './modules/signin/signin-page/signin-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token: string;
  userClass: string;
  userId: string;
  logged = false;

  accountName = 'accountName';


  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {


  }


  ngOnInit() {


    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        // console.log(e);


        this.token = localStorage.getItem('_token');
        this.userClass = localStorage.getItem('_userClass');
        this.userId = localStorage.getItem('_userId');
        console.log('this.token: ' + this.token);
        console.log('this.userClass: ' + this.userClass);
        console.log('this.userId: ' + this.userId);

        if (!(this.userClass === null)) {
          this.logged = true;
          this.accountName = this.userClass;
        } else {
          this.logged = false;
        }
        console.log('logged: ' + this.logged);
      }
    });

  }


  // ngOnInit() {
  //   // const jwt = this.activatedRoute.snapshot.params.jwt;
  //   console.log('ngOnInit before subscribe');
  //
  //
  //
  //   this.activatedRoute.queryParams.subscribe((params) => {
  //     // if (params.after === 'login') {
  //     //   this.userClass = params.userclass;
  //     //   this.userId = Number(params.userid);
  //     //   this.logged = true;
  //     // }
  //     // if (params.after === 'logout') {
  //     //   this.userClass = '';
  //     //   this.userId = null;
  //     //   this.logged = false;
  //     // }
  //     console.log('ngOnInit');
  //     // console.log('userClass: ' + this.userClass);
  //     // console.log('userId: ' + this.userId);
  //   });
  // }


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

// getInfo() {
//   const headersOption = new HttpHeaders({'Authorization': localStorage.getItem('_token')});
//   // 'Authorization' в Сергія з лапками, хоче без лапок і працює теж
//   this.http.get('http://localhost:8080/get', {headers: headersOption, responseType: 'text'}).subscribe(value => console.log(value));
//   // this.http.get('http://localhost:8080/get', {responseType: 'text'}).subscribe(value => console.log(value));
// }

  goToClientAccount() {
    console.log('Go to CLIENT account !');
    this.router.navigate(['client']);
  }

  goToOwnerAccount() {
    console.log('Go to OWNER account !');
    this.router.navigate(['owner']);
  }

  goToAdminAccount() {
    console.log('Go to ADMIN account !');
    this.router.navigate(['admin']);
  }
}
