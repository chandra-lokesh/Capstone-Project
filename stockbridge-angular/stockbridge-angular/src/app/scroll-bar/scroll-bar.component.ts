import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-bar.component.html',
  styleUrl: './scroll-bar.component.css'
})
export class ScrollBarComponent implements OnInit, AfterViewInit {
  stocks: any[] = [];
  apiKey: string = 'IXttDcr5LCXvNVxjtmqJxI3VF2KiwQPj';
  baseUrl: string = 'https://financialmodelingprep.com/api/v3';
  @ViewChild('ticker', { static: false }) ticker!: ElementRef<HTMLDivElement>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStockData();
  }

  ngAfterViewInit() {
    setTimeout(() => this.autoScroll(), 1000); 
  }

  fetchStockData() {
    this.http.get(`${this.baseUrl}/stock_market/actives?apikey=${this.apiKey}`).subscribe((data: any) => {
      this.stocks = (data || []).slice(0, 10); // Limit to 10 stocks
    });
  }

  autoScroll() {
    const ticker = this.ticker.nativeElement;
  
    if (ticker.scrollWidth <= ticker.clientWidth) {
      console.warn('Ticker content is not wide enough to scroll.');
      return;
    }
  
    let scrollPosition = 0;
  
    const scroll = () => {
      scrollPosition += 1; 
      ticker.scrollLeft = scrollPosition;
  
      if (scrollPosition >= ticker.scrollWidth - ticker.clientWidth) {
        scrollPosition = 0;
      }
  
      requestAnimationFrame(scroll);
    };
  
    scroll(); 
  }
  
}