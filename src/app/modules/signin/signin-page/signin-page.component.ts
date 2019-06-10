import {Component, OnInit} from '@angular/core';
import {MainService} from '../../../services/main.service';
import {LoginData} from '../../../models/LoginData';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/User';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {

  logForm = {
    loginEmail: '',
    password: ''
    // byLogin: false,
    // byEmail: false
  };


  // loginData = {
  //   username: ' ',
  //   email: ' ',
  //   password: ' '
  // };

  loginData: LoginData = new LoginData();

  passLoginRegexp = new RegExp('^[a-zA-Z0-9]{3,20}$');
  emailRegexp = new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$');
  // passRegexp = new RegExp('^[a-zA-Z0-9]+$');

  error = 'aaa';
  showError = false;

  token = '';
  userClass = '';
  userLogged = '';
  loginStatusCode: number = null;


  constructor(private mainService: MainService,
              // private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // console.log(this.passRegexp.source);
  }


  login(form) {
    console.log('LogForm:', this.logForm);
    if (this.emailRegexp.test(this.logForm.loginEmail)) {
      this.loginData.email = this.logForm.loginEmail;
      this.loginData.username = '';
    } else {
      this.loginData.username = this.logForm.loginEmail;
      this.loginData.email = '';
    }
    this.loginData.password = this.logForm.password;
    this.mainService.login(this.loginData)
      .subscribe((value) => {
          const token = value.headers.get('Authorization');
          const userClass = value.headers.get('UserClass');
          const userId = value.headers.get('UserId');
          const loginStatusCode = Number(value.headers.get('LoginStatusCode')); // +'string'
          console.log('token: ' + token);
          console.log('userClass: ' + userClass);
          console.log('userId: ' + userId);
          console.log('loginStatusCode: ' + loginStatusCode);
          console.log(value.body);
          localStorage.setItem('_token', token);
          localStorage.setItem('_userClass', userClass);
          localStorage.setItem('_userId', userId);
          if (!(loginStatusCode >= 200 && loginStatusCode < 400)) {
            this.error = value.body;
            this.showError = true;
            this.router.navigate(['sign-in']);
          } else {
            this.router.navigate(['/']);
          }

        },
        error => {
          console.log(error);
        });


  }


  // login(form) {
  //   console.log('LogForm:', this.logForm);
  //   if (this.emailRegexp.test(this.logForm.loginEmail)) {
  //     this.loginData.email = this.logForm.loginEmail;
  //     this.loginData.username = '';
  //   } else {
  //     this.loginData.username = this.logForm.loginEmail;
  //     this.loginData.email = '';
  //   }
  //   this.loginData.password = this.logForm.password;
  //   this.mainService.login(this.loginData)
  //     .subscribe((value) => {
  //         const token = value.headers.get('Authorization');
  //         this.dataService.setToken(token);
  //         this.dataService.userClass = value.headers.get('UserClass');
  //         this.dataService.userId = value.headers.get('UserId');
  //         const loginStatusCode = Number(value.headers.get('LoginStatusCode')); // +'string'
  //         console.log('datatoken: ' + this.dataService.getToken());
  //         console.log('userClass: ' + this.dataService.userClass);
  //         console.log('userId: ' + this.dataService.userId);
  //         console.log('loginStatusCode: ' + loginStatusCode);
  //         console.log(value.body);
  //         if (!(loginStatusCode >= 200 && loginStatusCode < 400)) {
  //           this.error = value.body;
  //           this.showError = true;
  //           this.router.navigate(['sign-in']);
  //         } else {
  //           this.router.navigate(['home']);
  //         }
  //
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //
  //
  // }


  // login(form) {
  //   console.log('LogForm:', this.logForm);
  //   if (this.emailRegexp.test(this.logForm.loginEmail)) {
  //     this.loginData.email = this.logForm.loginEmail;
  //     this.loginData.username = '';
  //   } else {
  //     this.loginData.username = this.logForm.loginEmail;
  //     this.loginData.email = '';
  //   }
  //   this.loginData.password = this.logForm.password;
  //   this.mainService.login(this.loginData)
  //     .subscribe((value) => {
  //         const token = value.headers.get('Authorization');
  //         const userClass = value.headers.get('UserClass');
  //         const userId = value.headers.get('UserId');
  //         // const userLogged = value.headers.get('UserLogged');
  //         const loginStatusCode = Number(value.headers.get('LoginStatusCode')); // +'string'
  //         localStorage.setItem('_token', token);
  //         console.log('token: ' + token);
  //         console.log('userClass: ' + userClass);
  //         console.log('userId: ' + userId);
  //         console.log('loginStatusCode: ' + loginStatusCode);
  //         console.log(value.body);
  //
  //         if (!(loginStatusCode >= 200 && loginStatusCode < 400)) {
  //           this.error = value.body;
  //           this.showError = true;
  //           this.router.navigate(['sign-in']);
  //         } else {
  //           this.router.navigate(['/']
  //             , {
  //               queryParams: {
  //                 // userclass: userClass,
  //                 // userid: userId,
  //                 // after: 'login'
  //                 text : 'success'
  //               }
  //             }
  //           );
  //         }
  //
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //
  //
  // }

  //
  // login(form) {
  //   this.logForm.byLogin = this.loginRegex.test(this.logForm.loginEmail);
  //   this.logForm.byEmail = this.emailRegex.test(this.logForm.loginEmail);
  //   console.log('LogForm:', this.logForm);
  //   this.mainService.login(this.logForm).subscribe(value => {
  //       const token = value.headers.get('Authorization');
  //       const userClass = value.headers.get('UserClass');
  //       const userLogged = value.headers.get('UserLogged');
  //       localStorage.setItem('_token', token);
  //       console.log(token);
  //       console.log(userClass);
  //       console.log(userLogged);
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }

  // login(form) {
  //   this.logForm.byLogin = this.loginRegex.test(this.logForm.loginEmail);
  //   this.logForm.byEmail = this.emailRegex.test(this.logForm.loginEmail);
  //   console.log('LogForm:', this.logForm);
  //   this.mainService.login(this.logForm)
  // .subscribe(value => {
  //   const token = value.headers.get('Authorization');
  //   const userClass = value.headers.get('UserClass');
  //   const userLogged = value.headers.get('UserLogged');
  //   localStorage.setItem('_token', token);
  //   console.log(token);
  //   console.log(userClass);
  //   console.log(userLogged);
  // },
  // error => {
  //   console.log(error);
  // });
  // }


}
