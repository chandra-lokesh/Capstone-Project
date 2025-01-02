import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PortfoliostateService } from '../portfoliostate.service';

@Component({
  selector: 'app-add-portfolio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-portfolio.component.html',
  styleUrl: './add-portfolio.component.css',
})
export class AddPortfolioComponent {
  budget: number = 0; // Initial budget
  uid = localStorage.getItem('userId');

  constructor(
    private http: HttpClient,
    private router: Router,
    private portfolioStateService: PortfoliostateService
  ) {}

  createPortfolio() {
    console.log('hello');

    if (this.budget <= 0) {
      alert('Budget must be greater than 0');
      return;
    }

    const portfolioData = {
      budget: this.budget,
      uid: this.uid,
    };

    console.log('portfolio creating ...');

    this.http
      .post(`http://localhost:8001/api/v1/portfolio/save-portfolio`, {
        pid: this.uid,
        uid: this.uid,
        totalStocks: [],
        favouriteStocks: [],
        budget: this.budget,
        totalInvestment: 0,
        totalProfit: 0,
        deleted: false,
      })
      .subscribe({
        next: () => {
          alert('Portfolio added successfully!');
          this.portfolioStateService.setPortfolioAdded(true);
          this.router.navigate(['/dashboard']); // Redirect to homepage
        },
        error: (err) => {
          console.error('Error creating portfolio:', err);
          alert('Failed to create portfolio. Please try again.');
        },
      });
  }
}
