import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule,CommonModule],

  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})



export class UserDetailsComponent implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
  };

  isEditing: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Get username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
    
      this.http
        .get<any>(`http://localhost:8001/api/v1/user/get-by-username/${storedUsername}`)
        .subscribe({
          next: (data) => {
            
            this.user = {
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              username: data.username || '',
              email: data.email || '',
              phoneNumber: data.phoneNumber || '',
            };
          },
          error: (err) => {
            console.error('Error fetching user details:', err);
            alert('Failed to fetch user details.');
          },
        });
    } else {
      alert('Username not found in local storage.');
    }
  }

 
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      
      this.ngOnInit();
    }
  }

  
  submitDetails() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.http
        .put(`http://localhost:8001/api/v1/user/update/${storedUsername}`, this.user)
        .subscribe({
          next: () => {
            alert('All changes saved successfully!');
            this.router.navigate(['/home-page']);
          },
          error: (err) => {
            console.error('Error saving changes:', err);
            alert('Failed to save changes. Please try again.');
          },
        });
    } else {
      alert('Username not found in local storage.');
    }

  }
}
