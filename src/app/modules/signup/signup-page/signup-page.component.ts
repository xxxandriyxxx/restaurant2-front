import {Component, OnInit} from '@angular/core';
import {MainService} from '../../../services/main.service';
import {Client} from '../../../models/Client';
import {Owner} from '../../../models/Owner';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  regForm = {
    username: '',
    password: '',
    email: ''
  };
  client: Client = new Client();
  owner: Owner = new Owner();

  constructor(private mainService: MainService) {
  }

  ngOnInit() {
  }

  saveUser(form, isClient: boolean, isOwner: boolean) {
    console.log(this.regForm, isClient, isOwner);
    if (isClient) {
      this.client.username = this.regForm.username;
      this.client.password = this.regForm.password;
      this.client.email = this.regForm.email;
      this.mainService.saveClient(this.client)
        .subscribe((res) => {
        console.log(res);
      });
    } else if (isOwner) {
      this.owner.username = this.regForm.username;
      this.owner.password = this.regForm.password;
      this.owner.email = this.regForm.email;
      this.mainService.saveOwner(this.owner)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      console.log('ERROR of saveUser function');
    }
  }
}
