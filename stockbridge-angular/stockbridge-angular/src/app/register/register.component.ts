import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) {}
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  contact: string = '';

  onSubmit() {
    if (this.username && this.email && this.password && this.contact && this.firstname && this.lastname) { // this.fullname &&
      const registrationData = {
        firstName: this.firstname,
        lastName: this.lastname,
        username: this.username,
        role: 'USER',
        email: this.email,
        password: this.password,
        phoneNumber: this.contact,
        deleted: false
      };


      const portfolioData = 
      {
        pid: 1,
        uid: 1,
        totalStocks: [],
        budget: 0,
        totalInvestment: 0,
        totalProfit: 0,
        deleted: false
      }
      

      console.log('Sending Registration Data:', registrationData);

      this.http.post('http://localhost:9999/api/save', registrationData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          alert('Registration Successful!');
          this.router.navigate(['/login']); 
        },
        error: (error) => {
          console.error('Registration failed:', error);
          const errorMessage = error.error?.message || 'Registration Failed. Please try again.';
          alert(errorMessage);
        },
      });

      let userId: number = 0;
      // console.log(`http://localhost:8001/api/v1/user/get-by-username/${registrationData.username}`);
      
      this.http.get(`http://localhost:9999/api/v1/user/get-by-username/${registrationData.username}`).subscribe({
        next: (response) => {
          console.log(response);
          
        },
        error: (error) =>
          console.log(error)
      })

    } else {
      alert('All fields are required!');
    }
  }
}
