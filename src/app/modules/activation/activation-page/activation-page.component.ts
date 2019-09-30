import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../services/data.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-activation-page',
  templateUrl: './activation-page.component.html',
  styleUrls: ['./activation-page.component.css']
})
export class ActivationPageComponent implements OnInit {

  activated = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private dataService: DataService) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.userService.activation(params.jwt)
        .subscribe((res) => {
            console.log(res);
            if (res.message.indexOf('SUCCESS') > -1) {
              this.activated = true;
            }
          },
          error => {
            console.log(error);
          });
    });
  }

}
