import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  formObj = {
    username: '',
    password: '',
    email: ''
  };


  constructor() {
  }

  ngOnInit() {
  }


}
