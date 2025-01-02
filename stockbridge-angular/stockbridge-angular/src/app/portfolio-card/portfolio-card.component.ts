import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddBudgetModalComponent } from '../add-budget-modal/add-budget-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio-card',
  standalone: true,
  imports: [CommonModule, AddBudgetModalComponent,FormsModule],
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.css'], // Ensure the file path is correct
})
export class PortfolioCardComponent implements OnInit {
  budgetAmount: number = 0;
  totalBalance: number = 0;
  investmentAmount: number = 0;
  profitLoss: number = 0;

  storedId = localStorage.getItem('userId');

  private apiUrl = `http://localhost:8001/api/v1/portfolio/get/${this.storedId}`; 
  private addBudgetUrl = 'http://localhost:8001/api/v1/portfolio/add-budget'; 

 

  showAddBudgetModal: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPortfolioData();
  }

  fetchPortfolioData(): void {
    // console.log(`http://localhost:8001/api/v1/portfolio/get/${this.storedId}`);
    
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        console.log(response);
        this.totalBalance = response.budget || 0;
        this.investmentAmount = response.totalInvestment || 0;
        this.profitLoss = response.totalProfit || 0;
      },
      (error) => {
        console.error('Error fetching portfolio data:', error);
      }
    );
  }

  viewTransactions(): void {
    console.log('View Transactions clicked');
    
  }
  
  
  openAddBudgetModal(): void {
    this.showAddBudgetModal = true;
  }

  closeAddBudgetModal(): void {
    this.showAddBudgetModal = false;
  }

  handleBudgetSubmission(budgetAmount: number): void {
    if (budgetAmount > 0) {
      
      this.http.post(`${this.addBudgetUrl}/${this.storedId}/${budgetAmount}`, null).subscribe( 
        () => {
          alert('Budget added successfully!');
          this.fetchPortfolioData(); 
          this.closeAddBudgetModal(); 
        },
        (error) => {
          console.error('Error adding budget:', error);
          alert('Failed to add budget. Please try again.');
        }
      );
    } else {
      alert('Invalid budget amount. Please enter a positive value.');
    }
  }


}



