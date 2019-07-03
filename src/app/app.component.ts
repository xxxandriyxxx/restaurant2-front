import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DataService} from './services/data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WINDOW} from './navigation/WindowRef';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [
  //   trigger('fade',
  //     [
  //       state('void', style({opacity: 0})),
  //       transition(':enter', [animate(300)]),
  //       transition(':leave', [animate(500)]),
  //     ]
  //   )]
})
export class AppComponent implements OnInit {

  public navIsFixed = false;

  token: string;
  userClass: string;
  userId: string;
  logged: boolean;

  accountName = 'accountName';


  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) private window
  ) {

    // this.activatedRoute.params.subscribe(params => {
    //   // this.paramsChange(params.id);
    // });


  }


  ngOnInit() {

    // this.router.routeReuseStrategy.shouldReuseRoute = ();
    // {
    //   return false;
    // }
    // ;

    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //     // window.scrollTo(0, 0);
    //   }
    // });


    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.router.navigated = false;

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


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const num = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (num > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && num < 10) {
      this.navIsFixed = false;
    }
  }


  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
  //   console.log(offset);
  // }


  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(e) {
  //   if (window.pageYOffset > 550) {
  //     const element = document.getElementById('navbar');
  //     element.classList.add('sticky');
  //   } else {
  //     const element = document.getElementById('navbar');
  //     element.classList.remove('sticky');
  //   }
  // }

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

  goToAccount() {
    console.log('Go to account !');
    this.router.navigate(['myAccount']);
  }

  logout() {
    localStorage.clear();
    console.log('logout');
    this.router.navigate(['/']);
    // this.ngOnInit();

  }


}
