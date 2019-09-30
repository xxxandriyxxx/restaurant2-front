import {Component, OnInit} from '@angular/core';
import {BasicData} from '../../../models/BasicData';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../services/data.service';
import {AppComponent} from '../../../app.component';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css',
    '../../signup/signup-page/signup-page.component.css']
})
export class SigninPageComponent implements OnInit {

  logForm = {
    loginEmail: '',
    password: ''
  };
  basicData: BasicData = new BasicData();

  constructor(private userService: UserService,
              private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
  }


  signIn() {
    if (this.dataService.emailRegExp.test(this.logForm.loginEmail)) {
      this.basicData.email = this.logForm.loginEmail;
      this.basicData.username = '';
    } else {
      this.basicData.username = this.logForm.loginEmail;
      this.basicData.email = '';
    }
    this.basicData.password = this.logForm.password;
    this.userService.login(this.basicData)
      .subscribe((value) => {
          const token = value.headers.get('Authorization');
          const userClass = value.headers.get('UserClass');
          const userId = value.headers.get('UserId');
          const loginStatusCode = Number(value.headers.get('LoginStatusCode')); // +'string'

          if (loginStatusCode >= 200 && loginStatusCode < 400) {
            localStorage.setItem('_token', token);
            localStorage.setItem('_userClass', userClass);
            localStorage.setItem('_userId', userId);
            this.router.navigate(['/']);
          } else {
            this.appComponent.showModal(value.body);
            this.router.navigate(['sign-in']);
          }
        },
        error => {
          this.appComponent.showModal(error);
        });
  }


}
