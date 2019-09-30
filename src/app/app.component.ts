import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DataService} from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  modal;
  token: string;
  userClass: string;
  userId: string;
  logged: boolean;
  responseMessage = '';
  totalAmount = 0;

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    this.modal = document.getElementById('modalMessage');

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.router.navigated = false;

        this.token = localStorage.getItem('_token');
        this.userClass = localStorage.getItem('_userClass');
        this.userId = localStorage.getItem('_userId');

        if (this.userClass == null) {
          this.logged = false;
        } else {
          this.logged = true;
        }
      }
    });
    this.totalAmount = +sessionStorage.getItem('_totalAmount');
  }


  signOut() {
    this.clearLocalStorage();
    this.clearSessionStorage();
    this.changeAmount();
    this.router.navigate(['/']);
  }

  clearSessionStorage() {
    sessionStorage.removeItem('_restaurantId');
    sessionStorage.removeItem('_restaurantName');
    sessionStorage.removeItem('_totalAmount');
    sessionStorage.removeItem('_totalCost');
    sessionStorage.removeItem('_newOrder');
  }

  clearLocalStorage() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_userClass');
    localStorage.removeItem('_userId');
  }


  changeAmount() {
    this.totalAmount = +sessionStorage.getItem('_totalAmount');
  }

  showModal(message: string) {
    this.responseMessage = message;
    this.modal.style.display = 'block';
  }

  closeModal() {
    this.modal.style.display = 'none';
  }
}
