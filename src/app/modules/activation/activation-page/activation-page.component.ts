import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MainService} from '../../../services/main.service';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-activation-page',
  templateUrl: './activation-page.component.html',
  styleUrls: ['./activation-page.component.css']
})
export class ActivationPageComponent implements OnInit {

  activated = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService,
    private dataService: DataService) {
  }

  
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.mainService.activation(params.jwt)
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
