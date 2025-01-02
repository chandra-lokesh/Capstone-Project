import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Stock } from '../../model/Stock'; 
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-stocks',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-stocks.component.html',
  styleUrls: ['./user-stocks.component.css']
})
export class UserStocksComponent {

  constructor(private http: HttpClient, private router: Router) {}

  portfolioId = localStorage.getItem("userId");  // Your portfolio ID
  private url = `http://localhost:8001/api/v1/portfolio/get/${this.portfolioId}`;  

  isLoading = false;
  errorMessage: string | null = null;

  stocks: Stock[] = []; 

  // Popup properties
  isPopupVisible: boolean = false;
  selectedStockSymbol: string = '';
  selectedStockQuantity: number = 0;

  ngOnInit(): void {
    this.getStockData();
  }

  getStockData(): void {
    this.isLoading = true;

    this.http.get<any>(this.url).subscribe(
      response => {
        this.isLoading = false;
        this.processStocks(response); 
      },
      error => {
        this.isLoading = false;
        this.errorMessage = "Failed to load data. Please try again later.";
        console.error(error);
      }
    );
  }

  processStocks(response: any): void {
    const stockSymbols = response.totalStocks.map((stock: any) => stock.symbol);
  
    stockSymbols.forEach((symbol: string) => {
      this.getCurrentPrice(symbol).subscribe((stockDetails) => {
        const currentPrice = stockDetails.price;
        const companyName = stockDetails.companyName;
        const companyImageUrl = stockDetails.companyImageUrl;
  
        const stock = response.totalStocks.find((stock: any) => stock.symbol === symbol);
  
        if (stock.transactions && stock.transactions.length > 0) {
  

          const maxPurchasePrice = stock.transactions.reduce((max: number, transaction: any) => {
            return Math.max(max, transaction.purchasePrice || 0);
          }, 0);
  
          const totalQuantity = stock.transactions.reduce(
            (total: number, transaction: any) => total + transaction.quantity,
            0
          );

          let profit = (stock.transactions.reduce(
            ((total:number, transaction:any) => total + ((currentPrice- transaction.purchasePrice || 0) * transaction.quantity)),0)).toFixed(2);

          console.log(stock);
          
          this.checkImage(companyImageUrl, (isValid) => {
            this.stocks.push({
              logo: isValid 
                ? companyImageUrl 
                : 'https://www.accountancyage.com/wp-content/themes/accountancy-age/img/company-placeholder.png', // Fallback logo
              name: companyName,
              symbol: stock.symbol,
              purchasedPrice: maxPurchasePrice,
              quantity: totalQuantity,
              currentPrice: currentPrice,
              profit: profit
            });
          });
        } else {
          this.checkImage(companyImageUrl, (isValid) => {
            this.stocks.push({
              logo: isValid 
                ? companyImageUrl 
                : 'https://www.accountancyage.com/wp-content/themes/accountancy-age/img/company-placeholder.png', // Fallback logo
              name: companyName,
              symbol: stock.symbol,
              purchasedPrice: 0,
              quantity: 0,
              currentPrice: currentPrice,
              profit: 0,
            });
          });
        }
      });
    });
  }


  checkImage(url: string, callback: (isValid: boolean) => void) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
  }

  getCurrentPrice(symbol: string) {
    const apiUrl = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=O1TvtiQ93vKN1RnWYP6fp0MdsVXrdqnb`;
    return this.http.get<any[]>(apiUrl).pipe(
      map((response) => {
        return {
          price: response[0].price,  
          companyName: response[0].companyName, 
          companyImageUrl: response[0].image  
        };
      })
    );
  }

  navigateToStockDetails(symbol: string): void {
    this.router.navigate(['/stock-details', symbol]); // Navigate to 'stock/:symbol'
  }

  openSellPopup(stock: Stock): void {
    this.selectedStockSymbol = stock.symbol;
    this.selectedStockQuantity = stock.quantity;
    this.isPopupVisible = true;
  }


  closePopup(): void {
    this.isPopupVisible = false;
  }

  confirmSell(): void {
    if (this.selectedStockQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const url = `http://localhost:8001/api/v1/portfolio/remove-stock/${this.portfolioId}/${this.selectedStockSymbol}/${this.selectedStockQuantity}`;
    
    this.http.put(url, null).subscribe({
      next: () => {
        alert(`Sold ${this.selectedStockQuantity} stocks of ${this.selectedStockSymbol}!`);
        this.stocks = this.stocks.filter(stock => stock.symbol !== this.selectedStockSymbol); // Remove sold stock from the list
        this.closePopup(); 
      },
      error: (err) => {
        console.error("Error selling stock:", err);
        alert(`Failed to sell stock ${this.selectedStockSymbol}. Please try again.`);
      }
    });
  }


  sellStock(symbol: string): void {
    this.openSellPopup({ symbol: symbol, quantity: 0 } as Stock);
  }
}