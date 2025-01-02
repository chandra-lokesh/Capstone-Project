import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  username: string = '';

  ngOnInit(): void {
    // Fetch the username from localStorage 
    this.username = localStorage.getItem('username') || 'Guest';
  }

  constructor(private router: Router) {}

  viewDetails(): void {
    this.router.navigate(['/user-details']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  navigateToLearn(): void
  {
    if (this.checkGuestAccess())
      this.router.navigate(['/learn']);
  }

  navigateToExplore(): void
  {
    if (this.checkGuestAccess())
      this.router.navigate(['/search-page']);
  }

  navigateToDashboard(): void
  {
    if (this.checkGuestAccess())
      this.router.navigate(['/dashboard']);
  }

  private checkGuestAccess(): boolean {
    if (this.username === 'Guest') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }  


}
