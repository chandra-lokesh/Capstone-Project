import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-budget-modal',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './add-budget-modal.component.html',
  styleUrls: ['./add-budget-modal.component.css'],
})
export class AddBudgetModalComponent {
  budgetAmount: number = 0;
  isSuccess: boolean = false;

  private apiUrl = 'http://localhost:8001/api/v1/portfolio/add-budget';

  constructor(private http: HttpClient, private router: Router) {}

  submitBudget(): void {
    const pid = localStorage.getItem('userId');
    const url = `${this.apiUrl}/${pid}/${this.budgetAmount}`;

    this.http.post(url, {}).subscribe(
      () => {
        this.isSuccess = true;

        // Redirect after showing success message 
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      (error) => {
        console.error('Failed to add budget:', error);
        alert('An error occurred while adding the budget.');
      }
    );
  }
}
