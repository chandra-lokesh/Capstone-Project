import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { TopPerformerItem } from '../../model/TopPerformerItem';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-gainers-losers',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './top-gainers-losers.component.html',
  styleUrl: './top-gainers-losers.component.css'
})
export class TopGainersLosersComponent {
  backendBaseUrl: string = 'http://localhost:8001/api/v1/portfolio';

  isTopGainersSelected: boolean = true;
  topGainers: TopPerformerItem[] = [];
  topLosers: TopPerformerItem[] = [];
  selectedStocks: TopPerformerItem[] = [];
  favouriteSymbols: Set<string> = new Set(); 

  isLoading = true;  
  errorMessage: string | null = null;

  private gainersUrl = "https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=ox4M0mIE6B3mOzG6oNLl4vqCfmtjJwev";
  private losersUrl = "https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=3llTujA8PkxBmnSZ8x1HCGKQxXDkSRKE";
  private imageUrl = "https://financialmodelingprep.com/api/v3/profile/";


  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.getData();
  }


  getData(): void {
 
    forkJoin([
      this.http.get<any>(this.gainersUrl),
      this.http.get<any>(this.losersUrl)
    ]).subscribe(
      ([gainersResponse, losersResponse]) => {
        this.topGainers = (gainersResponse || []).slice(0, 3); 
        this.topLosers = (losersResponse || []).slice(0, 3); 
        
        
        const logoRequests = this.topGainers.map(stock => 
          this.http.get<any>(`${this.imageUrl}/${stock.symbol}?apikey=pevGoECHGn8UiWcyOX81LFWoWxE0YRkA`)

        );
  
        forkJoin(logoRequests).subscribe(
          logoResponses => {
          
            logoResponses.forEach((response, index) => {
              const imageUrl = response[0]?.image || ''; 
              this.checkImage(imageUrl, isValid => {
                this.topGainers[index].logo = isValid 
                  ? imageUrl 
                  : 'https://www.accountancyage.com/wp-content/themes/accountancy-age/img/company-placeholder.png'; 
              });
            });
            this.isLoading = false;  // Set loading to false once data is fetched
            this.selectedStocks = this.topGainers;  // Default to displaying top gainers
          },
          logoError => {
            this.errorMessage = "Failed to load logos. Please try again later.";
            console.error(logoError);
          }
        );
      },
      error => {
        this.errorMessage = "Failed to load stock data. Please try again later.";
        this.isLoading = false;
        console.error(error);
      }
    );
  }
  
  checkImage(url: string, callback: (isValid: boolean) => void) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
  }
  

  selectTopGainers(): void {
    this.isTopGainersSelected = true;
    this.selectedStocks = this.topGainers;
  }

  selectTopLosers(): void {
    this.isTopGainersSelected = false;
    this.selectedStocks = this.topLosers;
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
          this.favouriteSymbols = new Set(portfolio.favouriteStocks); // Populate the set with favorite stock symbols
        }
      },
      (error) => {
        console.error('Failed to fetch favorite stocks:', error);
      }
    );
  }

  addToFavorites(symbol: string, event: MouseEvent): void {
    event.stopPropagation(); // Prevent triggering stock details navigation

    if (this.favouriteSymbols.has(symbol)) {
      alert(`Stock ${symbol} is already in your watchlist.`);
      return; // Exit early if the stock is already in the watchlist
    }

    const url = `${this.backendBaseUrl}/add-favourite-stock/${localStorage.getItem('userId')}/${symbol}`;

    this.http.post(url, {}).subscribe(
      (response) => {
        alert(`Stock ${symbol} added to your watchlist.`);
        this.favouriteSymbols.add(symbol); // Add to the set after successful addition
      },
      (error) => {
        console.error('Error adding stock to watchlist:', error);
        alert(`Failed to add stock ${symbol} to your watchlist.`);
      }
    );
  }


   
}