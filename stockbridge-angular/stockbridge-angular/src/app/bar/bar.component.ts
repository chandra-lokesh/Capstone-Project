import { Component } from '@angular/core';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {
}
 
//     investmentAmount: number = 0;
  
//     // Bar chart data
//     barChartLabels: Label[] = ['Investment vs Budget'];
//     barChartData: ChartDataSets[] = [
//       { data: [0], label: 'Investment Amount', backgroundColor: 'rgba(0, 204, 0, 0.6)' } // Green color for the investment
//     ];
//     barChartOptions: ChartOptions = {
//       responsive: true,
//       scales: {
//         x: { 
//           beginAtZero: true, 
//           max: 100 // Ensure the maximum value is 100% for percentage representation
//         },
//         y: {
//           display: false // Hide the Y axis for a clean horizontal chart
//         }
//       }
//     };
//     barChartLegend = false;
//     chartType: ChartType = 'horizontalBar'; // Horizontal bar chart
  
//     private apiUrl = 'http://localhost:8001/api/v1/portfolio/get/3'; // Update with the correct endpoint
  
//     constructor(private http: HttpClient) {}
  
//     ngOnInit(): void {
//       this.fetchPortfolioData();
//     }
  
//     fetchPortfolioData(): void {
//       this.http.get<any>(this.apiUrl).subscribe(
//         (response) => {
//           this.totalBalance = response.budget || 0;
//           this.investmentAmount = response.totalInvestment || 0;
  
//           // Calculate the percentage of investment out of the total budget
//           const investmentPercentage = (this.investmentAmount / this.totalBalance) * 100;
  
//           // Update the chart data to reflect the investment percentage
//           this.barChartData = [
//             {
//               data: [investmentPercentage],  // Only one bar for the investment
//               label: 'Investment Amount',
//               backgroundColor: 'rgba(0, 204, 0, 0.6)', // Green color
//             }
//           ];
//         },
//         (error) => {
//           console.error('Error fetching portfolio data:', error);
//         }
//       );
//     }

// }
