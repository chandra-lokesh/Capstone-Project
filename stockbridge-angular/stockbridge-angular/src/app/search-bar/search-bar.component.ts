import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchResult } from '../../model/SearchResult'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl('');
  backendBaseUrl: string = 'http://localhost:8001/api/v1/portfolio';
  allStocks: SearchResult[] = [];
  loading = false;
  readonly MAX_RESULTS = 3; 
  favouriteSymbols: Set<string> = new Set();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  fetchAllStocks() {
    const query = this.searchControl.value?.trim();
    if (!query) return;

    this.loading = true;
    this.allStocks = []; // Clear previous results

    this.http
      .get<any[]>(`https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=LJ6fDgxa9to6iHigPs8yzeoSRbRoTPp1`)
      .subscribe({
        next: (stocks) => {
          if (stocks.length === 0) {
            this.loading = false;
            return;
          }
          this.processStocks(stocks);
        },
        error: (err) => {
          console.error('Error fetching stocks:', err);
          this.loading = false;
        },
      });
  }

  processStocks(stocks: any[]) {
    let validResults = 0;
    let currentIndex = 0;

    const fetchStockProfile = () => {
    
      if (validResults >= this.MAX_RESULTS || currentIndex >= stocks.length) {
        this.loading = false;
        return;
      }

      const stock = stocks[currentIndex++];
      const sanitizedSymbol = stock.symbol.includes('.')
        ? stock.symbol.replace('.', '-')
        : stock.symbol;

      this.http
        .get<any[]>(`https://financialmodelingprep.com/api/v3/profile/${sanitizedSymbol}?apikey=XPxE3IQ2p1k5zm7q7iQpTvyQcLl5CmXA`)
        .subscribe({
          next: (profileData) => {
            if (profileData && profileData.length > 0) {
              const profile = profileData[0];
              this.checkImage(profile.image, (isValid) => {
                const searchResult: SearchResult = this.createSearchResult(profile, isValid);
                this.allStocks.push(searchResult);
                validResults++;
                fetchStockProfile(); 
              });
            } else {
              console.warn(`No valid data for stock: ${stock.symbol}`);
              fetchStockProfile(); 
            }
          },
          error: (err) => {
            console.error(`API error for stock ${stock.symbol}:`, err);
            fetchStockProfile(); 
          },
        });
    };

    fetchStockProfile(); 
  }

  checkImage(url: string, callback: (isValid: boolean) => void) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
  }

  createSearchResult(profile: any, isValid: boolean): SearchResult {
    return {
      logo: isValid 
        ? profile.image 
        : 'https://www.accountancyage.com/wp-content/themes/accountancy-age/img/company-placeholder.png',
      name: profile.companyName || 'N/A',
      symbol: profile.symbol || 'N/A',
      price: profile.price !== undefined ? `${profile.price.toFixed(2)}` : 'N/A',
      changePercentage: profile.changes !== undefined
        ? `${profile.changes >= 0 ? '+' : ''}${profile.changes.toFixed(2)}%`
        : 'N/A',
    };
  }

  navigateToStockDetails(symbol: string): void {
    this.router.navigate(['/stock-details', symbol]); // Navigate to 'stock/:symbol'
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
     
    const url = `${this.backendBaseUrl}/add-favourite-stock/${localStorage.getItem('userId')}/${symbol}`;

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
