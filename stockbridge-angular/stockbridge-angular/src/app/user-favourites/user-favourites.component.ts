import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-favourites',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-favourites.component.html',
  styleUrls: ['./user-favourites.component.css']
})
export class UserFavouritesComponent {
  stockDetails: any[] = [];

  portfolioId = localStorage.getItem("userId");
  apiUrl = `http://localhost:8001/api/v1/portfolio/get/${this.portfolioId}`;
  removeUrl = `http://localhost:8001/api/v1/portfolio/remove-favourite-stock/${this.portfolioId}`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchFavouriteStocks();
  }

  fetchFavouriteStocks(): void {
    this.http.get<any>(this.apiUrl).subscribe((portfolio) => {
      if (portfolio && portfolio.favouriteStocks) {
        portfolio.favouriteStocks.forEach((symbol: string) => {
          this.http
            .get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=abAFrO4BJZSqXTcEvaMLaGh2vdRctZLG`)
            .subscribe((data: any) => {
              if (data && data.length > 0) {
                const logoUrl = data[0].image;
                this.checkImage(logoUrl, (isValid) => {
                  this.stockDetails.push({
                    symbol: symbol,
                    logo: isValid ? logoUrl : 'https://www.accountancyage.com/wp-content/themes/accountancy-age/img/company-placeholder.png', // Fallback logo
                    name: data[0].companyName,
                    price: data[0].price,
                    changes: data[0].changes,
                    changesPercentage: ((data[0].changes / data[0].price) * 100).toFixed(2),
                  });
                });
              }
            });
        });
      }
    });
  }

  // Check if the image URL is valid
  checkImage(url: string, callback: (isValid: boolean) => void) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
  }

  removeFavouriteStock(symbol: string): void {
    this.http.delete(`${this.removeUrl}/${symbol}`).subscribe(() => { 
      this.stockDetails = this.stockDetails.filter((stock) => stock.symbol !== symbol);
    });
  }

 

  navigateToStockDetails(symbol: string): void {
    this.router.navigate(['/stock-details', symbol]); // Navigate to 'stock/:symbol'
  }
}
