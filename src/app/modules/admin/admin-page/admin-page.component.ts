import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

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
