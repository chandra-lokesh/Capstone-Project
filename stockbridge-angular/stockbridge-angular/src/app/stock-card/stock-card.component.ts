import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsItem } from '../../model/NewsItem';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {

  uid: any = localStorage.getItem('userId');
  @Input() symbol!: string;

  stockDetails: any = null;
  quantity: number = 1; 
  newsFeed: any[] = []; 
  isModalOpen: boolean = false; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getStockDetails();
    this.getNewsFeed();
  }

  
  getStockDetails(): void {
    const stockApiUrl = `https://financialmodelingprep.com/api/v3/profile/${this.symbol}?apikey=wfO8y5YszLnJ6ih2Gz0JrhMNo0JrwWu5`;
    this.http.get<any[]>(stockApiUrl).subscribe(
      (response) => {
        if (response && response.length) {
          this.stockDetails = response[0]; // Get the first stock profile object
        }
      },
      (error) => {
        console.error('Error fetching stock details:', error);
      }
    );
  }

 
  openBuyPopup(): void {
    this.isModalOpen = true;
  }

 
  closeModal(): void {
    this.isModalOpen = false;
  }

 
  confirmPurchase(): void {
    const parsedQuantity = this.quantity;

    if (parsedQuantity <= 0 || isNaN(parsedQuantity)) {
      alert('Please enter a valid quantity greater than 0');
      return;
    }

    const requestBody = {
      symbol: this.symbol,
      transactions: [
        {
          purchasePrice: this.stockDetails.price,
          quantity: parsedQuantity,
          deleted: false
        }
      ]
    };

    const url = `http://localhost:8001/api/v1/portfolio/add-stock/${this.uid}`;

    this.http.put(url, requestBody).pipe(
      catchError((error) => {
        console.error('Error:', error);
        alert('Failed to buy stock, please try again!');
        return of(null); 
      })
    ).subscribe(response => {
      if (response) {
        console.log('Stock purchased successfully:', response);
        alert('Stock purchased successfully!');
      }
    });

    this.closeModal();
  }

  getNewsFeed(): void {
    const newsApiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo`;
    this.http.get<{ feed: NewsItem[] }>(newsApiUrl).subscribe(
      response => {
        if (Array.isArray(response.feed)) {
          this.newsFeed = response.feed.slice(0, 5); // Get the first 5 items from the feed
        } else {
          console.error("Unexpected response structure: feed is not an array");
        }
      },
      error => {
        console.error('Error fetching news feed:', error);
      }
    );
  }
}
