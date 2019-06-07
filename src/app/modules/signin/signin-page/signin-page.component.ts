import {Component, OnInit} from '@angular/core';
import {MainService} from '../../../services/main.service';
import {LoginData} from '../../../models/LoginData';

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

  constructor(private mainService: MainService) {
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
    this.mainService.login(this.loginData);
  }


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
