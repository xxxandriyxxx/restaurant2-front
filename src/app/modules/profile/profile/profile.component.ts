import {Component, OnInit} from '@angular/core';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {User} from '../../../models/User';
import {BasicData} from '../../../models/BasicData';
import {Owner} from '../../../models/Owner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  basicData: BasicData = new BasicData();


  showChange = false;


  constructor(private mainService: MainService,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
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

  updateProfile(form) {
    const id = localStorage.getItem('_userId');
    this.mainService.updateProfile(id, this.basicData)
      .subscribe((value) => {


          console.log(value);
          this.router.navigate(['/owner']);
          // alert(value.message);

        },
        error => {
          console.log(error);
        });

  }


}
