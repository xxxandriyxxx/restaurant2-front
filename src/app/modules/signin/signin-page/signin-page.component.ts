import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {

  logForm = {
    username: '',
    password: '',
    email: ''
  };

  show = true;

  constructor() {

    // setTimeout(
    //   () => {
    //     this.show = true;
    //   }, 3000);

  }

  ngOnInit() {
  }

  login(form, byLogin: boolean, byEmail: boolean) {
    console.log(this.logForm, byLogin, byEmail);
  }
}
