import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-stocks',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './active-stocks.component.html',
  styleUrl: './active-stocks.component.css',
})
export class ActiveStocksComponent {
  stocks: any[] = [];
  apiKey: string = 'SU8vWVog4OblSS041kxcjonG1iisyqm5';
  baseUrl: string = 'https://financialmodelingprep.com/api/v3';
  backendBaseUrl: string = 'http://localhost:8001/api/v1/portfolio';
  favouriteSymbols: Set<string> = new Set();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchStockData();
  }

  fetchStockData() {
    this.http
      .get(
        `${this.baseUrl}/stock_market/actives?apikey=fI7xHkDf3kaHvWyWePCqqCseQZCO2syS`
      )
      .subscribe((data: any) => {
        this.stocks = (data || []).slice(0, 3);
        this.stocks.forEach((stock) => this.fetchStockLogo(stock));
      });
  }

  fetchStockLogo(stock: any) {
    this.http
      .get(
        `${this.baseUrl}/profile/${stock.symbol}?apikey=SU8vWVog4OblSS041kxcjonG1iisyqm5 `
      )
      .subscribe((profileData: any) => {
        if (profileData && profileData[0] && profileData[0].image) {
          this.checkImage(profileData[0].image, (isValid) => {
            stock.logo = isValid
              ? profileData[0].image
              : 'https://www.accountancyage.com/wp-content/themes/accountancy-age/img/company-placeholder.png'; // Fallback logo
          });
        } else {
          stock.logo =
            'https://www.accountancyage.com/wp-content/themes/accountancy-age/img/company-placeholder.png'; // Fallback logo
        }
      });
  }


  checkImage(url: string, callback: (isValid: boolean) => void) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
  }

  navigateToStockDetails(symbol: string): void {
    this.router.navigate(['/stock-details', symbol]); 
  }

  fetchFavouriteStocks(): void {
    const userId = localStorage.getItem('userId');
    const url = `${this.backendBaseUrl}/get/${userId}`;

    this.http.get<any>(url).subscribe(
      (portfolio) => {
        if (portfolio && portfolio.favouriteStocks) {
          this.favouriteSymbols = new Set(portfolio.favouriteStocks); 
        }
      },
      (error) => {
        console.error('Failed to fetch favorite stocks:', error);
      }
    );
  }

  addToFavorites(symbol: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.favouriteSymbols.has(symbol)) {
      alert(`Stock ${symbol} is already in your watchlist.`);
      return; // Exit early if the stock is already in the watchlist
    }
    const url = `${
      this.backendBaseUrl
    }/add-favourite-stock/${localStorage.getItem('userId')}/${symbol}`;

    this.http.post(url, {}).subscribe(
      (response) => {
        alert(`Stock ${symbol} added to your watchlist.`);
        this.favouriteSymbols.add(symbol);
      },
      (error) => {
        console.error('Error adding stock to watchlist:', error);
        alert(`Failed to add stock ${symbol} to your watchlist.`);
      }
    );
  }
}
