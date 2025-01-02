import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NewsFeedComponent } from '../news-feed/news-feed.component';
import { ScrollBarComponent } from '../scroll-bar/scroll-bar.component';
import { TopGainersLosersComponent } from '../top-gainers-losers/top-gainers-losers.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,NavBarComponent,NewsFeedComponent, TopGainersLosersComponent,  FooterComponent,ScrollBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  firstName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve the username from local storage
    const username = localStorage.getItem('username');

    if (username) {
      this.getUserDetails(username);
    }
  }

  getUserDetails(username: string): void {
    const apiUrl = `http://localhost:8001/api/v1/user/get-by-username/${username}`;
    
    this.http.get<{ firstName: string }>(apiUrl).subscribe(
      (response) => {
        this.firstName = response.firstName;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

}
