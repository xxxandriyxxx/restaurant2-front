import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }


}
