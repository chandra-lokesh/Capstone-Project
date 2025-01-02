import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NewsItem } from '../../model/NewsItem';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './news-feed.component.html',
  styleUrl: './news-feed.component.css'
})
export class NewsFeedComponent {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }
  
  private url = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo";

  newsList: NewsItem[] = [];

  isLoading = false;
  errorMessage: string | null = null;



  getData(): void {
    this.http.get<{ feed: NewsItem[] }>(this.url).subscribe(
      response => {
      
        if (Array.isArray(response.feed)) {
          this.newsList = response.feed.slice(0, 3); 
        } else {
          console.error("Unexpected response structure: feed is not an array");
        }
        console.log(this.newsList);
      },
      error => {
        this.errorMessage = "Failed to load news. Please try again later.";
        this.isLoading = false;
        console.error(error);
      }
    );
  }
  

  

}
