import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../services/data.service';
import {Restaurant} from '../../../models/Restaurant';
import {Owner} from '../../../models/Owner';
import {MainService} from '../../../services/main.service';
import {User} from '../../../models/User';

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.css']
})
export class OwnerPageComponent implements OnInit {


  // id = null;
  // username = '';
  // password = '';
  // email = '';
  // avatar = '';
  // restaurants: Restaurant [] = [];


  constructor(private mainService: MainService,
              private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {

  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
