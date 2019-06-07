import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MainService} from '../../../services/main.service';

@Component({
  selector: 'app-activation-page',
  templateUrl: './activation-page.component.html',
  styleUrls: ['./activation-page.component.css']
})
export class ActivationPageComponent implements OnInit {

  private activated = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService
  ) {
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params.jwt);

    this.mainService.activation(this.activatedRoute.snapshot.params.jwt)
      .subscribe((res) => {
        console.log(res);
        if (res.message.indexOf('SUCCESS') > -1) {
          this.activated = true;
        }
      });
  }

}
