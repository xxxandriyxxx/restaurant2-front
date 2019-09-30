import {Component, OnInit} from '@angular/core';
import {MainService} from '../../../services/main.service';
import {Client} from '../../../models/Client';
import {Owner} from '../../../models/Owner';
import {DataService} from '../../../services/data.service';
import {AppComponent} from '../../../app.component';

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


  constructor(private mainService: MainService,
              private dataService: DataService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
  }

  saveUser(isClient: boolean, isOwner: boolean) {
    if (isClient) {
      this.client.username = this.regForm.username;
      this.client.password = this.regForm.password;
      this.client.email = this.regForm.email;
      this.mainService.saveClient(this.client)
        .subscribe((value) => {
            this.appComponent.showModal(value.message);
          },
          error => {
            this.appComponent.showModal(error);
          });
    } else if (isOwner) {
      this.owner.username = this.regForm.username;
      this.owner.password = this.regForm.password;
      this.owner.email = this.regForm.email;
      this.mainService.saveOwner(this.owner)
        .subscribe((value) => {
            this.appComponent.showModal(value.message);
          },
          error => {
            this.appComponent.showModal(error);
          });
    } else {
      console.log('ERROR of saveUser function');
    }
  }
}
