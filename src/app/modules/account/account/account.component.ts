import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {BasicData} from '../../../models/BasicData';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {AppComponent} from '../../../app.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css',
    '../../signup/signup-page/signup-page.component.css']
})
export class AccountComponent implements OnInit {

  user: User = new User();
  basicData: BasicData = new BasicData();
  formerEmail = '';
  showChange = false;

  constructor(private mainService: MainService,
              private dataService: DataService,
              private router: Router,
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
          this.formerEmail = this.user.email;
        },
        error => {
          console.log(error);
        });
  }


  updateAccount() {
    const id = localStorage.getItem('_userId');
    this.mainService.updateAccount(id, this.basicData)
      .subscribe((value) => {
          this.appComponent.showModal(value.message);
          if (this.basicData.email !== this.formerEmail) {
            localStorage.clear();
            this.router.navigate(['/']);
          } else {
            this.loadData();
          }
        },
        error => {
          this.appComponent.showModal(error);
        });
  }


}
