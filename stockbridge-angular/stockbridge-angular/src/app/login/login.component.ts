import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { PortfoliostateService } from '../portfoliostate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = ''; 
  password: string = '';
  token:string='';
  errorMessage: string = '';
  constructor(private http: HttpClient, private router: Router, private portfoliostate: PortfoliostateService) {}

  onLogin() {
    if (this.username && this.password) {
      const loginData = {
        username: this.username, 
        password: this.password
      };

      console.log('Logging in with:', loginData);

     
      this.http.post('http://localhost:9999/api/auth/login', loginData).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);

          
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('username', response.username);
          this.portfoliostate.setPortfolioAdded(false);

          this.router.navigate(['/home-page']); // Navigate to a dashboard or home page
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage =
            error.error?.message || 'Invalid username or password. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }

    
  }
}
