import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.css']
})
export class OwnerPageComponent implements OnInit {

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
