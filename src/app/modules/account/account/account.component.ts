import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {BasicData} from '../../../models/BasicData';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css',
    '../../signup/signup-page/signup-page.component.css']
})
export class AccountComponent implements OnInit {

  user: User = new User();
  basicData: BasicData = new BasicData();
  showChange = false;

  constructor(private mainService: MainService,
              private dataService: DataService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    this.mainService.getUserById(localStorage.getItem('_userId'))
      .subscribe((obj: User) => {
          this.user = obj;
          this.basicData.username = this.user.username;
          this.basicData.email = this.user.email;
        },
        error => {
          console.log(error);
        });
  }


  updateProfile() {
    const id = localStorage.getItem('_userId');
    this.mainService.updateProfile(id, this.basicData)
      .subscribe((value) => {
          this.showChange = false;
          this.basicData.password = null;
          this.appComponent.showModal(value.message);
          this.loadData();
        },
        error => {
          this.appComponent.showModal(error);
        });
  }


}
