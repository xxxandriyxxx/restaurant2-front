import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token: string;
  userClass: string;
  userId: string;
  logged: boolean;

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

        if (this.userClass !== null) {
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
